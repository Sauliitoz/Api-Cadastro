/*
  Warnings:

  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `cpf` on the `Cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `numero` on the `Cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Cliente_cpf_key";

-- AlterTable
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_pkey",
DROP COLUMN "cpf",
ADD COLUMN     "cpf" BIGINT NOT NULL,
DROP COLUMN "numero",
ADD COLUMN     "numero" INTEGER NOT NULL,
ADD CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cpf");
