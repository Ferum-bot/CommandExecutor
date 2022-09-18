import {dirname, isAbsolute, join } from "path";
import {promises} from "fs";

export class FileService {

    public getFilePath(path: string, name: string, extension: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path)
        }
        return join(dirname(path) + '/' + name + '.' + extension)
    }

    public async deleteFileIfExists(path: string): Promise<void> {
        if (await this.checkFileExists(path)) {
            await promises.unlink(path)
        }
    }

    private async checkFileExists(path: string): Promise<boolean> {
        try {
            await promises.stat(path)
            return true
        } catch {
            return false
        }
    }
}