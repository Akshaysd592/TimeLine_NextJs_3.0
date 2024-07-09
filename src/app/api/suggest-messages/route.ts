import { openai } from "@ai-sdk/openai";
import { OpenAIStream, StreamingTextResponse, streamText } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        // const { messages } = await req.json();
        // creating prompt to get suggested message from open ai
        const prompt = "Create a list of three open-ended and engaging questions formated as a single string. Each question should be seperated by '||' . These questions are for an anonymout social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensetive topics, focusing instead oon universal topics,your output should be structured like this: 'What's a hobby you've recently started?|| If you could have a dinner with any historical figure, who wouldit be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. ";

        const result = await streamText({
            model: openai("gpt-4-turbo"),
            prompt,
        });

        // const response = await openai.completions.create({
        //     model:'gpt-3.5-turbo-instruct',
        //     max_token: 400,
        //     stream:true,
        //     prompt,

        // })

        return result.toAIStreamResponse();
        // const stream = OpenAIStream(response)
        // return new StreamingTextResponse(stream)

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const { name, status, headers, message } = error;
            return NextResponse.json(
                {
                    name,
                    status,
                    headers,
                    message,
                },
                { status }
            );
        } else {
            console.log("An unexpected error occured", error);
            throw error;
        }
    }
}
