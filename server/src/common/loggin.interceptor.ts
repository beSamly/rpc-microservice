import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoggerService } from "./logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");
    const metadata = context.getArgByIndex(1); // metadata
    // console.log("metadata.get( : ", metadata.get("X-Request-Id"))
    // const requestId = metadata.get("X-Request-Id")[0];

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        //   console.log(`After... ${Date.now() - now}ms`)

        this.logger.info(`${Date.now() - now}ms time elapsed`, {
          context: "Interceptor",
          requestId: "x1238svr17" || undefined,
        });
      })
    );
  }
}
