import { ChainIds } from "./chain";

export const vonKubLPAddress = '0xf1047345b3821729BE43A3BE35086a2635E5f08a';

export const addresses = {
  modSalary: {
    [ChainIds.BKC]: '0x2830073237A655a4770b2Fe3293d244FB8b05105',
    [ChainIds.BSC]: '0xCE448a365d241BF30a50E3F7fAd727F9D7151440',
  }
} as const;
