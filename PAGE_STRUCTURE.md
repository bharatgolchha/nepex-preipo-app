# NepEx Platform - Page Structure & KYC Flow

## Page Hierarchy

### 1. Public Pages (No Authentication Required)
```
/                          # Landing page
/about                     # About NepEx
/how-it-works             # Platform explanation
/education                # Educational hub
  /education/pre-ipo-basics    # Pre-IPO investment basics
  /education/spv-model        # SPV model explanation
  /education/risks            # Risk disclosure
  /education/guides           # Investment guides
/faqs                     # Frequently asked questions
/contact                  # Contact information
/terms                    # Terms and conditions
/privacy                  # Privacy policy
```

### 2. Authentication Pages
```
/signup                   # New user registration
/login                    # User login
/forgot-password         # Password recovery
/reset-password          # Password reset (with token)
/verify-email            # Email verification
```

### 3. KYC Pages (Authenticated Users)
```
/kyc                      # KYC dashboard/overview
/kyc/form                # KYC information form
/kyc/documents           # Document upload interface
/kyc/status              # KYC application status
/kyc/resubmit           # Resubmission for rejected KYC
```

### 4. Investor Pages (KYC Approved)
```
/dashboard               # Investor dashboard
/offerings               # Browse investment opportunities
/offerings/:id           # Individual offering details
/invest/:offeringId      # Investment flow
/portfolio               # Investment portfolio
/portfolio/:investmentId # Individual investment details
/transactions            # Transaction history
/notifications           # Notification center
/settings                # Profile settings
  /settings/profile      # Personal information
  /settings/security     # Security settings
  /settings/banking      # Bank account details
  /settings/preferences  # Notification preferences
```

### 5. Company Pages (Company Representatives)

#### Dashboard & Overview
```
/company/dashboard               # Company dashboard with metrics
/company/analytics              # Detailed analytics and insights
  /company/analytics/investors  # Investor demographics & behavior
  /company/analytics/funding    # Funding progress & projections
  /company/analytics/engagement # Investor engagement metrics
```

#### Profile & Settings
```
/company/profile                # Company profile management
  /company/profile/basic        # Basic information
  /company/profile/team         # Team members & leadership
  /company/profile/financials   # Financial highlights
  /company/profile/media        # Photos, videos, pitch deck
/company/settings               # Company account settings
  /company/settings/general     # General settings
  /company/settings/users       # User management & permissions
  /company/settings/banking     # Bank account details
  /company/settings/notifications # Notification preferences
/company/verification           # Company verification status
  /company/verification/documents # Upload verification documents
  /company/verification/status  # Track verification progress
```

#### Offering Management
```
/company/offerings              # List all offerings
/company/offerings/new          # Create new offering wizard
  /company/offerings/new/basic  # Basic offering details
  /company/offerings/new/financial # Financial terms
  /company/offerings/new/documents # Upload offering documents
  /company/offerings/new/preview # Preview before submission
/company/offerings/:id          # View offering details
/company/offerings/:id/edit     # Edit offering
/company/offerings/:id/investors # Offering-specific investors
/company/offerings/:id/documents # Manage offering documents
/company/offerings/:id/updates  # Post updates for investors
/company/offerings/:id/close    # Close offering
```

#### Investor Relations
```
/company/investors              # All investors overview
/company/investors/list         # Detailed investor list
/company/investors/:id          # Individual investor profile
/company/investors/export       # Export investor data
/company/communications         # Communication center
  /company/communications/announcements # Company announcements
  /company/communications/updates # Post updates
  /company/communications/messages # Direct messages with investors
  /company/communications/campaigns # Email campaigns
/company/investor-meetings      # Schedule & manage meetings
  /company/investor-meetings/calendar # Meeting calendar
  /company/investor-meetings/requests # Meeting requests
  /company/investor-meetings/history # Past meetings
```

#### Document Management
```
/company/documents              # Document library
  /company/documents/legal      # Legal documents
  /company/documents/financial  # Financial reports
  /company/documents/compliance # Compliance documents
  /company/documents/marketing  # Marketing materials
/company/documents/upload       # Upload new documents
/company/documents/:id          # View/edit document details
/company/data-room             # Virtual data room for due diligence
  /company/data-room/access    # Manage access permissions
  /company/data-room/activity  # Track document views
```

