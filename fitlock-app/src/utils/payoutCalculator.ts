/**
 * FitLock Payout Calculator
 *
 * Simple proportional payout system:
 * - Winners split the entire pool based on their contribution
 * - Pledger's stake is treated as a YES bet for payout purposes
 */

export interface BetContribution {
  userId: string
  amount: number
  side: 'yes' | 'no'
}

export interface PayoutResult {
  userId: string
  contribution: number
  payout: number
  profit: number
}

/**
 * Calculate payout for a single winner
 * @param userContribution - How much this user contributed
 * @param totalWinnerContributions - Total amount contributed by all winners
 * @param totalPool - Total pool (all contributions from both sides)
 * @returns Payout amount for this user
 */
export function calculateSinglePayout(
  userContribution: number,
  totalWinnerContributions: number,
  totalPool: number
): number {
  if (totalWinnerContributions === 0) return 0
  return (userContribution / totalWinnerContributions) * totalPool
}

/**
 * Calculate all payouts for a resolved pledge
 * @param pledgerStake - Amount pledger put up
 * @param bets - All bets placed on the pledge
 * @param outcome - Did pledger succeed? ('yes' = succeeded, 'no' = failed)
 * @returns Array of payout results for each winner
 */
export function calculateAllPayouts(
  pledgerStake: number,
  pledgerId: string,
  bets: BetContribution[],
  outcome: 'yes' | 'no'
): PayoutResult[] {
  // Calculate totals
  const yesBets = bets.filter(b => b.side === 'yes')
  const noBets = bets.filter(b => b.side === 'no')

  const yesTotalBets = yesBets.reduce((sum, b) => sum + b.amount, 0)
  const noTotalBets = noBets.reduce((sum, b) => sum + b.amount, 0)
  const totalPool = pledgerStake + yesTotalBets + noTotalBets

  if (outcome === 'yes') {
    // Pledger + YES bettors win
    // Pledger's stake counts as their contribution
    const totalWinnerContributions = pledgerStake + yesTotalBets

    const results: PayoutResult[] = []

    // Pledger payout
    const pledgerPayout = calculateSinglePayout(pledgerStake, totalWinnerContributions, totalPool)
    results.push({
      userId: pledgerId,
      contribution: pledgerStake,
      payout: pledgerPayout,
      profit: pledgerPayout - pledgerStake
    })

    // YES bettors payouts
    yesBets.forEach(bet => {
      const payout = calculateSinglePayout(bet.amount, totalWinnerContributions, totalPool)
      results.push({
        userId: bet.userId,
        contribution: bet.amount,
        payout,
        profit: payout - bet.amount
      })
    })

    return results
  } else {
    // NO bettors win (pledger loses stake, it goes to pool)
    const totalWinnerContributions = noTotalBets
    const totalPool = pledgerStake + yesTotalBets + noTotalBets

    const results: PayoutResult[] = []

    // NO bettors payouts
    noBets.forEach(bet => {
      const payout = calculateSinglePayout(bet.amount, totalWinnerContributions, totalPool)
      results.push({
        userId: bet.userId,
        contribution: bet.amount,
        payout,
        profit: payout - bet.amount
      })
    })

    return results
  }
}

/**
 * Calculate potential payout for a user considering placing a bet
 * @param betAmount - Amount user wants to bet
 * @param betSide - Which side they want to bet on
 * @param pledgerStake - Current pledger stake
 * @param currentBets - Current bets on the pledge
 * @returns Potential payout if they win, and their return multiplier
 */
export function calculatePotentialPayout(
  betAmount: number,
  betSide: 'yes' | 'no',
  pledgerStake: number,
  currentBets: BetContribution[]
): { potentialPayout: number; returnMultiplier: number } {
  // Calculate current totals
  const yesBets = currentBets.filter(b => b.side === 'yes')
  const noBets = currentBets.filter(b => b.side === 'no')

  const yesTotalBets = yesBets.reduce((sum, b) => sum + b.amount, 0)
  const noTotalBets = noBets.reduce((sum, b) => sum + b.amount, 0)

  // Add hypothetical bet to calculate new pool
  const newYesTotal = betSide === 'yes' ? yesTotalBets + betAmount : yesTotalBets
  const newNoTotal = betSide === 'no' ? noTotalBets + betAmount : noTotalBets
  const newTotalPool = pledgerStake + newYesTotal + newNoTotal

  let potentialPayout = 0

  if (betSide === 'yes') {
    // If betting YES, winners include pledger + all YES bettors (including new bet)
    const totalWinnerContributions = pledgerStake + newYesTotal
    potentialPayout = calculateSinglePayout(betAmount, totalWinnerContributions, newTotalPool)
  } else {
    // If betting NO, winners are all NO bettors (including new bet)
    const totalWinnerContributions = newNoTotal
    potentialPayout = calculateSinglePayout(betAmount, totalWinnerContributions, newTotalPool)
  }

  const returnMultiplier = betAmount > 0 ? potentialPayout / betAmount : 0

  return { potentialPayout, returnMultiplier }
}

/**
 * Calculate current odds based on bet amounts
 * @param pledgerStake - Pledger's stake (counts as YES)
 * @param bets - All current bets
 * @returns Percentage odds for YES and NO
 */
export function calculateOdds(
  pledgerStake: number,
  bets: BetContribution[]
): { yesPercent: number; noPercent: number } {
  const yesBets = bets.filter(b => b.side === 'yes')
  const noBets = bets.filter(b => b.side === 'no')

  const yesTotalBets = yesBets.reduce((sum, b) => sum + b.amount, 0)
  const noTotalBets = noBets.reduce((sum, b) => sum + b.amount, 0)

  // Pledger's stake counts toward YES
  const totalYes = pledgerStake + yesTotalBets
  const totalNo = noTotalBets
  const totalPool = totalYes + totalNo

  if (totalPool === 0) {
    return { yesPercent: 50, noPercent: 50 }
  }

  const yesPercent = Math.round((totalYes / totalPool) * 100)
  const noPercent = 100 - yesPercent

  return { yesPercent, noPercent }
}
