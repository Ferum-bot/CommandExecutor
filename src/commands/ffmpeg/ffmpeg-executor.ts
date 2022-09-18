import {CommandExecutor} from "../../core/executor/command-executor.service";
import {FfmpegCommand, FfmpegInput} from "./ffmpeg.types";
import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import {StreamLogger} from "../../core/handlers/stream-logger";
import {FileService} from "../../core/files/file.service";
import {PromptService} from "../../core/prompt/prompt.service";
import {FfmpegCommandBuilder} from "./ffmpeg-command.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends CommandExecutor<FfmpegInput>{

    private fileService: FileService = new FileService()
    private prmoptService: PromptService = new PromptService()

    constructor(logger: StreamLogger) {
        super(logger)
    }

    protected async prompt(): Promise<FfmpegInput> {
        const width = await this.prmoptService.input<number>('Width', "number")
        const height = await this.prmoptService.input<number>('Height', "number")
        const path = await this.prmoptService.input<string>('Path to file', "input")
        const fileName = await this.prmoptService.input<string>('File name', "input")

        return {
            width: width,
            height: height,
            path: path,
            fileName: fileName
        }
    }

    override build(input: FfmpegInput): FfmpegCommand {
        const output = this.fileService.getFilePath(
            input.path, input.fileName, 'mp4'
        )
        return {...(new FfmpegCommandBuilder()
            .setInputPath(input.path)
            .setVideoSize(input.width, input.height)
            .setOutputPath(output)
            .build()),
            output: output
        };
    }

    override async spawn(command: FfmpegCommand): Promise<ChildProcessWithoutNullStreams> {
        await this.fileService.deleteFileIfExists(command.output)
        return spawn(command.commandName, command.args)
    }

    protected override processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLogger) {
        const handler = new StreamHandler(logger)
        handler.processOutput(stream)
    }
}