#### Reports & Compliance
```
/company/reports               # All reports dashboard
  /company/reports/funding     # Funding reports
  /company/reports/investors   # Investor reports
  /company/reports/compliance  # Compliance reports
  /company/reports/financial   # Financial reports
/company/reports/generate      # Generate new reports
/company/compliance            # Compliance center
  /company/compliance/sebon    # SEBON requirements
  /company/compliance/checklist # Compliance checklist
  /company/compliance/calendar # Important dates & deadlines
```

#### Financial Management
```
/company/financials            # Financial overview
  /company/financials/transactions # Transaction history
  /company/financials/withdrawals # Request withdrawals
  /company/financials/statements # Download statements
  /company/financials/tax       # Tax documents
```

### 6. Admin Pages (Platform Administrators)
```
/admin                   # Admin dashboard
/admin/kyc               # KYC management
/admin/kyc/:userId       # Individual KYC review
/admin/companies         # Company management
/admin/companies/:id     # Individual company review
/admin/offerings         # Offering management
/admin/offerings/:id     # Individual offering review
/admin/users             # User management
/admin/users/:id         # Individual user details
/admin/transactions      # Transaction monitoring
/admin/spv               # SPV management
/admin/reports           # Platform reports
/admin/compliance        # Compliance dashboard
/admin/settings          # Platform settings
```

## KYC Flow Details

### User Registration to KYC Approval Flow

```mermaid
graph TD
    A[User Lands on Homepage] --> B[Clicks Sign Up]
    B --> C[Registration Page]
    C --> D{User Type Selection}
    D -->|Investor| E[Investor Registration Form]
    D -->|Company| F[Company Registration Form]
    D -->|Diaspora| G[Diaspora Registration Form]
    
    E --> H[Email Verification]
    F --> H
    G --> H
    
    H --> I[First Login]
    I --> J[KYC Prompt/Dashboard]
    
    J --> K{KYC Status Check}
    K -->|Not Started| L[Start KYC Button]
    K -->|In Progress| M[Continue KYC]
    K -->|Rejected| N[View Feedback & Resubmit]
    K -->|Approved| O[Access Full Platform]
    
    L --> P[KYC Information Form]
    M --> P
    N --> P
    
    P --> Q[Document Upload]
    Q --> R[Review & Submit]
    R --> S[Admin Review Queue]
    
    S --> T{Admin Decision}
    T -->|Approve| U[KYC Approved Email]
    T -->|Reject| V[KYC Rejected Email with Reasons]
    T -->|Request More Info| W[Additional Info Request Email]
    
    U --> O
    V --> N
    W --> M
```

### KYC Form Fields

#### Personal Information Section
- Full Name (as per citizenship/passport)
- Date of Birth
- Gender
- Father's Name
- Mother's Name
- Spouse's Name (if applicable)
- Citizenship/Passport Number
- Issue Date and Place
- Phone Number (primary)
- Phone Number (secondary)
- Email Address

#### Address Information
- Permanent Address
  - Province
  - District
  - Municipality/VDC
  - Ward Number
  - Tole/Street
- Current Address (if different)
- Mailing Address preference

#### Financial Information
- Occupation
- Employer Name
- Annual Income Range
- Source of Funds
- Bank Account Details
- Investment Experience Level

#### For Diaspora Investors
- Country of Residence
- Visa Status
- NRN ID Number (if applicable)
- Remittance Partner Preference

### Document Requirements

#### Required Documents
1. **Citizenship/Passport** (front and back)
2. **Recent Photograph** (passport size)
3. **Signature Specimen**

#### Optional/Conditional Documents
1. **Address Proof** (if current address differs)
2. **Bank Statement** (last 3 months)
3. **Income Certificate** (for high-value investments)
4. **NRN Card** (for diaspora investors)

### KYC Status States

1. **NOT_STARTED** - User registered but hasn't begun KYC
2. **DRAFT** - KYC form partially filled
3. **DOCUMENTS_PENDING** - Form complete, documents pending
4. **SUBMITTED** - All information submitted, awaiting review
5. **UNDER_REVIEW** - Admin actively reviewing
6. **ADDITIONAL_INFO_REQUIRED** - Admin requested more information
7. **APPROVED** - KYC approved, full access granted
8. **REJECTED** - KYC rejected with reasons
9. **EXPIRED** - KYC approval expired (after set period)

