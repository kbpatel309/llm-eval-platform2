import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from 'axios';

type LLMResponse = {
    model: string;
    response: string;
    accuracy: number;
    relevance: number;
    responseTime: number;
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { prompt } = body;
    const models = ['gpt-4', 'anthropic'];

    const results: LLMResponse[] = await Promise.all(models.map(async (model) => {
        const start = Date.now();
        const response = await getLLMResponse(model, prompt);
        const end = Date.now();

        const accuracy = Math.random() * 100 // Placeholder
        const relevance = Math.random() * 100 // Placeholder

        const result = {
            model,
            response,
            accuracy,
            relevance,
            responseTime: end - start,
        };

        await prisma.promptResult.create({
            data: {
                prompt,
                model,
                response: result.response,
                accuracy: result.accuracy,
                relevance: result.relevance,
                responseTime: result.responseTime,
            },
        });

        return result;
    }));

    return NextResponse.json(results);
}

async function getLLMResponse(model: string, prompt: string): Promise<string> {
    if (model === 'gpt-4') {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
        }, {
            headers: { 
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
            },
        });
        return response.data.choices[0].message.content;
    }
    return 'Unsupported model';
}