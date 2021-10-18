/// <reference types="react-scripts" />
declare global {
  interface Window { ethereum: any; }
}

window.ethereum = window.ethereum || {};
