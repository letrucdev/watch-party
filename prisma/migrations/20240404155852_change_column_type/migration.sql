/*
  Warnings:

  - The `animationEnable` column on the `UserSetting` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ecoMode` column on the `UserSetting` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserSetting" DROP COLUMN "animationEnable",
ADD COLUMN     "animationEnable" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "ecoMode",
ADD COLUMN     "ecoMode" BOOLEAN NOT NULL DEFAULT false;
