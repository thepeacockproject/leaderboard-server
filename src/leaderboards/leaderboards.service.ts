import { BadRequestException, Injectable, Logger } from "@nestjs/common"
import { LeaderboardsCommitEntryDto } from "./dto/leaderboards-commit-entry.dto.js"
import { LeaderboardsScorePayloadDto } from "./dto/leaderboards-score-payload.dto.js"
import { PrismaService } from "../prisma/prisma.service.js"
import {
    GameVersion,
    LeaderboardDifficulty,
    LeaderboardScore,
    Platform,
    Prisma,
} from "../../gen/index.js"
import LeaderboardScoreCreateInput = Prisma.LeaderboardScoreCreateInput
import InputJsonValue = Prisma.InputJsonValue

@Injectable()
export class LeaderboardsService {
    private readonly logger = new Logger(LeaderboardsService.name)

    protected static readonly LEADERBOARDS_BANNED_USERS: readonly string[] = [
        "codex",
        "agent 47",
        "agent_47",
        "player",
        "redhitman6",
        "fitgirl",
        "agent price",
        "setmetatable",
        "goldberg",
        "p2p",
        "noob",
    ]

    constructor(private readonly prismaService: PrismaService) {}

    async getEntries(
        contractId: string,
        difficulty: LeaderboardDifficulty,
        gameVersion: GameVersion,
        platform: Platform,
    ) {
        const contract = await this.prismaService.contract.findFirst({
            where: {
                contractId,
                difficulty,
                gameVersion,
                platform,
            },
        })

        if (!contract) return []

        const rawScores = await this.prismaService.leaderboardScore.findMany({
            where: {
                contract: {
                    id: contract.id,
                },
            },
            orderBy: {
                score: "desc",
            },
        })

        return rawScores.map(
            (rScore, index) =>
                new LeaderboardsScorePayloadDto(
                    rScore,
                    contract.platform,
                    contract.gameVersion,
                    index + 1,
                ),
        )
    }

    async commitEntry(
        commitEntryDto: LeaderboardsCommitEntryDto,
    ): Promise<LeaderboardScore> {
        if (
            LeaderboardsService.LEADERBOARDS_BANNED_USERS.includes(
                commitEntryDto.username.toLowerCase(),
            )
        ) {
            throw new BadRequestException("Platform validation error")
        }

        let contract = await this.prismaService.contract.findFirst({
            where: {
                contractId: commitEntryDto.contractId,
                platform: commitEntryDto.platform,
                gameVersion: commitEntryDto.gameVersion,
                difficulty: commitEntryDto.gameDifficulty,
            },
        })

        if (!contract) {
            this.logger.debug(`Creating contract`, {
                contractId: commitEntryDto.contractId,
                difficulty: commitEntryDto.gameDifficulty,
                platform: commitEntryDto.platform,
                gameVersion: commitEntryDto.gameVersion,
            })

            contract = await this.prismaService.contract.create({
                data: {
                    contractId: commitEntryDto.contractId,
                    difficulty: commitEntryDto.gameDifficulty,
                    platform: commitEntryDto.platform,
                    gameVersion: commitEntryDto.gameVersion,
                },
            })
        }

        if (!contract) {
            throw new Error("No score registered")
        }

        const existingScore =
            await this.prismaService.leaderboardScore.findFirst({
                where: {
                    contract,
                    platformId: commitEntryDto.platformId,
                },
            })

        const scoreEntity: LeaderboardScoreCreateInput = {
            score: commitEntryDto.score,
            username: commitEntryDto.username,
            platformId: commitEntryDto.platformId,
            data: commitEntryDto.data as unknown as InputJsonValue,
            contract: {
                connect: {
                    id: contract.id,
                },
            },
        }

        if (!existingScore) {
            this.logger.debug(`Creating score`, {
                contractId: commitEntryDto.contractId,
                difficulty: commitEntryDto.gameDifficulty,
                platform: commitEntryDto.platform,
                gameVersion: commitEntryDto.gameVersion,
                score: commitEntryDto.score,
                username: commitEntryDto.username,
                platformId: commitEntryDto.platformId,
            })

            return this.prismaService.leaderboardScore.create({
                data: scoreEntity,
            })
        }

        if (existingScore.score < commitEntryDto.score) {
            return this.prismaService.leaderboardScore.update({
                where: {
                    id: existingScore.id,
                },
                data: scoreEntity,
            })
        }

        return this.prismaService.leaderboardScore.findFirstOrThrow({
            where: {
                id: existingScore.id,
            },
        })
    }

    async deleteEntry(entryId: number) {
        const entry =
            await this.prismaService.leaderboardScore.findFirstOrThrow({
                where: {
                    id: entryId,
                },
            })

        await this.prismaService.leaderboardScore.delete({
            where: {
                id: entryId,
            },
        })

        return entry
    }
}
