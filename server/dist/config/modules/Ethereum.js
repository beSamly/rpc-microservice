"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs("ethereum", () => ({
    ethNetwork: process.env.ETH_NETWORK,
    ethGasStationURL: "https://ethgasstation.info/json/ethgasAPI.json",
    chain: "rinkeby",
    transactionResultURL: "https://rinkeby.etherscan.io/tx",
    chainId: 4,
}));
//# sourceMappingURL=Ethereum.js.map