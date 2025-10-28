import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, mode, model = 'gpt-4o' } = await request.json();

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    if (mode === 'chat') {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return NextResponse.json({
        content: completion.choices[0].message.content,
        role: 'assistant',
      });
    } else if (mode === 'image') {
      const lastMessage = messages[messages.length - 1];

      // Using DALL-E 3 for image generation
      // Note: As of 2025, GPT-4o with vision can analyze images but doesn't generate them
      // For image generation, we use DALL-E 3 which is the latest image generation model
      const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: lastMessage.content,
        n: 1,
        size: '1024x1024',
        quality: 'hd', // Use HD quality for better results
        style: 'vivid', // More vibrant and detailed images
      });

      return NextResponse.json({
        content: imageResponse.data[0].url,
        role: 'assistant',
        type: 'image',
      });
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}