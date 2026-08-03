-- AlterTable
ALTER TABLE "ContactInfo" ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTrashed" BOOLEAN NOT NULL DEFAULT false;
