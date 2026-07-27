/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_sessionId_productId_key" ON "CartItem"("sessionId", "productId");
