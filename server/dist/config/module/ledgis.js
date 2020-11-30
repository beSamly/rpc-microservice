"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs("ledgis", () => ({
    nodeEndpoint: process.env.LEDGIS_ENDPOINT || "http://wallet.ledgis.kr",
    privateKeys: process.env.LEDGIS_PRIVATE_KEYS
        ? process.env.LEDGIS_PRIVATE_KEYS.split(" ")
        : [],
    hasuraEndpoint: process.env.LEDGIS_HASURA_ENDPOINT || "",
}));
//# sourceMappingURL=ledgis.js.map