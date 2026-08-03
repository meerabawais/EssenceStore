/*
  Warnings:

  - Added the required column `gst` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "gst" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "products" JSONB NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL DEFAULT 0;
