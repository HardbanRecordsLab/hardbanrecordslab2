-- HardbanRecords Lab - Complete Database Structure

-- Create enhanced enums
CREATE TYPE public.product_type AS ENUM ('music', 'ebook', 'audiobook', 'course', 'podcast', 'sample_pack', 'beat', 'stems');
CREATE TYPE public.product_status AS ENUM ('draft', 'pending_review', 'approved', 'published', 'rejected', 'archived');
CREATE TYPE public.distribution_status AS ENUM ('pending', 'processing', 'live', 'failed', 'removed');
CREATE TYPE public.license_type AS ENUM ('standard', 'exclusive', 'non_exclusive', 'creative_commons', 'royalty_free');
CREATE TYPE public.subscription_status AS ENUM ('active', 'canceled', 'expired', 'paused');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Digital Products table (unified for music, books, courses)
CREATE TABLE public.digital_products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    product_type product_type NOT NULL,
    status product_status NOT NULL DEFAULT 'draft',
    metadata JSONB DEFAULT '{}',
    tags TEXT[],
    price DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'PLN',
    license_type license_type DEFAULT 'standard',
    cover_url TEXT,
    file_url TEXT,
    preview_url TEXT,
    duration INTEGER, -- for audio/video content in seconds
    word_count INTEGER, -- for text content
    page_count INTEGER, -- for books
    file_size BIGINT,
    file_format TEXT,
    genres TEXT[],
    languages TEXT[] DEFAULT ARRAY['pl'],
    release_date TIMESTAMP WITH TIME ZONE,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Distribution Channels table
CREATE TABLE public.distribution_channels (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- 'streaming', 'download', 'physical', 'course_platform'
    api_endpoint TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    supported_formats TEXT[],
    commission_rate DECIMAL(5,2) DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Product Distribution table
CREATE TABLE public.product_distributions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    channel_id UUID NOT NULL REFERENCES public.distribution_channels(id) ON DELETE CASCADE,
    external_id TEXT, -- ID from external platform
    status distribution_status NOT NULL DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    published_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(product_id, channel_id)
);

-- Analytics table
CREATE TABLE public.analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'view', 'play', 'download', 'purchase', 'share'
    platform TEXT, -- 'spotify', 'youtube', 'website', etc.
    country TEXT,
    region TEXT,
    device_type TEXT,
    revenue DECIMAL(10,2) DEFAULT 0,
    currency TEXT DEFAULT 'PLN',
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    status subscription_status NOT NULL DEFAULT 'active',
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'PLN',
    billing_cycle TEXT NOT NULL, -- 'monthly', 'yearly'
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    stripe_subscription_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Payments/Earnings table
CREATE TABLE public.payments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.digital_products(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'PLN',
    status payment_status NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    stripe_payment_id TEXT,
    platform TEXT, -- source platform
    commission DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2),
    processed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Royalty Splits table (for collaborative works)
CREATE TABLE public.royalty_splits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    percentage DECIMAL(5,2) NOT NULL CHECK (percentage > 0 AND percentage <= 100),
    role TEXT, -- 'artist', 'producer', 'songwriter', 'author', 'editor'
    is_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Reviews/Ratings table
CREATE TABLE public.reviews (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(product_id, user_id)
);

-- AI Generation Requests table
CREATE TABLE public.ai_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL, -- 'cover_generation', 'description', 'tags', 'mastering'
    input_data JSONB NOT NULL,
    output_data JSONB,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    credits_used INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- User Credits table (for AI features)
CREATE TABLE public.user_credits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    total_credits INTEGER DEFAULT 0,
    used_credits INTEGER DEFAULT 0,
    remaining_credits INTEGER GENERATED ALWAYS AS (total_credits - used_credits) STORED,
    last_refill TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course Lessons Enhancement
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS lesson_type TEXT DEFAULT 'video';
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS quiz_data JSONB;
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS resources JSONB DEFAULT '[]';

-- Course Enrollments Enhancement
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS certificate_issued BOOLEAN DEFAULT FALSE;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS certificate_url TEXT;
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS final_score DECIMAL(5,2);

