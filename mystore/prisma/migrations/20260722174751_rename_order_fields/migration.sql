/*
  Warnings:

  - You are about to drop the column `Address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `PostCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Province` on the `Order` table. All the data in the column will be lost.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "Address",
DROP COLUMN "PostCode",
DROP COLUMN "Province",
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "zipCode" INTEGER NOT NULL;
