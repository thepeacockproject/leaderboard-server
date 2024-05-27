import { Module } from "@nestjs/common"
import { AppController } from "./app.controller.js"
import { LeaderboardsService } from "./leaderboards/leaderboards.service.js"
import { LeaderboardsController } from "./leaderboards/leaderboards.controller.js"
import { PrismaModule } from "./prisma/prisma.module.js"

@Module({
    imports: [PrismaModule],
    controllers: [
        AppController,
        LeaderboardsController,
    ],
    providers: [
        LeaderboardsService,
    ],
})
export class AppModule {}
