import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateFormSchema(req: Request, res: Response) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates form schemas in JSON format. The schema should include fields with types, labels, and validation rules."
        },
        {
          role: "user",
          content: `Generate a form schema for: ${prompt}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const schema = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(schema);
  } catch (error) {
    console.error('Error generating form schema:', error);
    res.status(500).json({ error: 'Failed to generate form schema' });
  }
} 