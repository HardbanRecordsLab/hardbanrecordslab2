// Poprawna zawartość pliku ProductCreationWizard.tsx
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X } from 'lucide-react';
import { toast } from 'sonner';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['music', 'ebook', 'course']),
  tags: z.array(z.string()).optional(),
  // Add other fields as necessary
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductCreationWizard() {
  const [newTag, setNewTag] = useState('');

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'music',
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tags',
  });

  const watchedTags = form.watch('tags');

  useEffect(() => {
    // This effect can be used to react to tag changes
  }, [watchedTags]);

  const handleAddTag = () => {
    if (newTag && !watchedTags?.includes(newTag)) {
      append(newTag);
      setNewTag('');
    } else {
      toast.warning('Tag is empty or already exists.');
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log(data);
    toast.success('Product created successfully!');
    // Handle form submission, e.g., send data to an API
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create New Digital Product</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Awesome Track" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your product..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="ebook">E-book</SelectItem>
                      <SelectItem value="course">Course</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a new tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {fields.map((tag, index) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {watchedTags?.[index]}
                    <button type="button" onClick={() => remove(index)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </FormItem>

            <Button type="submit">Create Product</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Poprawka była w poniższej linii - na końcu był nawias ')' zamiast ']'
// }, [newTag, watchedTags, form]);