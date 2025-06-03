# Environment Setup Instructions

## Step 2: Get Your Supabase Credentials

Once your Supabase project is created:

1. **Go to Settings → API** in your Supabase dashboard
2. **Copy these two values:**

### Project URL
```
https://your-project-ref.supabase.co
```

### Anon Public Key  
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Create .env.local File

Create a file named `.env.local` in your project root with this content:

```bash
# NepEx Pre-IPO App - Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Replace the values above with your actual Supabase credentials!** 