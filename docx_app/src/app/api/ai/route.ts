// app/api/ai/route.ts

import { NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function POST(req: Request) {
    try {
        const { text, operation } = await req.json();

        if (!text) {
            return new NextResponse("Text is required", { status: 400 });
        }

        let prompt = "";
        let systemPrompt = "";

        switch (operation) {
            case "answer":
                systemPrompt = "You are a helpful assistant. Provide clear and detailed answers.";
                prompt = `Question: ${text}\n\nProvide a comprehensive answer:`;
                break;
            case "summarize":
                systemPrompt = "You are a summarization expert. Create clear, concise summaries.";
                prompt = `Text: ${text}\n\nProvide a concise summary:`;
                break;
            case "improve":
                systemPrompt = "You are a professional editor. Improve writing while maintaining the original message.";
                prompt = `Text: ${text}\n\nImprove this text while keeping its core message:`;
                break;
            case "explain":
                systemPrompt = "You are a teacher. Explain concepts simply and clearly.";
                prompt = `Text: ${text}\n\nExplain this in simple terms:`;
                break;
            case "expand":
                systemPrompt = "You are a content expert. Expand text with relevant details.";
                prompt = `Text: ${text}\n\nExpand this text with more details:`;
                break;
            case "proofread":
                systemPrompt = "You are a grammar and style expert. Fix grammatical errors and improve clarity.";
                prompt = `Text: ${text}\n\nProofread and improve this text:`;
                break;
            case "professional":
                systemPrompt = "You are a professional writer. Rewrite text in a formal and business tone.";
                prompt = `Text: ${text}\n\nRewrite this text in a professional tone:`;
                break;
            case "generate_ideas":
                systemPrompt = "You are a creative thinker. Provide innovative and relevant ideas.";
                prompt = `Topic: ${text}\n\nGenerate creative ideas for this topic:`;
                break;
            case "analyze":
                systemPrompt = "You are an analytical expert. Provide an in-depth analysis of the given text.";
                prompt = `Text: ${text}\n\nProvide a detailed analysis of this text:`;
                break;
            case "research_notes":
                systemPrompt = "You are a research assistant. Create detailed and organized research notes.";
                prompt = `Topic: ${text}\n\nGenerate comprehensive research notes for this topic:`;
                break;
            case "generate_code":
                systemPrompt = "You are a coding assistant. Write high-quality code based on the given description.";
                prompt = `Description: ${text}\n\nWrite code to accomplish this:`;
                break;
            default:
                return new NextResponse("Invalid operation", { status: 400 });
        }

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 2048,
                top_p: 1,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json({ result: data.choices[0].message.content });

    } catch (error) {
        console.error("[AI_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
