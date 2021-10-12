import { Web3ReactProvider } from "@web3-react/core";
import * as ethers from "ethers";
import { Main } from "./components/main";
import { Grommet } from "grommet"

const getLibrary = (provider: any) => {
  return new ethers.providers.Web3Provider(provider, { name: 'bkc', chainId: 96 });
}

const theme = {
  global: {
    colors: {
      brand: '#d70026',
      'brand-light': {
        light: "#ffe1e1",
        dark: "#aabbcc"
      }
    },
    font: {
      family: 'Inter'
    }
  }
}
 
function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Grommet theme={theme} themeMode="dark" full>
       <Main />
      </Grommet>
    </Web3ReactProvider>
  );
}

export default App;
