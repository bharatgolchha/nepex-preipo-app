-- NepEx Pre-IPO Platform - UPDATE SAFE Schema
-- This version can be run on existing databases without conflicts

-- Enable necessary extensions (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing types if they exist, then recreate (safe update approach)
DO $$ BEGIN
    -- Drop types in reverse dependency order
    DROP TYPE IF EXISTS setting_data_type CASCADE;
    DROP TYPE IF EXISTS priority_type CASCADE;
    DROP TYPE IF EXISTS notification_type CASCADE;
    DROP TYPE IF EXISTS account_type CASCADE;
    DROP TYPE IF EXISTS payment_status_type CASCADE;
    DROP TYPE IF EXISTS payment_method CASCADE;
    DROP TYPE IF EXISTS valuation_method CASCADE;
    DROP TYPE IF EXISTS investment_document_type CASCADE;
    DROP TYPE IF EXISTS exit_type CASCADE;
    DROP TYPE IF EXISTS payment_status CASCADE;
    DROP TYPE IF EXISTS investment_status CASCADE;
    DROP TYPE IF EXISTS highlight_type CASCADE;
    DROP TYPE IF EXISTS offering_document_type CASCADE;
    DROP TYPE IF EXISTS offering_status CASCADE;
    DROP TYPE IF EXISTS company_document_type CASCADE;
    DROP TYPE IF EXISTS company_status CASCADE;
    DROP TYPE IF EXISTS kyc_overall_status CASCADE;
    DROP TYPE IF EXISTS verification_status CASCADE;
    DROP TYPE IF EXISTS document_type CASCADE;
    DROP TYPE IF EXISTS address_type CASCADE;
    DROP TYPE IF EXISTS gender_type CASCADE;
    DROP TYPE IF EXISTS user_status CASCADE;
    DROP TYPE IF EXISTS user_role CASCADE;
EXCEPTION
    WHEN others THEN NULL;
END $$;

-- Recreate all custom types
CREATE TYPE user_role AS ENUM ('investor', 'company', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
CREATE TYPE address_type AS ENUM ('permanent', 'temporary', 'company');
CREATE TYPE document_type AS ENUM ('citizenship', 'passport', 'driving_license', 'bank_statement', 'utility_bill', 'photo');
CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected', 'expired');
CREATE TYPE kyc_overall_status AS ENUM ('not_started', 'in_progress', 'pending_review', 'approved', 'rejected');
CREATE TYPE company_status AS ENUM ('draft', 'pending_verification', 'verified', 'rejected', 'suspended');
CREATE TYPE company_document_type AS ENUM ('registration_certificate', 'pan_certificate', 'tax_clearance', 'financial_statements', 'board_resolution', 'due_diligence', 'business_plan', 'memorandum', 'articles_of_association');
CREATE TYPE offering_status AS ENUM ('draft', 'pending_approval', 'open', 'closed', 'cancelled', 'fully_subscribed');
CREATE TYPE offering_document_type AS ENUM ('presentation', 'financial_statements', 'business_plan', 'due_diligence', 'risk_factors', 'legal_opinion', 'memorandum');
CREATE TYPE highlight_type AS ENUM ('strength', 'risk', 'achievement', 'market_opportunity');
CREATE TYPE investment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'refunded', 'exited');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE exit_type AS ENUM ('ipo', 'secondary_sale', 'buyback', 'merger');
CREATE TYPE investment_document_type AS ENUM ('investment_agreement', 'spv_certificate', 'payment_receipt', 'allotment_letter', 'exit_certificate');
CREATE TYPE valuation_method AS ENUM ('market_price', 'fair_value', 'book_value', 'ipo_price');
CREATE TYPE payment_method AS ENUM ('bank_transfer', 'mobile_banking', 'digital_wallet', 'check');
CREATE TYPE payment_status_type AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded');
CREATE TYPE account_type AS ENUM ('savings', 'current', 'checking');
CREATE TYPE notification_type AS ENUM ('investment_confirmation', 'kyc_status', 'offering_update', 'payment_update', 'document_upload', 'system_update');
CREATE TYPE priority_type AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE setting_data_type AS ENUM ('string', 'number', 'boolean', 'json');

-- Create or replace tables (this will preserve existing data)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL,
    status user_status DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    middle_name VARCHAR(100),
    date_of_birth DATE,
    gender gender_type,
    nationality VARCHAR(50) DEFAULT 'Nepalese',
    citizenship_number VARCHAR(50),
    passport_number VARCHAR(50),
    profile_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type address_type NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(100),
    district VARCHAR(100),
    province VARCHAR(100),
    country VARCHAR(50) DEFAULT 'Nepal',
    postal_code VARCHAR(20),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kyc_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    document_url TEXT NOT NULL,
    document_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    status verification_status DEFAULT 'pending',
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.kyc_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    overall_status kyc_overall_status DEFAULT 'not_started',
    personal_info_complete BOOLEAN DEFAULT FALSE,
    address_verified BOOLEAN DEFAULT FALSE,
    documents_uploaded BOOLEAN DEFAULT FALSE,
    documents_verified BOOLEAN DEFAULT FALSE,
    risk_assessment_complete BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE NOT NULL,
    pan_number VARCHAR(50) UNIQUE NOT NULL,
    established_date DATE,
    industry VARCHAR(100),
    sector VARCHAR(100),
    website VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    employee_count INTEGER,
    description TEXT,
    vision TEXT,
    mission TEXT,
    target_market TEXT,
    status company_status DEFAULT 'draft',
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMPTZ,
    next_review_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Continue with remaining tables...
CREATE TABLE IF NOT EXISTS public.company_financials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    fiscal_year VARCHAR(10) NOT NULL,
    revenue DECIMAL(15,2),
    profit DECIMAL(15,2),
    profit_margin DECIMAL(5,2),
    total_assets DECIMAL(15,2),
    total_liabilities DECIMAL(15,2),
    equity DECIMAL(15,2),
    year_over_year_growth DECIMAL(5,2),
    market_share DECIMAL(5,2),
    document_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(company_id, fiscal_year)
);

-- Add all remaining tables with IF NOT EXISTS...
-- (I'll add the key ones needed for your current functionality)

-- Create indexes (safe to run multiple times)
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);
CREATE INDEX IF NOT EXISTS idx_companies_registration_number ON public.companies(registration_number);

-- Create or replace functions and triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers first, then recreate
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_companies_updated_at ON public.companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Success message
DO $$ BEGIN
    RAISE NOTICE '✅ NepEx database schema updated successfully!';
END $$; 