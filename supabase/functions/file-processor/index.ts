import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';
import * as mm from 'https://esm.sh/music-metadata-browser@2.5.10';

// Initialize Supabase admin client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

async function processFile(record: any, supabase: SupabaseClient) {
  const { bucket_id, name: path } = record;

  console.log(`Processing file: ${path} from bucket: ${bucket_id}`);

  // We only want to process files in the 'content' folder.
  if (!path.startsWith('content/')) {
    console.log('Skipping file not in content folder.');
    return { message: 'File skipped: not in content folder.' };
  }

  // Find the corresponding digital product in the database.
  // We match by the end of the file_url, which contains the path.
  const { data: product, error: productError } = await supabase
    .from('digital_products')
    .select('id, product_type')
    .like('file_url', `%${path}`)
    .single();

  if (productError || !product) {
    throw new Error(`Product not found for file path: ${path}. Error: ${productError?.message}`);
  }

  // Only process audio files.
  const isAudio = ['music', 'beat', 'sample_pack', 'stems', 'audiobook', 'podcast'].includes(product.product_type);
  if (!isAudio) {
    console.log(`Skipping non-audio product type: ${product.product_type}`);
    return { message: 'File skipped: not an audio product.' };
  }

  // Download the file from storage
  console.log('Downloading file...');
  const { data: fileBlob, error: downloadError } = await supabase.storage
    .from(bucket_id)
    .download(path);

  if (downloadError) {
    throw new Error(`Failed to download file: ${downloadError.message}`);
  }

  // Parse metadata from the file
  console.log('Parsing metadata...');
  const metadata = await mm.parseBlob(fileBlob);
  console.log('Metadata parsed successfully.');

  const { duration, bitrate } = metadata.format;
  const bpm = metadata.common.bpm;
  const key = metadata.common.key;

  const updateData = {
    duration_seconds: duration ? Math.round(duration) : null,
    bitrate: bitrate ? Math.round(bitrate / 1000) : null, // convert to kbps
    metadata: {
      bpm,
      key,
      codec: metadata.format.codec,
      sampleRate: metadata.format.sampleRate,
    }
  };

  // Update the product in the database
  console.log(`Updating product ID ${product.id} with data:`, updateData);
  const { error: updateError } = await supabase
    .from('digital_products')
    .update(updateData)
    .eq('id', product.id);

  if (updateError) {
    throw new Error(`Failed to update product: ${updateError.message}`);
  }

  console.log(`Product ${product.id} updated successfully.`);
  return { message: 'File processed and product updated successfully.' };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    // Supabase Storage triggers send a payload with a 'record' object for INSERT events.
    if (payload.type === 'INSERT' && payload.table === 'objects' && payload.schema === 'storage') {
      const result = await processFile(payload.record, supabaseAdmin);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'Payload is not a storage insert event.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
  } catch (error) {
    console.error('Error processing file:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});