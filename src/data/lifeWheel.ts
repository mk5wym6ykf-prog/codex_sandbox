export const LIFE_WHEEL_RADII = {
  goalBaseRadius: 68,
  goalMaxRadius: 108,
  hubRadius: 26,
  reflectionMaxRadius: 62,
};

export function getSelfReflectionWheelRadius(score: number) {
  return scaleWheelScore(score, LIFE_WHEEL_RADII.hubRadius, LIFE_WHEEL_RADII.reflectionMaxRadius);
}

export function getGoalKpiWheelRadius(score: number) {
  return scaleWheelScore(score, LIFE_WHEEL_RADII.goalBaseRadius, LIFE_WHEEL_RADII.goalMaxRadius);
}

export function runLifeWheelSelfReflectionManualCheck() {
  const lowScoreRadius = getSelfReflectionWheelRadius(2);
  const middleScoreRadius = getSelfReflectionWheelRadius(5);
  const highScoreRadius = getSelfReflectionWheelRadius(8);

  return {
    clampsLowScoresToHub: getSelfReflectionWheelRadius(-1) === LIFE_WHEEL_RADII.hubRadius,
    clampsHighScoresToMax: getSelfReflectionWheelRadius(11) === LIFE_WHEEL_RADII.reflectionMaxRadius,
    highScoreFillsMoreThanLowScore: highScoreRadius > lowScoreRadius,
    middleScoreFallsBetweenLowAndHigh:
      lowScoreRadius < middleScoreRadius && middleScoreRadius < highScoreRadius,
    scoreTenReachesReflectionMax:
      getSelfReflectionWheelRadius(10) === LIFE_WHEEL_RADII.reflectionMaxRadius,
  };
}

function scaleWheelScore(score: number, minRadius: number, maxRadius: number) {
  const safeScore = Math.max(0, Math.min(score, 10));

  return minRadius + (safeScore / 10) * (maxRadius - minRadius);
}
