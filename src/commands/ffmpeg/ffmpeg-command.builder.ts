import {Command} from "../../core/executor/command.types";

export class FfmpegCommandBuilder {

    private inputPath: string = './'
    private outputPath: string = './'
    private options: Map<string, string> = new Map<string, string>()

    public constructor() {
        this.options.set('-c:v', 'libx264')
    }

    public setInputPath(path: string): this {
        this.inputPath = path
        return this
    }

    public setOutputPath(path: string): this {
        this.outputPath = path
        return this
    }

    public setVideoSize(width: number, height: number): this {
        this.options.set('-s', `${width}x${height}`)
        return this
    }

    public build(): Command {
        const args: string[] = [
            '-i', this.inputPath
        ]
        this.options.forEach(((value, key) => {
            args.push(key, value)
        }))
        args.push(this.outputPath)

        return {
            commandName: 'ffmpeg',
            args: args,
        }
    }
}