import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";
import { Main } from "./components/main";

const getLibrary = (provider: any) => {
  return new ethers.providers.Web3Provider(provider, { name: 'bkc', chainId: 96 });
}
 
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Main />
    </Web3ReactProvider>
  );
}

export default App;
