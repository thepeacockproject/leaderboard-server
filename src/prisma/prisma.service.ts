import { Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "../../gen/index.js"
import { inspect } from "node:util"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name)

    async onModuleInit() {
        // wait 3 seconds before making db connections because railway private
        // networks have this overhead
        await new Promise((resolve) => {
            setTimeout(resolve, 3000)
        })

        this.logger.debug("Connecting to database...")

        await this.$connect()

        this.logger.debug("Connected to database successfully.")

        const logger = this.logger

        this.$extends({
            query: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now()
                    const result = await query(args)
                    const end = performance.now()
                    const time = end - start
                    logger.debug(
                        inspect(
                            { model, operation, args, time },
                            { showHidden: false, depth: null, colors: true },
                        ),
                    )
                    return result
                },
            },
        })
    }
}
