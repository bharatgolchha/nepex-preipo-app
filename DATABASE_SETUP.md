# Database Setup Guide for NepEx

This guide will help you connect your NepEx application to a Supabase database.

## Current Status

✅ **Database Layer Implemented**: The application now has a flexible database service that works with both localStorage (development) and Supabase (production).

⚠️ **Environment Required**: You need to configure Supabase environment variables to use the database.

## Quick Setup Steps

### 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `nepex-preipo`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users (e.g., Singapore for Nepal)
6. Click "Create new project"

### 2. Get Your Project Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xyzcompany.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIs...`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace** with your actual values from step 2.

### 4. Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` and paste it
4. Click "Run" to create all tables and functions

### 5. Test Connection

1. Restart your development server: `npm run dev`
2. Check the browser console - you should see: 
   - ✅ `Database: Using Supabase for data persistence`
   - ❌ If you see `localStorage warning`, check your environment variables

## Features

### 🔄 **Automatic Fallback**
- **No Environment**: Uses localStorage (perfect for development)
- **With Environment**: Uses Supabase (production-ready)

### 🏗️ **Database Service Layer**
The app now uses a unified database service (`src/lib/database.ts`) that:
- Abstracts localStorage and Supabase operations
- Provides the same API regardless of backend
- Handles data transformation between formats
- Includes error handling and logging

### 🎣 **React Hooks**
New custom hooks (`src/hooks/useDatabase.ts`):
- `useCompanies()` - Complete CRUD operations for companies
- `useDatabaseStatus()` - Connection status and type information

## File Structure

```
src/
├── lib/
│   ├── supabase.ts       # Supabase client configuration
│   └── database.ts       # Unified database service
├── hooks/
│   └── useDatabase.ts    # Database React hooks
└── vite-env.d.ts         # Environment type definitions
```

## Migration Status

### ✅ Ready for Migration
- Database schema created (`supabase-schema.sql`)
- Service layer implemented
- Environment configuration ready
- Type definitions in place

### 🔄 Next Steps (Optional)
To fully migrate admin panel to use the new database service:

1. Update `CompanyManagement.tsx` to use `useCompanies()` hook
2. Update `CreateCompany.tsx` to use the database service
3. Add real authentication integration
4. Implement user profile management

## Testing

### LocalStorage Mode (Current)
```bash
# No environment variables needed
npm run dev
# App works with localStorage
```

### Supabase Mode
```bash
# Set environment variables in .env.local
# Run database schema in Supabase
npm run dev
# App works with Supabase
```

## Troubleshooting

### Environment Variables Not Working
```bash
# Check if .env.local exists and has correct format
cat .env.local

# Restart dev server after adding environment variables
npm run dev
```

### Database Connection Issues
1. Verify Supabase project URL and anon key
2. Check if database schema was applied
3. Verify project billing status (free tier limits)
4. Check browser console for detailed error messages

### Schema Application Issues
1. Make sure you're in the correct Supabase project
2. Run schema in SQL Editor, not locally
3. Check for any SQL errors in the console
4. Verify all tables were created in **Table Editor**

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform
2. Ensure Supabase project is properly configured
3. Set up proper RLS (Row Level Security) policies
4. Configure Supabase authentication settings
5. Set up email templates for user notifications

## Current Capabilities

- ✅ Company CRUD operations
- ✅ Status management (active, pending, suspended, rejected)
- ✅ Document and KYC status tracking
- ✅ Real-time updates
- ✅ Error handling and logging
- ✅ Type safety with TypeScript
- ✅ Automatic localStorage fallback

## Next Features to Implement

- 🔲 User authentication integration
- 🔲 Investment tracking
- 🔲 File upload for documents
- 🔲 Email notifications
- 🔲 Advanced reporting and analytics 