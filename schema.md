# Database Schema - NepEx Pre-IPO Investment Platform

## Overview
This document outlines the complete database schema for the NepEx Pre-IPO investment platform, designed for the Nepalese market. The platform facilitates pre-IPO investments through SPV (Special Purpose Vehicle) structures.

## Core Entities

### 1. Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('investor', 'company', 'admin') NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255)
);
```

### 2. User Profiles Table
```sql
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    middle_name VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    nationality VARCHAR(50) DEFAULT 'Nepalese',
    citizenship_number VARCHAR(50),
    passport_number VARCHAR(50),
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Addresses Table
```sql
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type ENUM('permanent', 'temporary', 'company') NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(100),
    district VARCHAR(100),
    province VARCHAR(100),
    country VARCHAR(50) DEFAULT 'Nepal',
    postal_code VARCHAR(20),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. KYC Documents Table
```sql
CREATE TABLE kyc_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    document_type ENUM('citizenship', 'passport', 'driving_license', 'bank_statement', 'utility_bill', 'photo') NOT NULL,
    document_url TEXT NOT NULL,
    document_number VARCHAR(100),
    issue_date DATE,
    expiry_date DATE,
    status ENUM('pending', 'approved', 'rejected', 'expired') DEFAULT 'pending',
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. KYC Status Table
```sql
CREATE TABLE kyc_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    overall_status ENUM('not_started', 'in_progress', 'pending_review', 'approved', 'rejected') DEFAULT 'not_started',
    personal_info_complete BOOLEAN DEFAULT FALSE,
    address_verified BOOLEAN DEFAULT FALSE,
    documents_uploaded BOOLEAN DEFAULT FALSE,
    documents_verified BOOLEAN DEFAULT FALSE,
    risk_assessment_complete BOOLEAN DEFAULT FALSE,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Company Entities

### 6. Companies Table
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
    status ENUM('draft', 'pending_verification', 'verified', 'rejected', 'suspended') DEFAULT 'draft',
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP,
    next_review_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7. Company Financial Data Table
```sql
CREATE TABLE company_financials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(company_id, fiscal_year)
);
```

### 8. Company Team Members Table
```sql
CREATE TABLE company_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    experience_years INTEGER,
    bio TEXT,
    linkedin_url VARCHAR(255),
    photo_url TEXT,
    is_key_personnel BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9. Company Documents Table
```sql
CREATE TABLE company_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    document_type ENUM('registration_certificate', 'pan_certificate', 'tax_clearance', 'financial_statements', 'board_resolution', 'due_diligence', 'business_plan', 'memorandum', 'articles_of_association') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    file_size BIGINT,
    uploaded_by UUID REFERENCES users(id),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Investment Offerings

### 10. Offerings Table
```sql
CREATE TABLE offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
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
    status ENUM('draft', 'pending_approval', 'open', 'closed', 'cancelled', 'fully_subscribed') DEFAULT 'draft',
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 11. Offering Documents Table
```sql
CREATE TABLE offering_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_id UUID REFERENCES offerings(id) ON DELETE CASCADE,
    document_type ENUM('presentation', 'financial_statements', 'business_plan', 'due_diligence', 'risk_factors', 'legal_opinion', 'memorandum') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    file_size BIGINT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 12. Offering Highlights Table
```sql
CREATE TABLE offering_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_id UUID REFERENCES offerings(id) ON DELETE CASCADE,
    highlight TEXT NOT NULL,
    type ENUM('strength', 'risk', 'achievement', 'market_opportunity') NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Investment Management

### 13. Investments Table
```sql
CREATE TABLE investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    offering_id UUID REFERENCES offerings(id) ON DELETE CASCADE,
    investment_amount DECIMAL(12,2) NOT NULL,
    spv_units DECIMAL(10,2) NOT NULL,
    share_count INTEGER NOT NULL,
    investment_date TIMESTAMP NOT NULL,
    lock_in_expiry_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'refunded', 'exited') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_reference VARCHAR(255),
    current_value DECIMAL(12,2),
    last_valuation_date DATE,
    exit_date DATE,
    exit_value DECIMAL(12,2),
    exit_type ENUM('ipo', 'secondary_sale', 'buyback', 'merger'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(investor_id, offering_id)
);
```

