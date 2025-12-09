export function distributeTokens(players) {
  const totalTokens = players.reduce((sum, p) => sum + p.tokens, 0);

  // Weight by score
  const totalScore = players.reduce((sum, p) => sum + p.score, 0);

  return players.map((player) => {
    const ratio = player.score / totalScore;
    const newTokens = Math.round(totalTokens * ratio);

    return {
      userId: player.user_id || player.id,
      username: player.username,
      oldTokens: player.tokens,
      newTokens,
      tokenChange: newTokens - player.tokens,
      score: player.score
    };
  });
}
