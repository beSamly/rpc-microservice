"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientBalance = void 0;
const common_1 = require("@nestjs/common");
class InsufficientBalance extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InsufficientBalance = InsufficientBalance;
//# sourceMappingURL=InsufficientBalance.error.js.map