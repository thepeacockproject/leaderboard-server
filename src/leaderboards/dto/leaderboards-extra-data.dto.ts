import { LeaderboardsExtraScoreDto } from "./leaderboards-extra-score.dto.js"
import {
    IsArray,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsString,
    ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"

class Percentile {
    /**
     * Array of number, length of 10.
     * Index 0 is high score, index 9 is low score
     */
    @IsArray()
    @IsNotEmpty()
    Spread: number[]

    @IsInt()
    Index: number
}

export class LeaderboardsExtraDataDto {
    @IsArray()
    peacockHeadlines: {
        type: string
        headline: string
        count: string
        scoreIsFloatingType: boolean
        fractionNumerator: number
        fractionDenominator: number
        scoreTotal: number
    }[]

    PlayStyle: unknown
    GroupIndex: number
    SniperChallengeScore: unknown | null

    @IsObject()
    @IsNotEmptyObject()
    Score: LeaderboardsExtraScoreDto

    @IsString()
    @IsNotEmpty()
    @IsIn(["UI_MENU_SCORE_CONTRACT_COMPLETED"])
    Description: "UI_MENU_SCORE_CONTRACT_COMPLETED"

    @IsString()
    @IsNotEmpty()
    ContractSessionId: string

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => Percentile)
    Percentile: Percentile
}
