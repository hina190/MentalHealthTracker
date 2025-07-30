-- Create moods table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS moods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  emoji TEXT NOT NULL,
  note TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by email
CREATE INDEX IF NOT EXISTS idx_moods_email ON moods(email);

-- Create index for date sorting
CREATE INDEX IF NOT EXISTS idx_moods_date ON moods(date);

-- Enable Row Level Security (RLS)
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own moods
CREATE POLICY "Users can view their own moods" ON moods
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to insert their own moods
CREATE POLICY "Users can insert their own moods" ON moods
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to update their own moods
CREATE POLICY "Users can update their own moods" ON moods
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to delete their own moods
CREATE POLICY "Users can delete their own moods" ON moods
  FOR DELETE USING (auth.jwt() ->> 'email' = email); 