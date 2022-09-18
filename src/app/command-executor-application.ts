import {FfmpegExecutor} from "../commands/ffmpeg/ffmpeg-executor";
import {ConsoleLogger} from "../out/console-logger/console-logger";

export class CommandExecutorApplication {

    public start() {
        const executor = new FfmpegExecutor(ConsoleLogger.getInstance())
        executor.execute()
    }
}