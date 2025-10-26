export function getRequestBody({
  bets,
  amount,
  accept,
  isSingle,
  isSystem,
  p,
}) {
  if (isSingle) {
    const body = { accept, single: 1, odds: [] };
    bets
      .filter(bet => bet.amount > 0)
      .forEach(bet => {
        body.odds.push({
          b: 0,
          l: Number(!!bet.isLive),
          r: bet.ref,
          v: bet.rate,
          eId: bet.eventId,
          amount: +bet.amount,
        });
      });
    return body;
  } else {
    const body = {
      accept: accept,
      amount: amount,
      odds: bets.map(bet => ({
        b: 0,
        l: Number(!!bet.isLive),
        r: bet.ref,
        v: bet.rate,
        eId: bet.eventId,
      })),
    };
    if (isSystem) {
      body.p = p;
    }
    return body;
  }
}
