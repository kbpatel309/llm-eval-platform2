import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const results = await prisma.promptResult.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }
}