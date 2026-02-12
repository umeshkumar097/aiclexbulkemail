-- AlterTable
ALTER TABLE "GlobalSettings" ADD COLUMN     "enableCaptcha" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxDailyEmails" INTEGER NOT NULL DEFAULT 1000;
