export const calculateBlockRates = (blockTimeSeconds: number) => {
  const blocksPerMinute = 60 / blockTimeSeconds;
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
