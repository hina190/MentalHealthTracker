# Authentication Setup Guide

This guide will help you set up Supabase authentication for your MindMate application.

## Prerequisites

1. A Supabase account and project
2. Node.js and npm installed
3. The MindMate application code

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be set up (this may take a few minutes)

## Step 2: Configure Supabase Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Under **Site URL**, add your application URL:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)

## Step 3: Set Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase dashboard under **Settings** > **API**.

## Step 4: Configure Email Templates (Optional)

1. In Supabase dashboard, go to **Authentication** > **Email Templates**
2. Customize the email templates for:
   - Magic Link
   - Email Confirmation
   - Password Reset

## Step 5: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Enter your email address
4. Check your email for the magic link
5. Click the link to authenticate

## Troubleshooting

### "No session found" Error

This usually happens when:
1. Environment variables are not set correctly
2. Redirect URLs are not configured properly
3. The callback route is not working

**Solutions:**
1. Double-check your environment variables
2. Ensure redirect URLs are correct in Supabase settings
3. Check browser console for errors
4. Verify the `/auth/callback` route is accessible

### Email Not Received

1. Check your spam folder
2. Verify your email address is correct
3. Check Supabase logs for email delivery issues
4. Ensure email templates are configured

### Session Not Persisting

1. Check if `persistSession: true` is set in Supabase client config
2. Verify browser storage is not being cleared
3. Check for any code that might be clearing the session

## Security Considerations

1. Never commit your `.env.local` file to version control
2. Use environment variables for all sensitive configuration
3. Regularly rotate your API keys
4. Monitor authentication logs in Supabase dashboard

## Production Deployment

When deploying to production:

1. Update the Site URL and Redirect URLs in Supabase settings
2. Set production environment variables
3. Ensure HTTPS is enabled
4. Test the authentication flow thoroughly

## Support

If you're still having issues:

1. Check the browser console for errors
2. Review Supabase logs in the dashboard
3. Verify all configuration steps have been completed
4. Test with a fresh browser session 