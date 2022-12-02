import * as fs from 'fs';
import { join } from 'path';
export const example = fs.readFileSync(join(__dirname, 'input/example.txt'), 'utf-8');
export const full = fs.readFileSync(join(__dirname, 'input/full.txt'), 'utf-8');
