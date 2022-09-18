import {StreamLogger} from "../handlers/stream-logger";
import {ChildProcessWithoutNullStreams} from "child_process";
import {Command} from "./command.types";

export abstract class CommandExecutor<Input> {

    public constructor(
        private logger: StreamLogger
    ) { }

    public async execute() {
        const input = await this.prompt()
        const command = this.build(input)
        const stream = await this.spawn(command)
        this.processStream(stream, this.logger)
    }

    protected abstract prompt(): Promise<Input>

    protected abstract build(input: Input): Command

    protected abstract spawn(command: Command): Promise<ChildProcessWithoutNullStreams>

    protected abstract processStream(
        stream: ChildProcessWithoutNullStreams,
        logger: StreamLogger
    ): void
}

