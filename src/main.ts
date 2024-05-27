import { config } from "dotenv"
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module.js"
import { join } from "path"
import { NestExpressApplication } from "@nestjs/platform-express"
import cookieParser from "cookie-parser"

config()

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.enableCors()
    app.use(cookieParser())

    app.setViewEngine("ejs")
    app.setBaseViewsDir(join(process.cwd(), "views"))

    app.useStaticAssets(join(process.cwd(), "assets"))

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(process.env.PORT || 3000)
}

await bootstrap()
