export const ZIndices = {
  MIN: -2147483647,
  'XXX-LOW': -1000,
  'XX-LOW': -100,
  'X-LOW': -10,
  LOW: -1,
  MEDIUM: 0,
  HIGH: 1,
  'X-HIGH': 10,
  'XX-HIGH': 100,
  'XXX-HIGH': 1000,
  MAX: 2147483647,
}

export type ZIndices = keyof typeof ZIndices
