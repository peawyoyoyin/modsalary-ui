// TODO support multiple chains
export const averageBlockTimeSeconds = 5
export const blocksPerMinute = 60 / averageBlockTimeSeconds;
export const blocksPerHour = blocksPerMinute * 60;
export const blocksPerDay = blocksPerHour * 24;
export const blocksPerMonth = blocksPerDay * 30;