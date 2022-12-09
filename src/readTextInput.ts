import * as fs from 'fs';

export default function readTextInput(filePath: string): string[] {
    return fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
}