-- Insert default distribution channels
INSERT INTO public.distribution_channels (name, type, supported_formats) VALUES
('Spotify', 'streaming', ARRAY['mp3', 'flac']),
('Apple Music', 'streaming', ARRAY['mp3', 'flac']),
('YouTube Music', 'streaming', ARRAY['mp3', 'flac']),
('Amazon Music', 'streaming', ARRAY['mp3', 'flac']),
('Deezer', 'streaming', ARRAY['mp3', 'flac']),
('TIDAL', 'streaming', ARRAY['mp3', 'flac']),
('Amazon KDP', 'download', ARRAY['pdf', 'epub', 'mobi']),
('Apple Books', 'download', ARRAY['epub']),
('Google Play Books', 'download', ARRAY['pdf', 'epub']),
('Draft2Digital', 'download', ARRAY['epub', 'pdf']),
('Payhip', 'download', ARRAY['pdf', 'epub', 'mp3', 'zip']),
('Gumroad', 'download', ARRAY['pdf', 'epub', 'mp3', 'zip']);

-- Enable RLS on all tables
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distribution_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.royalty_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for digital_products
CREATE POLICY "Users can manage their own products" ON public.digital_products
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published products" ON public.digital_products
    FOR SELECT USING (status = 'published' OR auth.uid() = user_id);

CREATE POLICY "Admins can manage all products" ON public.digital_products
    FOR ALL USING (is_admin());

-- RLS Policies for distribution_channels
CREATE POLICY "Anyone can view distribution channels" ON public.distribution_channels
    FOR SELECT USING (TRUE);

CREATE POLICY "Only admins can manage distribution channels" ON public.distribution_channels
    FOR ALL USING (is_admin());

-- RLS Policies for product_distributions
CREATE POLICY "Users can manage their product distributions" ON public.product_distributions
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.digital_products 
        WHERE id = product_distributions.product_id 
        AND user_id = auth.uid()
    ));

CREATE POLICY "Admins can manage all distributions" ON public.product_distributions
    FOR ALL USING (is_admin());

-- RLS Policies for analytics
CREATE POLICY "Users can view their own analytics" ON public.analytics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert analytics" ON public.analytics
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view all analytics" ON public.analytics
    FOR ALL USING (is_admin());

-- RLS Policies for subscriptions
CREATE POLICY "Users can manage their own subscriptions" ON public.subscriptions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions" ON public.subscriptions
    FOR ALL USING (is_admin());

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert payments" ON public.payments
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can manage all payments" ON public.payments
    FOR ALL USING (is_admin());

-- RLS Policies for royalty_splits
CREATE POLICY "Users can view their royalty splits" ON public.royalty_splits
    FOR SELECT USING (auth.uid() = user_id OR EXISTS (
        SELECT 1 FROM public.digital_products 
        WHERE id = royalty_splits.product_id 
        AND user_id = auth.uid()
    ));

CREATE POLICY "Product owners can manage royalty splits" ON public.royalty_splits
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.digital_products 
        WHERE id = royalty_splits.product_id 
        AND user_id = auth.uid()
    ));

-- RLS Policies for reviews
CREATE POLICY "Users can manage their own reviews" ON public.reviews
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public reviews" ON public.reviews
    FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Product owners can view all reviews" ON public.reviews
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.digital_products 
        WHERE id = reviews.product_id 
        AND user_id = auth.uid()
    ));

-- RLS Policies for ai_requests
CREATE POLICY "Users can manage their own AI requests" ON public.ai_requests
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all AI requests" ON public.ai_requests
    FOR SELECT USING (is_admin());

-- RLS Policies for user_credits
CREATE POLICY "Users can view their own credits" ON public.user_credits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage credits" ON public.user_credits
    FOR ALL WITH CHECK (TRUE);

-- Add triggers for updated_at
CREATE TRIGGER update_digital_products_updated_at
    BEFORE UPDATE ON public.digital_products
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_product_distributions_updated_at
    BEFORE UPDATE ON public.product_distributions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at
    BEFORE UPDATE ON public.user_credits
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_digital_products_user_id ON public.digital_products(user_id);
CREATE INDEX idx_digital_products_status ON public.digital_products(status);
CREATE INDEX idx_digital_products_type ON public.digital_products(product_type);
CREATE INDEX idx_digital_products_featured ON public.digital_products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_analytics_product_id ON public.analytics(product_id);
CREATE INDEX idx_analytics_timestamp ON public.analytics(timestamp);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);

-- Create function to initialize user credits
CREATE OR REPLACE FUNCTION public.initialize_user_credits()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_credits (user_id, total_credits)
    VALUES (NEW.id, 100) -- Start with 100 free credits
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;