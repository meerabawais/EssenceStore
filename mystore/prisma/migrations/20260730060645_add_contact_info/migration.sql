-- CreateTable
CREATE TABLE "contactInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contactInfo_pkey" PRIMARY KEY ("id")
);
