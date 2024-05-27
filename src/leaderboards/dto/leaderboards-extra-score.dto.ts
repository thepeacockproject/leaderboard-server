import {
    IsArray,
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    Max,
    Min,
} from "class-validator"

export class LeaderboardsExtraScoreDto {
    @IsBoolean()
    @IsOptional()
    IsVR: boolean

    @IsNumber()
    @Min(0)
    @Max(209_999)
    Total: number

    @IsArray()
    AchievedMasteries: {
        score: number
        RatioParts: number
        RatioTotal: number
        Id: string
        BaseScore: number
    }[]

    @IsArray()
    AwardedBonuses: {
        Score: number
        Id: string
        FractionNumerator: number
        FractionDenominator: number
    }[]

    @IsInt()
    TotalNoMultipliers: number

    @IsInt()
    TimeUsedSecs: number

    @IsInt()
    StarCount: number

    FailedBonuses: unknown | null

    @IsBoolean()
    SilentAssassin: boolean
}
