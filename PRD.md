# Product Requirements Document: Nepex MVP

## 1. Introduction

Nepex is a digital platform designed to democratize access to pre-IPO investment opportunities in Nepal. The MVP will focus on validating the core functionality: connecting Nepali retail investors (with a focus on micro-investments via an SPV-based pooling mechanism) and companies seeking pre-IPO capital, all within a compliant and user-friendly web-based environment. It will also lay the groundwork for basic diaspora investor accounts.

### Technology Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with ShadCN UI components
- **Backend**: Supabase (PostgreSQL database, Auth, Storage, Functions)

## 2. Goals

- Successfully launch a functional platform for pre-IPO investments in Nepal
- Validate the demand for micro-investments (starting NPR 10,000) through an SPV-based model
- Enable companies to list pre-IPO offerings
- Ensure basic regulatory compliance for KYC and transaction processes
- Onboard an initial set of investors and companies
- Gather user feedback for future iterations
- Test the core transaction flow and administrative approval processes

## 3. Target Audience (User Personas for MVP)

### Aarav (Micro-Investor)
- **Age**: 22
- **Occupation**: College Student / Recent Graduate
- **Goal**: Wants to start investing small amounts (NPR 10,000 - 50,000) in opportunities with higher growth potential than traditional savings. Needs a simple, educational, and trustworthy platform.
- **Frustration**: Current pre-IPO market is inaccessible and opaque.

### Riya (Retail Investor)
- **Age**: 35
- **Occupation**: Professional
- **Goal**: Looking to diversify her portfolio with pre-IPO investments (NPR 50,000 - 500,000). Seeks transparency and a regulated environment.
- **Frustration**: High fees and unprofessionalism from middlemen.

### Sanjay (Company Representative)
- **Age**: 45
- **Occupation**: CFO/Founder of a growing Nepali company
- **Goal**: Wants to raise capital efficiently before a potential IPO, access a broader investor base, and gain visibility.
- **Frustration**: Limited funding avenues beyond traditional methods.

### Prakash (Nepex Admin/Compliance Officer)
- **Age**: 30
- **Occupation**: Platform Administrator at Nepex
- **Goal**: Needs to efficiently manage user onboarding, verify KYC, approve offerings, monitor transactions, and ensure basic compliance.

## 4. Success Metrics (for MVP)

- **Number of registered investors**: Target 500
- **Number of registered companies**: Target 5-10
- **Number of successfully listed offerings**: Target 3-5
- **Total investment volume facilitated**: Target NPR 10,00,000
- **Average KYC approval time**: Target < 48 hours
- **User engagement**: Number of logins, offering views
- **Successful completion of end-to-end investment transactions**: Target 50
- **Feedback score from initial users** (survey)

## 5. MVP Features

### 5.1. User Authentication and Basic KYC (Phase 1 Core)

**Description**: Users can register, log in, and manage their basic profile. Investors undergo a basic KYC process. Diaspora users can register, flagging their status. Authentication will be handled by Supabase Auth.

**User Stories**:
- **Investor/Company Rep**: As a new user, I want to register using my email/phone and set a password (via Supabase Auth) so I can access the platform.
- **Investor/Company Rep**: As a registered user, I want to log in securely to my account (via Supabase Auth).
- **Investor**: As an investor, I want to submit my basic KYC documents (e.g., citizenship, photo) as per SEBON requirements so my account can be verified.
- **Diaspora Investor**: As a diaspora investor, I want to register and indicate my non-resident status.
- **Admin**: As an admin, I want to review submitted KYC documents and approve or reject investor accounts with a reason.

**Technical Details**:
- Email/phone verification (Supabase Auth)
- Secure password storage and handling (Supabase Auth)
- Basic profile information stored in Supabase database
- Document upload for KYC (Supabase Storage)
- Admin interface for KYC review

### 5.2. Company and Offering Listings (Phase 1 Core)

**Description**: Companies can submit their profiles and create pre-IPO offerings. Investors can view these listings.

**User Stories**:
- **Company Rep**: As a company representative, I want to create a company profile with basic information.
- **Company Rep**: As a company representative, I want to submit a pre-IPO offering with details.
- **Admin**: As an admin, I want to review and approve/reject company profiles and their offerings.
- **Investor**: As an investor, I want to browse a list of active pre-IPO offerings.
- **Investor**: As an investor, I want to view details of a specific offering.

**Technical Details**:
- Standardized fields for company and offering information (Supabase schema)
- Document upload for company prospectuses/information
- Admin approval workflow for listings

### 5.3. Basic Investment Flow with SPV-based Pooling Mechanism (Phase 1 Core)

**Description**: Investors can invest in offerings, with micro-investments facilitated through an SPV structure.

