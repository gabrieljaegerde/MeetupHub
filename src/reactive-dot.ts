import popChainSpec from "./chain-specs/pop.json" with { type: "json" };
import hydrationChainSpec from "./chain-specs/hydration.json" with { type: "json" };

import { polkadot, paseo, polkadot_asset_hub, paseo_asset_hub, pop, hydration} from "@polkadot-api/descriptors";
import { defineConfig } from "@reactive-dot/core";
import { createLightClientProvider } from "@reactive-dot/core/providers/light-client.js";
import { InjectedWalletProvider } from "@reactive-dot/core/wallets.js";
import { LedgerWallet } from "@reactive-dot/wallet-ledger";
import { registerDotConnect } from "dot-connect";

// Import the raw chain spec

// Create light client provider
const lightClientProvider = createLightClientProvider();

const wallets = [
  new InjectedWalletProvider(),
  new LedgerWallet(),
];

// Polkadot relay chain and parachains
const polkadotChain = lightClientProvider.addRelayChain({ id: "polkadot" });
// const polkadotAHChain = polkadotChain.addParachain({ id: "polkadot_asset_hub" });
const hydrationChain = polkadotChain.addParachain({chainSpec: JSON.stringify(hydrationChainSpec)})

// Paseo relay chain and parachains
const paseoChain = lightClientProvider.addRelayChain({ id: "paseo" });
// const paseoAHChain = paseoChain.addParachain({ id: "paseo_asset_hub" });
const paseoPopChain = paseoChain.addParachain({ chainSpec: JSON.stringify(popChainSpec) });

export const config = defineConfig({
  chains: {
    polkadot: {
      descriptor: polkadot,
      provider: polkadotChain,
    },
    hydration: {
      descriptor: hydration,
      provider: hydrationChain,
    },
    // polkadot_asset_hub: {
    //   descriptor: polkadot_asset_hub,
    //   provider: polkadotAHChain,
    // },
    paseo: {
      descriptor: paseo,
      provider: paseoChain,
    },
    // paseo_asset_hub: {
    //   descriptor: paseo_asset_hub,
    //   provider: paseoAHChain,
    // },
    pop: {
      descriptor: pop,
      provider: paseoPopChain,
    },
  },
  wallets,
});

registerDotConnect({ wallets });