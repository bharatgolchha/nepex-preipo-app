-- Supabase Compatible Schema for NepEx Pre-IPO Investment Platform
-- This schema is designed for PostgreSQL/Supabase

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types (ENUMs)
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

-- =============================================================================
-- CORE USER TABLES
-- =============================================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
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

-- User profiles
CREATE TABLE public.user_profiles (
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

-- Addresses
CREATE TABLE public.addresses (
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

-- KYC Documents
CREATE TABLE public.kyc_documents (
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

-- KYC Status
CREATE TABLE public.kyc_status (
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

-- =============================================================================
-- COMPANY TABLES
-- =============================================================================

-- Companies
CREATE TABLE public.companies (
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

-- Company Financial Data
CREATE TABLE public.company_financials (
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

-- Company Team Members
CREATE TABLE public.company_team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    experience_years INTEGER,
    bio TEXT,
    linkedin_url VARCHAR(255),
    photo_url TEXT,
    is_key_personnel BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Company Documents
CREATE TABLE public.company_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    document_type company_document_type NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    file_size BIGINT,
    uploaded_by UUID REFERENCES public.users(id),
    status verification_status DEFAULT 'pending',
    verified_by UUID REFERENCES public.users(id),
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INVESTMENT OFFERINGS
-- =============================================================================

-- Offerings
CREATE TABLE public.offerings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sector VARCHAR(100),
    min_investment DECIMAL(12,2) NOT NULL,
    max_investment DECIMAL(12,2) NOT NULL,
    target_raise DECIMAL(15,2) NOT NULL,
    current_raised DECIMAL(15,2) DEFAULT 0,
    pre_ipo_valuation DECIMAL(15,2),
    share_price DECIMAL(10,2),
    total_shares_offered INTEGER,
    spv_structure TEXT,
    expected_ipo_date DATE,
    opening_date DATE NOT NULL,
    closing_date DATE NOT NULL,
    lock_in_period_months INTEGER DEFAULT 36,
    status offering_status DEFAULT 'draft',
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Documents
CREATE TABLE public.offering_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offering_id UUID REFERENCES public.offerings(id) ON DELETE CASCADE,
    document_type offering_document_type NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    file_size BIGINT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Highlights
CREATE TABLE public.offering_highlights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offering_id UUID REFERENCES public.offerings(id) ON DELETE CASCADE,
    highlight TEXT NOT NULL,
    type highlight_type NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INVESTMENT MANAGEMENT
-- =============================================================================

-- Investments
CREATE TABLE public.investments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    offering_id UUID REFERENCES public.offerings(id) ON DELETE CASCADE,
    investment_amount DECIMAL(12,2) NOT NULL,
    spv_units DECIMAL(10,2) NOT NULL,
    share_count INTEGER NOT NULL,
    investment_date TIMESTAMPTZ NOT NULL,
    lock_in_expiry_date DATE NOT NULL,
    status investment_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    payment_reference VARCHAR(255),
    current_value DECIMAL(12,2),
    last_valuation_date DATE,
    exit_date DATE,
    exit_value DECIMAL(12,2),
    exit_type exit_type,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(investor_id, offering_id)
);

-- Investment Documents
CREATE TABLE public.investment_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
    document_type investment_document_type NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Performance
CREATE TABLE public.portfolio_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
    valuation_date DATE NOT NULL,
    current_value DECIMAL(12,2) NOT NULL,
    value_change DECIMAL(12,2),
    percentage_change DECIMAL(8,4),
    valuation_method valuation_method NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(investment_id, valuation_date)
);

-- =============================================================================
-- PAYMENT AND TRANSACTION MANAGEMENT
-- =============================================================================

-- Payments
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    investment_id UUID REFERENCES public.investments(id) ON DELETE CASCADE,
    payment_method payment_method NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NPR',
    status payment_status_type DEFAULT 'pending',
    payment_gateway VARCHAR(50),
    transaction_id VARCHAR(255),
    reference_number VARCHAR(255),
    payment_date TIMESTAMPTZ,
    failure_reason TEXT,
    receipt_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bank Details
CREATE TABLE public.bank_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder_name VARCHAR(255) NOT NULL,
    branch_name VARCHAR(100),
    swift_code VARCHAR(20),
    routing_number VARCHAR(20),
    account_type account_type NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- NOTIFICATIONS AND COMMUNICATIONS
-- =============================================================================

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    priority priority_type DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ
);

-- Email Templates
CREATE TABLE public.email_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables JSONB,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- AUDIT AND LOGGING
-- =============================================================================

-- Audit Logs
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- System Settings
CREATE TABLE public.system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50),
    data_type setting_data_type DEFAULT 'string',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);
CREATE INDEX idx_users_status ON public.users(status);

-- Companies indexes
CREATE INDEX idx_companies_status ON public.companies(status);
CREATE INDEX idx_companies_registration_number ON public.companies(registration_number);
CREATE INDEX idx_companies_industry ON public.companies(industry);

-- Offerings indexes
CREATE INDEX idx_offerings_company_id ON public.offerings(company_id);
CREATE INDEX idx_offerings_status ON public.offerings(status);
CREATE INDEX idx_offerings_sector ON public.offerings(sector);
CREATE INDEX idx_offerings_dates ON public.offerings(opening_date, closing_date);

-- Investments indexes
CREATE INDEX idx_investments_investor_id ON public.investments(investor_id);
CREATE INDEX idx_investments_offering_id ON public.investments(offering_id);
CREATE INDEX idx_investments_status ON public.investments(status);
CREATE INDEX idx_investments_date ON public.investments(investment_date);

-- Payments indexes
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_transaction_id ON public.payments(transaction_id);

-- KYC indexes
CREATE INDEX idx_kyc_documents_user_id ON public.kyc_documents(user_id);
CREATE INDEX idx_kyc_documents_status ON public.kyc_documents(status);
CREATE INDEX idx_kyc_status_user_id ON public.kyc_status(user_id);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at);

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Portfolio summary view
CREATE VIEW public.portfolio_summary AS
SELECT 
    i.investor_id,
    COUNT(*) as total_investments,
    SUM(i.investment_amount) as total_invested,
    SUM(COALESCE(i.current_value, i.investment_amount)) as current_value,
    SUM(COALESCE(i.current_value, i.investment_amount) - i.investment_amount) as total_returns,
    AVG(CASE WHEN i.current_value IS NOT NULL THEN 
        ((i.current_value - i.investment_amount) / i.investment_amount * 100) 
        ELSE 0 END) as avg_return_percentage
