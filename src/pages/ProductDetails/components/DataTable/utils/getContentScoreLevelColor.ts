enum LEVEL_COLORS {
  RED = '#EB5757',
  ORANGE = '#F2994A',
  YELLOW = '#F2C94C',
  LIME = '#BADC68',
  GREEN = '#27AE60',
}

const LEVEL_BREAKPOINTS_COLORS = {
  1: LEVEL_COLORS.RED,
  20: LEVEL_COLORS.ORANGE,
  40: LEVEL_COLORS.YELLOW,
  60: LEVEL_COLORS.LIME,
  80: LEVEL_COLORS.GREEN,
};

export const getContentScoreLevelColor = (contentScore?: number) => {
  if (!contentScore) return 'transparent';

  if (contentScore >= 80) return LEVEL_BREAKPOINTS_COLORS[80];
  if (contentScore >= 60) return LEVEL_BREAKPOINTS_COLORS[60];
  if (contentScore >= 40) return LEVEL_BREAKPOINTS_COLORS[40];
  if (contentScore >= 20) return LEVEL_BREAKPOINTS_COLORS[20];
  if (contentScore >= 1) return LEVEL_BREAKPOINTS_COLORS[1];

  return 'transparent';
};
