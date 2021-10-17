export const calculateBlockRates = (blockTimeSeconds: number) => {
  const averageBlockTimeSeconds = 5
  const blocksPerMinute = 60 / averageBlockTimeSeconds;
  const blocksPerHour = blocksPerMinute * 60;
  const blocksPerDay = blocksPerHour * 24;
  const blocksPerMonth = blocksPerDay * 30;

  return {
    blockTimeSeconds,
    blocksPerMinute,
    blocksPerHour,
    blocksPerDay,
    blocksPerMonth,
  };
}
