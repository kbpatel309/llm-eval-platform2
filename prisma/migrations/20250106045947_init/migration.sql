-- CreateTable
CREATE TABLE "PromptResult" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "relevance" DOUBLE PRECISION NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromptResult_pkey" PRIMARY KEY ("id")
);
