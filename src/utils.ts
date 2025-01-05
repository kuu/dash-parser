import type {MPD} from './types';

type Options = {
  strictMode?: boolean;
  silent?: boolean;
};

let options: Options = {};

export function setOptions(newOptions: Partial<Options> = {}): void {
  options = Object.assign(options, newOptions);
}

export function getOptions(): Options {
  return Object.assign({}, options);
}

export function print(...args: string[]): void {
  if (!options.silent) {
    console.log(...args);
  }
}

export function printError(...args: string[]): void {
  if (!options.silent) {
    console.error(...args);
  }
}

export function throwError(...args: string[]): void {
  if (options.strictMode) {
    throw new Error(args.join(' '));
  }
}
