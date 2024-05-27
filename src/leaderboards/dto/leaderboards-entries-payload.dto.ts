import { IsString, IsNotEmpty, IsIn } from "class-validator"
import {
    GameVersion,
    LeaderboardDifficulty,
    Platform,
} from "../../../gen/index.js"

export class LeaderboardsEntriesPayloadDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(["unset", "casual", "normal", "master"])
    difficulty: LeaderboardDifficulty

    @IsString()
    @IsNotEmpty()
    @IsIn(["h1", "h2", "h3", "scpc"])
    gameVersion: GameVersion

    @IsString()
    @IsNotEmpty()
    @IsIn(["steam", "epic", "gog", "scarlett"])
    platform: Platform
}