FROM public.investments i
WHERE i.status = 'confirmed'
GROUP BY i.investor_id;

-- Active offerings view
CREATE VIEW public.active_offerings AS
SELECT 
    o.*,
    c.company_name,
    c.sector as company_sector,
    (o.current_raised / o.target_raise * 100) as percentage_raised,
    COUNT(i.id) as investor_count
FROM public.offerings o
JOIN public.companies c ON o.company_id = c.id
LEFT JOIN public.investments i ON o.id = i.offering_id AND i.status = 'confirmed'
WHERE o.status = 'open' 
AND o.opening_date <= CURRENT_DATE 
AND o.closing_date >= CURRENT_DATE
GROUP BY o.id, c.company_name, c.sector;

-- =============================================================================
-- FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_kyc_documents_updated_at BEFORE UPDATE ON public.kyc_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_kyc_status_updated_at BEFORE UPDATE ON public.kyc_status FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_financials_updated_at BEFORE UPDATE ON public.company_financials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_team_members_updated_at BEFORE UPDATE ON public.company_team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_company_documents_updated_at BEFORE UPDATE ON public.company_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_offerings_updated_at BEFORE UPDATE ON public.offerings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_offering_documents_updated_at BEFORE UPDATE ON public.offering_documents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON public.investments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bank_details_updated_at BEFORE UPDATE ON public.bank_details FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON public.system_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role)
    VALUES (NEW.id, NEW.email, 'investor');
    
    INSERT INTO public.kyc_status (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ language 'plpgsql' security definer;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offering_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offering_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

-- User profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR ALL USING (auth.uid() = user_id);

-- Addresses
CREATE POLICY "Users can manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id);

-- KYC Documents
CREATE POLICY "Users can manage own KYC documents" ON public.kyc_documents FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all KYC documents" ON public.kyc_documents FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- KYC Status
CREATE POLICY "Users can view own KYC status" ON public.kyc_status FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own KYC status" ON public.kyc_status FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all KYC status" ON public.kyc_status FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Companies
CREATE POLICY "Companies can manage own data" ON public.companies FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public can view verified companies" ON public.companies FOR SELECT USING (status = 'verified');
CREATE POLICY "Admins can manage all companies" ON public.companies FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Company financials
CREATE POLICY "Companies can manage own financials" ON public.company_financials FOR ALL USING (
    EXISTS (SELECT 1 FROM public.companies WHERE id = company_id AND user_id = auth.uid())
);
CREATE POLICY "Public can view verified company financials" ON public.company_financials FOR SELECT USING (verified = true);

-- Offerings
CREATE POLICY "Companies can manage own offerings" ON public.offerings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.companies WHERE id = company_id AND user_id = auth.uid())
);
CREATE POLICY "Public can view open offerings" ON public.offerings FOR SELECT USING (status = 'open');
CREATE POLICY "Admins can manage all offerings" ON public.offerings FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Investments
CREATE POLICY "Investors can manage own investments" ON public.investments FOR ALL USING (auth.uid() = investor_id);
CREATE POLICY "Companies can view investments in their offerings" ON public.investments FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.offerings o 
        JOIN public.companies c ON o.company_id = c.id 
        WHERE o.id = offering_id AND c.user_id = auth.uid()
    )
);

