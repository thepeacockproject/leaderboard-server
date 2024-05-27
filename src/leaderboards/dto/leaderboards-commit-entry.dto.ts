import { Type } from "class-transformer"
import {
    IsNotEmpty,
    IsUUID,
    IsString,
    IsIn,
    IsInt,
    Min,
    IsObject,
    Max,
    ValidateNested,
    IsNotEmptyObject,
    ValidateIf,
} from "class-validator"
import { LeaderboardsExtraDataDto } from "./leaderboards-extra-data.dto.js"
import {
    GameVersion,
    LeaderboardDifficulty,
    Platform,
} from "../../../gen/index.js"

const HITMAN_1_FUCKED_CONTRACT_IDS = [
    "00000000-0000-0000-0000-000000000200", // Paris
    "00000000-0000-0000-0000-000000000400", // Marrakesh
    "00000000-0000-0000-0000-000000000600", // Sapienza
    "00000000-0000-0000-0001-000000000006", // The Icon
    "00000000-0000-0000-0001-000000000005", // Landslide
]

export class LeaderboardsCommitEntryDto {
    @ValidateIf(
        ({ contractId }) => !HITMAN_1_FUCKED_CONTRACT_IDS.includes(contractId),
    )
    @IsString()
    @IsNotEmpty()
    @IsUUID(4)
    contractId: string

    @IsString()
    @IsNotEmpty()
    @IsIn(["unset", "casual", "normal", "master"])
    gameDifficulty: LeaderboardDifficulty

    @IsString()
    @IsNotEmpty()
    @IsIn(["h1", "h2", "h3", "scpc"])
    gameVersion: GameVersion

    @IsString()
    @IsNotEmpty()
    @IsIn(["steam", "epic", "gog", "scarlett"])
    platform: Platform

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    platformId: string

    @IsInt()
    @Min(0)
    @Max(209_999)
    score: number

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => LeaderboardsExtraDataDto)
    data: LeaderboardsExtraDataDto
}
