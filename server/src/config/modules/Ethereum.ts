import { registerAs } from "@nestjs/config";

export default registerAs(
  "ethereum",
  (): any => ({
    ethNetwork: process.env.ETH_NETWORK, // examples: https://rinkeby.infura.io/v3/62e420e5c5b6482eb94341bdf32b56d2
    ethGasStationURL: "https://ethgasstation.info/json/ethgasAPI.json",
    chain: "rinkeby",
    transactionResultURL: "https://rinkeby.etherscan.io/tx",
    chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  })
);
