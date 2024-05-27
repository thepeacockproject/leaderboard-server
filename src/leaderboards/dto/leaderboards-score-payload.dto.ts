import { LeaderboardsExtraScoreDto } from "./leaderboards-extra-score.dto.js"
import { GameVersion, LeaderboardScore, Platform } from "../../../gen/index.js"

// TODO: rewrite this dogshit
export class LeaderboardsScorePayloadDto {
    constructor(
        lbScore: LeaderboardScore,
        platform: Platform,
        gameVersion: GameVersion,
        rank: number,
    ) {
        const Data = {
            // @ts-ignore
            Score: lbScore.data.Score,
            // @ts-ignore
            Description: lbScore.data.Description,
            // @ts-ignore
            ContractSessionId: lbScore.data.ContractSessionId,
            // @ts-ignore
            PlayStyle: lbScore.data.PlayStyle,
            // @ts-ignore
            IsVR: lbScore.data.Score.IsVR,
            // @ts-ignore
            Percentile: lbScore.data.Percentile,
            // @ts-ignore
            SniperChallengeScore: lbScore.data.SniperChallengeScore,
            // @ts-ignore
            GroupIndex: lbScore.data.GroupIndex,
        }

        this.LeaderboardData = {
            Player: {
                displayName: lbScore.username,
            },
            Score: lbScore.score,
            Rank: rank,
            Data,
            Player2: null,
        }
        this.detailedscore = {
            // @ts-ignore
            Headlines: lbScore.data.peacockHeadlines,
        }

        this.platform = platform
        this.platformId = lbScore.platformId
        this.gameVersion = gameVersion
        this.entryId = lbScore.id
    }

    LeaderboardData: {
        Player: {
            displayName: string
        }
        Score: number
        Rank: number
        Data: {
            Score: LeaderboardsExtraScoreDto
            Description: string
            ContractSessionId: string
            GroupIndex: number
            SniperChallengeScore: unknown | null
            PlayStyle: unknown | null
            Percentile?: {
                /**
                 * Array of number, length of 10.
                 * Index 0 is high score, index 9 is low score
                 */
                Spread: number[]
                /**
                 * Score index over spread
                 */
                Index: number
            }
            IsVR: boolean
        }
        Player2: unknown | null
    }

    detailedscore: {
        // Matches peacockHeadlines
        Headlines: {
            type: string
            headline: string
            count: string
            scoreIsFloatingType: boolean
            fractionNumerator: number
            fractionDenominator: number
            scoreTotal: number
        }[]
    }

    platform: Platform

    platformId: string

    gameVersion: GameVersion

    entryId: number
}
