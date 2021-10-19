import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";

const getLibrary = (provider: any) => {
    return new ethers.providers.Web3Provider(provider, 'any');
}

export const InjectedProvider = ({ children }: React.PropsWithChildren<unknown>) => (
    <Web3ReactProvider getLibrary={getLibrary}>
        {children}
    </Web3ReactProvider>
)
