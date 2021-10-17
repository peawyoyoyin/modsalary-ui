import { createWeb3ReactRoot } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";
import { ChainIds } from "../../constants/chain";
import { ProviderIds } from "./ProviderIds";

const BKCWeb3ReactProvider = createWeb3ReactRoot(ProviderIds.BKC);

const getLibrary = (provider: any) => {
    return new ethers.providers.JsonRpcProvider(provider, { chainId: ChainIds.BKC, name: 'bkc_rpc' });
}

export const BkcProvider = ({ children }: React.PropsWithChildren<unknown>) => (
    <BKCWeb3ReactProvider getLibrary={getLibrary}>
        {children}
    </BKCWeb3ReactProvider>
);
