  Authentication Web App - README.md (Updated with Live Demo & SMS Domain Info)

```markdown
  Authentication Web App

This project is a  full-stack authentication system  built with  Next.js 16 ,  NextAuth.js v5 ,  Prisma , and  PostgreSQL . It supports multiple authentication methods and meets high security standards.

  🌐 Live Demo

Check out the live application: [https://authentication-phi-plum.vercel.app/](https://authentication-phi-plum.vercel.app/)

  📋 Table of Contents

- [Technologies]( technologies)
- [Features]( features)
- [Live Demo]( live-demo)
- [Installation]( installation)
- [Environment Variables]( environment-variables)
- [SMS Configuration (2FA)]( sms-configuration-2fa)
- [Authentication Methods]( authentication-methods)
- [Database Schema]( database-schema)
- [Email Verification]( email-verification)
- [2FA (Two-Factor Authentication)]( 2fa-two-factor-authentication)
- [API Routes]( api-routes)
- [Middleware]( middleware)
- [Deployment]( deployment)
- [Common Issues & Solutions]( common-issues--solutions)
- [Project Structure]( project-structure)

  🚀 Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | Frontend + Backend |
| NextAuth.js | v5-beta | Authentication |
| Prisma | 6.19.2 | ORM (PostgreSQL) |
| PostgreSQL | - | Database |
| Tailwind CSS | 4 | Styling |
| TypeScript | 5 | Type safety |
| Resend | 6.9.2 | Email service |
| Zod | 4.3.6 | Validation |
| Bcryptjs | 3.0.3 | Password hashing |
| React Hook Form | 7.71.1 | Forms |
| Sonner | 2.0.7 | Toast notifications |

  ✨ Features

- ✅  3 Authentication Methods 
  - Email/Password (Credentials)
  - Google OAuth
  - GitHub OAuth
- ✅  Email Verification  - After registration
- ✅  2FA (Two-Factor Authentication)  - Via email/SMS code
- ✅  Password Reset  - Via email
- ✅  Role-based Access Control  (ADMIN/USER)
- ✅  Route Protection  via Middleware
- ✅  Edge Runtime  compatible auth
- ✅  Server Actions  for secure operations
- ✅  Prisma  with PostgreSQL
- ✅  Responsive UI  (shadcn/ui)
- ✅  Live Demo  - [https://authentication-phi-plum.vercel.app/](https://authentication-phi-plum.vercel.app/)

  📦 Installation

   1. Clone the repository
```bash
git clone *****
cd authentication
```

   2. Install dependencies
```bash
npm install
```

   3. Configure environment variables
Create a `.env` file and add the following:

```env
  Database
DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"

  NextAuth
AUTH_SECRET="your-super-secret-key-at-least-32-chars"

  OAuth (Google)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

  OAuth (GitHub)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

  Email (Resend)
RESEND_API_KEY="your-resend-api-key"

  App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

   4. Setup Prisma
```bash
  Run database migration
npx prisma migrate dev --name init

  Generate Prisma Client
npx prisma generate
```

   5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

  📱 SMS Configuration (2FA)

For Two-Factor Authentication (2FA) via SMS, you need to:

   1. Purchase a Domain
- Buy a domain from any registrar (GoDaddy, Namecheap, etc.)
- Example: `yourauth.com`

   2. Configure SMS Provider
The application supports sending 2FA codes to any email address. To enable SMS functionality:

```env
  SMS Provider Configuration (Example with Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="+1234567890"
SMS_DOMAIN="yourauth.com"    Your purchased domain
```

   3. How SMS Sending Works
- When 2FA is enabled, a 6-digit code is generated
- The code is sent via the configured SMS provider
- The sender ID/domain will appear as your purchased domain

```typescript
// Example SMS sending logic
await sendTwoFactorSMS({
  to: user.phoneNumber,
  code: generatedCode,
  from: process.env.SMS_DOMAIN  // Your domain appears as sender
});
```

   4. SMS Provider Options
-  Twilio  - Most popular, supports global SMS
-  Vonage (Nexmo)  - Good for Europe
-  MessageBird  - Competitive pricing
-  Local providers  - For specific countries

  🔐 Authentication Methods

   Credentials (Email/Password)
```typescript
// actions/login.ts
const result = await login({
  email: "user@example.com",
  password: "password123"
});
```

   Google OAuth
```typescript
// components/auth/google-button.tsx
signIn("google", { callbackUrl: "/dashboard" });
```

   GitHub OAuth