### Admin KYC Review Interface

#### Review Dashboard
- Queue of pending KYC applications
- Filters by status, date, user type
- Quick stats (pending, approved today, etc.)

#### Individual Review Page
- User information display
- Document viewer (with zoom, rotate)
- Verification checklist
- Previous submission history
- Communication log
- Action buttons:
  - Approve
  - Reject (with reason selection)
  - Request More Information
  - Flag for Senior Review

#### Rejection Reasons (Standardized)
- Invalid/Unclear citizenship document
- Photograph doesn't meet requirements
- Information mismatch
- Incomplete documentation
- Failed identity verification
- Suspicious activity detected
- Document expired
- Other (with text field)

### Post-KYC Features

Once KYC is approved, users gain access to:
- Browse and view detailed investment opportunities
- Make investments (with amount based on KYC tier)
- Access portfolio management
- Download investment certificates
- Participate in investor communications
- Access educational resources

### KYC Compliance Features

1. **Audit Trail** - All KYC actions logged with timestamp and user
2. **Document Encryption** - All uploaded documents encrypted at rest
3. **Access Control** - Only authorized admins can view KYC data
4. **Expiry Management** - Automatic alerts for expiring documents
5. **Reporting** - SEBON compliance reports generation
6. **Data Retention** - Automatic archival per regulatory requirements

## Technical Implementation Notes

### Route Protection
- Public routes: No authentication required
- Auth routes: Redirect to dashboard if logged in
- KYC routes: Require authentication, show based on KYC status
- Investor routes: Require completed KYC
- Company routes: Require company role
- Admin routes: Require admin role

### State Management
- User authentication state (Supabase Auth)
- KYC status (stored in user profile)
- Role-based access control
- Document upload progress
- Form validation states

### Security Considerations
- All KYC pages served over HTTPS
- Document uploads go directly to Supabase Storage
- Sensitive data never stored in localStorage
- Session timeout for inactive users
- Rate limiting on document uploads
- CAPTCHA on public forms

## Company Portal Features

### Company Registration & Verification
Companies must go through a verification process similar to investor KYC:
1. **Basic Registration** - Company name, registration number, contact details
2. **Document Submission** - Registration certificate, PAN, board resolution
3. **Team Verification** - Key personnel KYC
4. **Admin Review** - Platform admin approves company
5. **Active Status** - Can create offerings

### Offering Creation Workflow
```mermaid
graph TD
    A[Company Dashboard] --> B[Create New Offering]
    B --> C[Basic Information]
    C --> D[Financial Terms]
    D --> E[Upload Documents]
    E --> F[Preview & Submit]
    F --> G[Admin Review]
    G --> H{Admin Decision}
    H -->|Approve| I[Offering Goes Live]
    H -->|Reject| J[Revision Required]
    H -->|Request Info| K[Additional Info Needed]
```

### Company Dashboard Metrics
- **Funding Overview**: Total raised, current offerings, investor count
- **Investor Analytics**: Demographics, investment patterns, engagement
- **Document Views**: Track which documents investors view most
- **Communication Stats**: Message open rates, announcement views
- **Financial Summary**: Pending withdrawals, transaction history

### Investor Communication Tools
1. **Announcements** - Broadcast updates to all investors
2. **Direct Messages** - One-on-one communication with investors
3. **Email Campaigns** - Targeted email campaigns
4. **Meeting Scheduler** - Virtual meeting coordination
5. **Update Posts** - Regular progress updates on offerings

### Document Management System
- **Categorized Storage**: Legal, financial, marketing documents
- **Version Control**: Track document versions and changes
- **Access Control**: Set permissions for different investor tiers
- **Activity Tracking**: Monitor who views which documents
- **Expiry Management**: Auto-reminders for document updates

### Compliance & Reporting
- **SEBON Reports**: Generate required regulatory reports
- **Investor Reports**: Automated investor reporting
- **Tax Documentation**: Generate tax certificates for investors
- **Audit Trail**: Complete record of all platform activities
- **Deadline Tracking**: Never miss compliance deadlines