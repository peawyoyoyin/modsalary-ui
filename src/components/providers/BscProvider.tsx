import { createWeb3ReactRoot } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";
import { ChainIds } from "../../constants/chain";
import { ProviderIds } from "./ProviderIds";

const BSCWeb3ReactProvider = createWeb3ReactRoot(ProviderIds.BSC);

const getLibrary = (provider: any) => {
    return new ethers.providers.JsonRpcProvider(provider, { chainId: ChainIds.BSC, name: 'bsc_rpc' });
}

export const BscProvider = ({ children }: React.PropsWithChildren<unknown>) => (
    <BSCWeb3ReactProvider getLibrary={getLibrary}>
        {children}
    </BSCWeb3ReactProvider>
);