```typescript
// components/auth/github-button.tsx
signIn("github", { callbackUrl: "/dashboard" });
```

  📧 Email Verification

After registration, a verification email is sent to the user's email address:

```
Subject: Verify your email
Body: Click the link to verify: https://authentication-phi-plum.vercel.app/auth/new-verification?token=abc123...
```

The token is  valid for 1 hour  and can only be used once.

  🔢 2FA (Two-Factor Authentication)

When a user enables 2FA, the login process becomes two-step:

1.  Email + Password  → 2FA code is requested
2.  SMS/Email Code  → 6-digit code sent to email/phone
3.  Code Verification  → Access to dashboard

```typescript
// Enable 2FA
await db.user.update({
  where: { id: user.id },
  data: { isTwoFactorEnabled: true }
});
```

   2FA with SMS
- Requires a purchased domain and SMS provider configuration
- The domain name appears as the sender
- Works with any email address or phone number

  🗄️ Database Schema

```prisma
model User {
  id              String    @id @default(cuid())
  name            String?
  email           String?   @unique
  emailVerified   DateTime?
  image           String?
  password        String?
  role            UserRole  @default(USER)
  isTwoFactorEnabled Boolean @default(false)
  phoneNumber     String?   // For SMS 2FA
  accounts        Account[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  user               User    @relation(fields: [userId], references: [id])
}

model VerificationToken {
  id      String @id @default(cuid())
  email   String
  token   String @unique
  expires DateTime
  @@unique([email, token])
}

model TwoFactorToken {
  id      String @id @default(cuid())
  email   String
  token   String @unique
  expires DateTime
  @@unique([email, token])
}

model TwoFactorConfirmation {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id])
  expires   DateTime
}
```

  🛣️ API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth.js |
| `/api/admin` | GET | Admin panel |
| `/api/register` | POST | User registration |
| `/api/verify-email` | POST | Email verification |
| `/api/2fa/send` | POST | Send 2FA code (email/SMS) |
| `/api/2fa/verify` | POST | Verify 2FA code |

  🛡️ Middleware

```typescript
// middleware.ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
```

  🚢 Deployment

   Deploy to Vercel
```bash
npm run build
vercel --prod
```

   Environment Variables
Add all `.env` variables to your Vercel dashboard:
- `DATABASE_URL` (production database)
- `AUTH_SECRET` (generate a new one)
- OAuth credentials (with production URLs)
- SMS provider credentials (for 2FA)

  ❗ Common Issues & Solutions

   1. Prisma Client Error
```bash
Error: @prisma/client did not initialize yet.
```
 Solution:  Run `npx prisma generate`

   2. Edge Runtime vs Node.js
```bash
Error: Dynamic API was called outside request scope.
```
 Solution:  Maintain separate `auth/edge.ts` and `auth/index.ts` configurations

   3. Hydration Error
```bash
A tree hydrated but some attributes didn't match...
```
 Solution:  Replace random IDs with `useId()` hook

   4. SMS Sending Issues
```bash
Error: Unable to send SMS
```
 Solution:  
- Verify domain is properly configured
- Check SMS provider credentials
- Ensure phone number is in correct format

  📁 Project Structure

```
authentication/
├── actions/                Server Actions
├── app/                     Next.js App Router
│   ├── (protected)/         Protected routes
│   ├── (public)/            Public routes
│   ├── api/                 API routes
│   └── auth/                Auth routes
├── components/              React components
├── data/                    Data access functions
├── hooks/                   Custom hooks
├── lib/                     Utility functions
├── prisma/                  Prisma schema
├── public/                  Static files
├── schemas/                 Zod schemas
├── types/                   TypeScript types
├── .env                     Environment variables
├── middleware.ts            Next.js middleware
├── auth.ts                  NextAuth configuration
└── auth.config.ts           NextAuth provider config
```

  🌍 Live Demo

Experience the application live: [https://authentication-phi-plum.vercel.app/](https://authentication-phi-plum.vercel.app/)

  📄 License

MIT

  👨‍💻 Author

Abdulatif

  Support
abdulatifsh90@gmail.com

For issues, please open a GitHub issue or contact the author.
```

Key additions made:
1. ✅  Live Demo link  - Added at the top and in a dedicated section
2. ✅  SMS Configuration  - Detailed explanation of domain purchase and SMS setup
3. ✅  SMS Provider Options  - List of providers and configuration examples
4. ✅  2FA with SMS  - Explanation of how domain appears as sender
5. ✅  Troubleshooting  - Added SMS sending issues section