### 14. Investment Documents Table
```sql
CREATE TABLE investment_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
    document_type ENUM('investment_agreement', 'spv_certificate', 'payment_receipt', 'allotment_letter', 'exit_certificate') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 15. Portfolio Performance Table
```sql
CREATE TABLE portfolio_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID REFERENCES users(id) ON DELETE CASCADE,
    investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
    valuation_date DATE NOT NULL,
    current_value DECIMAL(12,2) NOT NULL,
    value_change DECIMAL(12,2),
    percentage_change DECIMAL(8,4),
    valuation_method ENUM('market_price', 'fair_value', 'book_value', 'ipo_price') NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(investment_id, valuation_date)
);
```

## Payment and Transaction Management

### 16. Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    investment_id UUID REFERENCES investments(id) ON DELETE CASCADE,
    payment_method ENUM('bank_transfer', 'mobile_banking', 'digital_wallet', 'check') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NPR',
    status ENUM('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_gateway VARCHAR(50),
    transaction_id VARCHAR(255),
    reference_number VARCHAR(255),
    payment_date TIMESTAMP,
    failure_reason TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 17. Bank Details Table
```sql
CREATE TABLE bank_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bank_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder_name VARCHAR(255) NOT NULL,
    branch_name VARCHAR(100),
    swift_code VARCHAR(20),
    routing_number VARCHAR(20),
    account_type ENUM('savings', 'current', 'checking') NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Notifications and Communications

### 18. Notifications Table
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type ENUM('investment_confirmation', 'kyc_status', 'offering_update', 'payment_update', 'document_upload', 'system_update') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP
);
```

### 19. Email Templates Table
```sql
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    variables JSON,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Audit and Logging

### 20. Audit Logs Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSON,
    new_values JSON,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 21. System Settings Table
```sql
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50),
    data_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes for Performance

```sql
-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Companies indexes
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_registration_number ON companies(registration_number);
CREATE INDEX idx_companies_industry ON companies(industry);

-- Offerings indexes
CREATE INDEX idx_offerings_company_id ON offerings(company_id);
CREATE INDEX idx_offerings_status ON offerings(status);
CREATE INDEX idx_offerings_sector ON offerings(sector);
CREATE INDEX idx_offerings_dates ON offerings(opening_date, closing_date);

-- Investments indexes
CREATE INDEX idx_investments_investor_id ON investments(investor_id);
CREATE INDEX idx_investments_offering_id ON investments(offering_id);
CREATE INDEX idx_investments_status ON investments(status);
CREATE INDEX idx_investments_date ON investments(investment_date);

-- Payments indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);

-- KYC indexes
CREATE INDEX idx_kyc_documents_user_id ON kyc_documents(user_id);
CREATE INDEX idx_kyc_documents_status ON kyc_documents(status);
CREATE INDEX idx_kyc_status_user_id ON kyc_status(user_id);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

## Views for Common Queries

```sql
-- Portfolio summary view
CREATE VIEW portfolio_summary AS
SELECT 
    i.investor_id,
    COUNT(*) as total_investments,
    SUM(i.investment_amount) as total_invested,
    SUM(COALESCE(i.current_value, i.investment_amount)) as current_value,
    SUM(COALESCE(i.current_value, i.investment_amount) - i.investment_amount) as total_returns,
    AVG(CASE WHEN i.current_value IS NOT NULL THEN 
        ((i.current_value - i.investment_amount) / i.investment_amount * 100) 
        ELSE 0 END) as avg_return_percentage
FROM investments i
WHERE i.status = 'confirmed'
GROUP BY i.investor_id;

-- Active offerings view
CREATE VIEW active_offerings AS
SELECT 
    o.*,
    c.company_name,
    c.sector as company_sector,
    (o.current_raised / o.target_raise * 100) as percentage_raised,
    COUNT(i.id) as investor_count
FROM offerings o
JOIN companies c ON o.company_id = c.id
LEFT JOIN investments i ON o.id = i.offering_id AND i.status = 'confirmed'
WHERE o.status = 'open' 
AND o.opening_date <= CURRENT_DATE 
AND o.closing_date >= CURRENT_DATE
GROUP BY o.id, c.company_name, c.sector;
```

## Security Considerations

1. **Row Level Security (RLS)**: Enable RLS on all tables to ensure users can only access their own data
2. **Encryption**: Sensitive fields like SSNs, bank account numbers should be encrypted
3. **Audit Trail**: All sensitive operations are logged in audit_logs table
4. **Data Retention**: Implement policies for data retention and deletion
5. **Backup Strategy**: Regular backups with point-in-time recovery
6. **Access Control**: Role-based access control with least privilege principle

## Data Migration and Seeding

The schema includes necessary seed data for:
- System settings (minimum investment amounts, fees, etc.)
- Email templates for notifications
- Initial admin user accounts
- Default KYC document types
- Industry and sector classifications

This schema provides a robust foundation for the Nepal Pre-IPO investment platform, supporting all core functionalities while ensuring data integrity, security, and scalability. 