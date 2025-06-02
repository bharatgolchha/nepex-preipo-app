# Claude Instructions for NepEx PreIPO App

## Project Overview
NepEx is a pre-IPO investment platform for Nepal that connects retail investors with companies seeking capital before going public. The platform features an SPV-based pooling mechanism for micro-investments starting at NPR 10,000.

## Technology Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI (Radix UI based components)
- **Backend**: Supabase
  - PostgreSQL database
  - Built-in authentication
  - Storage for documents
  - Edge Functions for serverless logic
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure
```
/src
  /components     # Reusable React components
    /ui          # ShadCN UI components
  /pages         # Page components
  /hooks         # Custom React hooks
  /lib           # Utility functions and Supabase client
  /types         # TypeScript type definitions
  /styles        # Global styles and Tailwind config
/public          # Static assets
/supabase       # Supabase migrations and functions
```

## Key Development Guidelines

### 1. Code Style
- Use TypeScript for all new files
- Follow React functional component patterns with hooks
- Use proper TypeScript types - avoid `any`
- Component files should be in PascalCase (e.g., `UserProfile.tsx`)
- Use descriptive variable and function names

### 2. Component Development
- Use ShadCN UI components as the base for UI elements
- Create custom components in `/src/components`
- Keep components small and focused on a single responsibility
- Use proper prop typing with TypeScript interfaces

### 3. Supabase Integration
- Always use Row Level Security (RLS) policies
- Handle authentication state properly
- Use proper error handling for database operations
- Store sensitive data securely

### 4. State Management
- Use React Context for global state when needed
- Keep component state local when possible
- Consider using React Query/TanStack Query for server state

### 5. Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain responsive design (mobile-first approach)
- Use CSS variables for theme colors

## Important Features to Remember

### User Types
1. **Investors** (Micro and Retail)
2. **Company Representatives**
3. **Platform Administrators**
4. **Diaspora Investors** (flagged accounts)

### Core Functionality
1. **KYC Process**: Document upload and admin approval
2. **SPV Investment**: Minimum NPR 10,000 for pooled investments
3. **Offering Listings**: Company profiles and investment opportunities
4. **Portfolio Management**: Track investments and SPV units
5. **Admin Dashboard**: Approve KYC, companies, and offerings

### Compliance Requirements
- SEBON regulatory compliance for KYC
- Three-year lock-in period for pre-IPO investments
- Audit trail for all transactions
- Secure document storage

## Testing and Quality
- Write unit tests for utility functions
- Test components with React Testing Library
- Ensure all forms have proper validation
- Test across different screen sizes
- Check accessibility (WCAG compliance)

## Security Considerations
- Never expose Supabase service keys in frontend code
- Validate all user inputs
- Use HTTPS for all communications
- Implement proper CORS policies
- Follow OWASP security guidelines

## Database Schema Key Tables
- `users` - User profiles and KYC status
- `companies` - Company profiles
- `offerings` - Pre-IPO investment opportunities
- `investments` - Investment transactions
- `spv_units` - SPV unit allocations
- `documents` - KYC and company documents metadata

## Common Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
```

## Performance Optimization
- Use React.lazy() for code splitting
- Optimize images before upload
- Implement pagination for lists
- Use Supabase query optimization
- Cache static content appropriately

## Deployment Notes
- Environment variables should be properly set
- Supabase project should be configured
- Use proper production builds
- Enable error tracking (e.g., Sentry)

## When Making Changes
1. Always check the PRD.md for feature requirements
2. Ensure changes align with MVP scope
3. Test thoroughly before marking tasks complete
4. Update documentation if adding new features
5. Follow the existing code patterns

Remember: This is an MVP focused on validating the core concept. Keep solutions simple and avoid over-engineering.