-- Payments
CREATE POLICY "Users can manage own payments" ON public.payments FOR ALL USING (auth.uid() = user_id);

-- Bank details
CREATE POLICY "Users can manage own bank details" ON public.bank_details FOR ALL USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Audit logs (read-only for admins)
CREATE POLICY "Admins can view audit logs" ON public.audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Insert system settings
INSERT INTO public.system_settings (setting_key, setting_value, description, category, data_type, is_public) VALUES
('min_investment_amount', '10000', 'Minimum investment amount in NPR', 'investment', 'number', true),
('max_investment_amount', '5000000', 'Maximum investment amount in NPR', 'investment', 'number', true),
('platform_fee_percentage', '2.5', 'Platform fee percentage', 'fees', 'number', false),
('kyc_expiry_days', '365', 'KYC document expiry in days', 'kyc', 'number', false),
('lock_in_period_months', '36', 'Default lock-in period in months', 'investment', 'number', true);

-- Insert email templates
INSERT INTO public.email_templates (template_name, subject, html_content, text_content, variables) VALUES
('welcome_investor', 'Welcome to NepEx', '<h1>Welcome {{first_name}}</h1><p>Thank you for joining NepEx Pre-IPO Investment Platform.</p>', 'Welcome {{first_name}}\n\nThank you for joining NepEx Pre-IPO Investment Platform.', '["first_name"]'::jsonb),
('kyc_approved', 'KYC Verification Approved', '<h1>KYC Approved</h1><p>Your KYC verification has been approved. You can now start investing.</p>', 'KYC Approved\n\nYour KYC verification has been approved. You can now start investing.', '[]'::jsonb),
('investment_confirmation', 'Investment Confirmed', '<h1>Investment Confirmed</h1><p>Your investment of NPR {{amount}} in {{company_name}} has been confirmed.</p>', 'Investment Confirmed\n\nYour investment of NPR {{amount}} in {{company_name}} has been confirmed.', '["amount", "company_name"]'::jsonb);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated; 