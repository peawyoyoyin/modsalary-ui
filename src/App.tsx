import { Main } from "./components/main";
import { Grommet, ThemeType as GrommetThemeType } from "grommet"
import { InjectedProvider } from "./components/providers/InjectedProvider";
import { BkcProvider } from "./components/providers/BkcProvider";

const theme: GrommetThemeType = {
  global: {
    colors: {
      'brand-dark': '#690012',
      brand: '#d70026',
      'brand-light': {
        light: "#ffe1e1",
        dark: "#aabbcc"
      }
    },
    font: {
      family: 'Inter'
    }
  },
  tab: {
    active: {
      color: 'brand',
    },
    color: '#000000',
    border: {
      color: '#000000',
      hover: {
        color: 'brand-dark'
      },
      active: {
        color: 'brand'
      }
    },
    hover: {
      color: 'brand-dark',
    }
  }
}

function App() {
  return (
    <BkcProvider>
      <InjectedProvider>
        <Grommet theme={theme} themeMode="dark" full>
          <Main />
        </Grommet>
      </InjectedProvider>
    </BkcProvider>
  );
}

export default App;
