-- CreateEnum
CREATE TYPE "GameVersion" AS ENUM ('scpc', 'h1', 'h2', 'h3');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('steam', 'epic', 'gog', 'scarlett');

-- CreateEnum
CREATE TYPE "LeaderboardDifficulty" AS ENUM ('unset', 'casual', 'normal', 'master');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT NOT NULL,
    "uid" UUID NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "contractId" UUID NOT NULL,
    "difficulty" "LeaderboardDifficulty" NOT NULL,
    "gameVersion" "GameVersion" NOT NULL,
    "platform" "Platform" NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardScore" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "platformId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "contract_id" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_displayName_key" ON "AdminUser"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_uid_key" ON "AdminUser"("uid");

-- AddForeignKey
ALTER TABLE "LeaderboardScore" ADD CONSTRAINT "contract_id" FOREIGN KEY ("contract_id") REFERENCES "Contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
