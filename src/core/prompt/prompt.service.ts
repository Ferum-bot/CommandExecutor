import inquirer from 'inquirer';
import {PromptTypeInput} from "./prompt.types";

export class PromptService {

    public async input<T>(message: string, type: PromptTypeInput): Promise<T> {
        const { result } = await inquirer.prompt<{ result: T }>(
            [
                {
                    type: type,
                    name: 'result',
                    message: message
                }
            ]
        )

        return result
    }
}