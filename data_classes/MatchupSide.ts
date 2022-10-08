import { SleeperPlayerDetails } from "../interfaces/sleeper_api/custom/Player"
import { LeagueSettings } from "../interfaces/sleeper_api/LeagueSettings"
import { SleeperMatchup } from "../interfaces/sleeper_api/SleeperMatchup"
import { MatchupPlayer } from "./MatchupPlayer"

export class MatchupSide {
    pf: number = 0
    pp: number = 0
    opslap: number = 0
    projectedScore: number = 0
    roster_id: number
    starters: MatchupPlayer[]
    bench: MatchupPlayer[]
    matchup_id: number
    custom_points: number = 0

    constructor(matchup: SleeperMatchup, stats: Map<string, any>, projections: Map<string, any>, playerDetails: Map<string, SleeperPlayerDetails>, settings: LeagueSettings) {
        this.roster_id = matchup.roster_id
        this.matchup_id = matchup.matchup_id
        this.starters = matchup.starters.map((playerId, index) => {
            if (playerId == "0") {
                return new MatchupPlayer(playerId)
            } else {
                return new MatchupPlayer(playerId, settings.roster_positions?.at(index), stats.get(playerId), projections.get(playerId), playerDetails.get(playerId)!.fantasy_positions, settings.scoring_settings)
            }
            
            
        })
        this.bench = matchup.players.filter(player => !matchup.starters.includes(player)).map((playerId, index) => {
            return new MatchupPlayer(playerId, "BN", stats.get(playerId), projections.get(playerId), playerDetails.get(playerId)!.fantasy_positions, settings.scoring_settings)
            
        })
        if (matchup.custom_points) {
            this.custom_points = matchup.custom_points
        }
        this.calcPoints()
    }

    calcPoints() {
        this.starters.forEach(starter => {
            this.pf += starter.score
            this.projectedScore += starter.projectedScore
        })
        this.pf += this.custom_points
    }
}
