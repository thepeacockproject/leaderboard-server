import {
    Controller,
    Get,
    StreamableFile,
} from "@nestjs/common"
import { createReadStream } from "fs"

@Controller()
export class AppController {
    private static readonly paths = {
        jquery: import.meta.resolve("jquery/dist/jquery.min.js"),
        datatables: import.meta.resolve(
            "datatables.net/js/jquery.dataTables.min.js",
        ),
    } as const

    @Get()
    getHome(): string {
        return "Welcome to the RDIL API!"
    }

    @Get("/js/jquery.min.js")
    getJquery(): StreamableFile {
        return new StreamableFile(createReadStream(AppController.paths.jquery))
    }

    @Get("/js/jquery.dataTables.min.js")
    getDatatables(): StreamableFile {
        return new StreamableFile(
            createReadStream(AppController.paths.datatables),
        )
    }
}
