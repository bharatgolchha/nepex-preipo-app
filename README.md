# NepEx - Pre-IPO Investment Platform for Nepal

NepEx is a digital platform democratizing access to pre-IPO investment opportunities in Nepal, connecting retail investors with companies seeking capital before going public.

## 🚀 Features

- **SPV-based Micro-Investments**: Start investing with as little as NPR 10,000
- **KYC Compliance**: SEBON-compliant verification process
- **Company Listings**: Browse and invest in pre-IPO opportunities
- **Portfolio Management**: Track your investments and SPV units
- **Educational Resources**: Learn about pre-IPO investing
- **Admin Dashboard**: Manage users, companies, and compliance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nepex-preipo-app.git
   cd nepex-preipo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   
   - Create a new Supabase project
   - Run the migrations in `/supabase/migrations`
   - Set up storage buckets for KYC documents
   - Configure authentication providers

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
nepex-preipo-app/
├── src/
│   ├── components/     # Reusable React components
│   │   └── ui/        # ShadCN UI components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and Supabase client
│   ├── types/         # TypeScript type definitions
│   └── styles/        # Global styles
├── public/            # Static assets
├── supabase/          # Database migrations and functions
└── docs/              # Documentation
```

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

### Component Development

We use ShadCN UI components. To add a new component:

```bash
npx shadcn-ui@latest add button
```

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Secure document storage for KYC
- Environment variables for sensitive data
- HTTPS only in production

## 📊 Database Schema

Key tables:
- `users` - User profiles and KYC status
- `companies` - Company information
- `offerings` - Investment opportunities
- `investments` - Transaction records
- `spv_units` - SPV unit allocations

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables (Production)

```env
VITE_SUPABASE_URL=production_supabase_url
VITE_SUPABASE_ANON_KEY=production_anon_key
```

### Deployment Platforms

- Vercel (recommended)
- Netlify
- AWS Amplify

## 📱 User Types

1. **Investors** - Retail and micro-investors
2. **Companies** - Seeking pre-IPO funding
3. **Administrators** - Platform management
4. **Diaspora Investors** - Non-resident Nepalis

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support, email support@nepex.com or open an issue in the repository.

## 🗺️ Roadmap

### MVP (Current)
- ✅ User authentication and KYC
- ✅ Company listings
- ✅ SPV-based investments
- ✅ Basic portfolio view
- ✅ Admin dashboard

### Phase 2
- 📱 Mobile applications
- 💱 Secondary market features
- 🌍 Enhanced diaspora tools
- 💳 Advanced payment integrations

## ⚖️ Compliance

This platform is designed to comply with SEBON (Securities Board of Nepal) regulations. All investments are subject to:
- KYC verification
- 3-year lock-in period
- Regulatory reporting requirements

---

Built with ❤️ for democratizing investments in Nepal