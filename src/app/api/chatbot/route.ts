import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return NextResponse.json({ reply: 'Groq API key is missing. Please set GROQ_API_KEY in your .env.local.' }, { status: 500 });
  }

  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: 'You are a supportive mental health assistant.' },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    return NextResponse.json({ reply: error?.error?.message || 'Sorry, I could not generate a response.' }, { status: 500 });
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

  return NextResponse.json({ reply });
}
  