**User Stories**:
- **Investor (Micro)**: As a micro-investor, I want to invest a small amount (e.g., NPR 10,000) in an offering through an SPV.
- **Investor (Standard)**: As a retail investor, I want to invest in an offering.
- **Investor**: As an investor, I want to see the total amount I'm investing and any applicable transaction fees.
- **Investor**: As an investor, I want to complete my investment using a basic integrated payment method.
- **Admin**: As an admin, I want to track investments made into each offering/SPV.
- **Admin**: As an admin, I need to manage the SPV unit allocation based on investments.

**Technical Details**:
- Clear presentation of SPV structure for micro-investments
- Input for investment amount (min. NPR 10,000 for SPV units)
- Calculation of transaction fees
- Basic payment processing (manual reconciliation initially)
- Digital confirmation of investment/unit allocation

### 5.4. Simple Portfolio View (Phase 1 Core)

**Description**: Investors can view a summary of their investments.

**User Stories**:
- **Investor**: As an investor, I want to see a list of my current investments and the amounts invested.
- **Investor**: As an investor, I want to see the number of SPV units I hold for each micro-investment.

**Technical Details**:
- Display company name, amount invested, date of investment, number of units
- No complex performance tracking for MVP

### 5.5. Essential Educational Content (Phase 1 Core)

**Description**: Basic information for users about pre-IPO investing and using the platform.

**User Stories**:
- **Investor**: As an investor, I want to access simple articles or FAQs explaining pre-IPO investment.
- **Admin**: As an admin, I want to be able to upload and manage this educational content.

**Technical Details**:
- Static pages or simple CMS-like structure using Supabase
- Content covering: Basics of Pre-IPO, Risks, How Nepex Works, SPV Model Explained

### 5.6. Administrative Approval Workflows & Basic Compliance (Phase 1 Core)

**Description**: Backend tools for admins to manage the platform and ensure fundamental compliance.

**User Stories**:
- **Admin**: As an admin, I need a dashboard to see pending KYC verifications, company applications, and offering submissions.
- **Admin**: As an admin, I want to be able to enforce basic rules, like the three-year lock-in period.
- **Admin**: As an admin, I need a basic audit trail of key actions.

**Technical Details**:
- Admin dashboard for managing queues
- Ability to update status of applications/offerings
- Display of compliance information to users

### 5.7. Platform Technology

**Description**: The MVP will be a web-based application.

**User Stories**:
- **All Users**: As a user, I want to access Nepex through my web browser on a desktop or mobile device.

**Technical Stack**:
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Backend & Auth**: Supabase

## 6. Non-Functional Requirements

### Security
- Leverage Supabase's built-in security features (Row Level Security, JWT for auth)
- Follow best practices for web security (HTTPS, input sanitization)
- No sensitive payment data stored if using external gateways

### Performance
- Platform should load within 5 seconds for key pages
- Optimize Supabase queries

### Usability
- Clean, simple, and intuitive interface built with Tailwind CSS and ShadCN UI
- Easy to navigate for first-time investors

### Reliability
- Depend on Supabase's uptime guarantees for backend services
- Target frontend application uptime of 99%

### Scalability
- Supabase provides scaling options for the backend
- Frontend built with standard React best practices
- Architected to handle initial user growth (up to 1000 users, 100 concurrent)

### Compliance
- Design should incorporate SEBON requirements relevant to MVP features
- Legal consultation on SPV structure is key

### Language
- Primarily English
- Nepali language support for key informational pages if time/budget allows

## 7. Exclusions (Out of Scope for MVP)

- Full Mobile Applications (iOS/Android Native)
- Advanced Secondary Market Features
- Subscription Models (Premium/Diaspora Plans)
- Extensive Service Fees
- Full Diaspora Investment Flow
- Advanced Investor/Company Analytics and Dashboards
- AI-Powered Recommendations
- Comprehensive Community Features
- Blockchain Ledger for Fractional Ownership
- Automated SEBON Reporting
- Integration with Remittance Providers
- Sophisticated Payment Gateway Integration
- Tiered Investment Approach beyond Micro (SPV) and Standard

## 8. Future Considerations (Post-MVP)

- Phase 2 features including enhanced diaspora investment tools
- Initial secondary market features
- Development of mobile applications
- Introduction of subscription plans and additional service fees
- Deeper integrations with banking and payment systems

## 9. Assumptions & Dependencies

- **SPV Legal Framework**: Must be finalized and SEBON-compliant before development
- **Payment Processing**: Decision on initial payment handling impacts development
- **Regulatory Guidance**: Ongoing access to legal/compliance advice
- **Company & Investor Outreach**: Business development efforts run in parallel
- **Budget and Timeline**: MVP scope fits within 20 lakh budget and 3-month timeline
- **Supabase Suitability**: Features and limits adequate for MVP requirements
- **Team Familiarity**: Development team proficient in the chosen tech stack