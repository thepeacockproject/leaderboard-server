import { Body, Controller, Param, Post } from "@nestjs/common"
import { LeaderboardsEntriesPayloadDto } from "./dto/leaderboards-entries-payload.dto.js"
import { LeaderboardsCommitEntryDto } from "./dto/leaderboards-commit-entry.dto.js"
import { LeaderboardsDeleteEntryDto } from "./dto/leaderboards-delete-entry.dto.js"
import { LeaderboardsService } from "./leaderboards.service.js"

@Controller("leaderboards")
export class LeaderboardsController {
    constructor(private readonly leaderboardsService: LeaderboardsService) {}

    @Post("/entries/:contractId")
    postGetEntriesV2(
        @Body() body: LeaderboardsEntriesPayloadDto,
        @Param("contractId") contractId: string,
    ) {
        return this.leaderboardsService.getEntries(
            contractId,
            body.difficulty,
            body.gameVersion,
            body.platform,
        )
    }

    @Post("/commit")
    async postCommitEntryV2(@Body() body: LeaderboardsCommitEntryDto) {
        await this.leaderboardsService.commitEntry(body)

        // TODO: get actual data
        return {
            isPersonalBestScore: true,
            isPersonalBestStars: true,
            isPersonalBestTime: true,
            newPlace: 1,
            entriesCount: 1,
        }
    }

    @Post("/delete")
    async postDeleteEntryV2(@Body() body: LeaderboardsDeleteEntryDto) {
        throw new Error("Temporarily disabled")

        const entry = await this.leaderboardsService.deleteEntry(body.id)

        return {
            deleted: true,
            entry,
        }
    }
}
