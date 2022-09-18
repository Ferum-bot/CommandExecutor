import {Command} from "../../core/executor/command.types";

export interface FfmpegInput {
    width: number
    height: number
    path: string
    fileName: string
}

export interface FfmpegCommand extends Command {
    output: string
}