# MindMate Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# Email Configuration (Gmail)
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Steps

### 1. Supabase Setup
1. Create a Supabase project at https://supabase.com
2. Get your project URL and anon key from the project settings
3. Add them to your `.env.local` file

### 2. MongoDB Setup
1. Create a MongoDB database (MongoDB Atlas recommended)
2. Get your connection string
3. Add it to your `.env.local` file

### 3. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use your Gmail address and the app password in `.env.local`

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Project
```bash
npm run dev
```

## How the Hybrid Authentication Works

### Signup Flow:
1. User fills out signup form
2. Data is sent to `/api/auth/signup`
3. Password is hashed with bcrypt
4. User is created in MongoDB
5. Verification email is sent via nodemailer
6. User clicks email link → redirected to `/welcome` page

### Login Flow:
1. User enters credentials
2. Data is sent to `/api/auth/login`
3. Credentials are validated against MongoDB
4. Login attempts are tracked and accounts can be locked
5. On success, a minimal Supabase session is created for frontend state

### Email Verification:
1. User clicks verification link in email
2. Token is validated against MongoDB
3. User is marked as verified
4. User is redirected to welcome page

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- Account locking after 5 failed login attempts (2-hour lockout)
- Email verification required before login
- 24-hour expiration for verification tokens
- Input validation and sanitization 