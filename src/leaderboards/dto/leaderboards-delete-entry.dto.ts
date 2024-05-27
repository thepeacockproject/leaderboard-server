import { IsInt, Min } from "class-validator"

export class LeaderboardsDeleteEntryDto {
    @IsInt()
    @Min(0)
    id: number
}
