import readTextInput from "../../readTextInput";
import {join} from "path";

export const example = readTextInput(join(__dirname, 'input/example.txt'));
export const full = readTextInput(join(__dirname, 'input/full.txt'));
