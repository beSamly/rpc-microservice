import { Inject, Injectable } from "@nestjs/common";
// import { ILoggerService } from "@shared/interfaces/logger.interface";
import { Logger, createLogger } from "winston";
// import { ConfigType } from "@nestjs/config";
// import { AsyncLocalStorageService } from "@shared/modules/async-local-storage/async-local-storage.service";
// import { LoggerModuleConfig } from "@config";

@Injectable()
export class LoggerService  {
    private readonly logger: Logger;

    constructor(
        // @Inject(LoggerModuleConfig.KEY)
        // config: ConfigType<typeof LoggerModuleConfig>,
        // @Inject("AsyncLocalStorageService")
        // private readonly asyncLocalStorage: AsyncLocalStorageService
    ) {
        this.logger = createLogger();
    }

    info(message: string, meta?: Record<string, any>) {
        if (!meta) meta = {};
        // const store = this.asyncLocalStorage?.getStore();
        // if (store) {
            // meta.requestId = store.requestId;
        // }
        this.logger.info(message, { meta });
    }

    // error(message: string, meta?: Record<string, any>) {
    //     if (!meta) meta = {};
    //     const store = this.asyncLocalStorage?.getStore();
    //     if (store) {
    //         meta.requestId = store.requestId;
    //     }
    //     this.logger.error(message, { meta });
    // }

    // log(level: string, message: string, meta?: Record<string, any>) {
    //     if (!meta) meta = {};
    //     const store = this.asyncLocalStorage?.getStore();
    //     if (store) {
    //         meta.requestId = store.requestId;
    //     }
    //     this.logger.log(level, message, { meta });
    // }

    // warn(message: string, meta?: Record<string, any>) {
    //     if (!meta) meta = {};
    //     const store = this.asyncLocalStorage?.getStore();
    //     if (store) {
    //         meta.requestId = store.requestId;
    //     }
    //     this.logger.warn(message, { meta });
    // }

    // debug(message: string, meta?: Record<string, any>) {
    //     if (!meta) meta = {};
    //     const store = this.asyncLocalStorage?.getStore();
    //     if (store) {
    //         meta.requestId = store.requestId;
    //     }
    //     this.logger.debug(message, { meta });
    // }

    // errorStream = {
    //     write: (message: string): void => {
    //         this.error(message);
    //     },
    // };
}
