import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // In production, use OpenAI or similar for personalized tips
  // Here, we return a random tip for demo
  const tips = [
    'Take a short walk to clear your mind.',
    'Try deep breathing for 2 minutes.',
    'Write down three things you are grateful for.',
    'Reach out to a friend or loved one.',
    'Take a break and listen to your favorite music.',
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return NextResponse.json({ tip });
}