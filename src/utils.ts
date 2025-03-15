import {Temporal} from '@js-temporal/polyfill';

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

export function fromTemporalDurationString(durationStr: string): number {
  return Temporal.Duration.from(durationStr).total({unit: 'seconds'});
}

export function toTemporalDurationString(seconds: number): string {
  let remainder = seconds;
  const d = Math.floor(remainder / 86_400);
  remainder -= d * 86_400;
  const h = Math.floor(remainder / 3600);
  remainder -= h * 3600;
  const m = Math.floor(remainder / 60);
  remainder -= m * 60;
  const s = Math.floor(remainder);
  remainder -= s;
  const ms = Math.floor(remainder * 1000);
  remainder -= ms / 1000;
  const mis = Math.round(remainder * 1_000_000);
  return Temporal.Duration.from({
    days: d,
    hours: h,
    minutes: m,
    seconds: s,
    milliseconds: ms,
    microseconds: mis,
  }).toString();
}

export function fromByteRangeString(byteRangeStr: string, byteLength = 0): [firstBytePos: number, lastBytePos: number] | undefined {
  if (!byteRangeStr.includes('-')) {
    return undefined;
  }
  const [firstBytePosStr, lastBytePosStr] = byteRangeStr.split('-');
  let firstBytePos = Number.parseInt(firstBytePosStr, 10);
  let lastBytePos = Number.parseInt(lastBytePosStr, 10);
  if (Number.isNaN(firstBytePos)) {
    if (Number.isNaN(lastBytePos)) {
      return undefined;
    }
    if (byteLength < lastBytePos) {
      return undefined;
    }
    firstBytePos = byteLength - lastBytePos;
    lastBytePos = byteLength - 1;
  }
  if (Number.isNaN(lastBytePos)) {
    if (byteLength <= firstBytePos) {
      return undefined;
    }
    lastBytePos = byteLength - 1;
  }
  if (firstBytePos > lastBytePos) {
    return undefined;
  }
  return [firstBytePos, lastBytePos];
}

export function toByteRangeString(range: [firstBytePos: number, lastBytePos: number]): string {
  return `${range[0]}-${range[1]}`;
}

export function joinBaseURLs(...args: string[]): string {
  const DUMMY = 'https://example.com/';
  let url = joinURLs(...args);
  if (url) {
    return url;
  }
  url = joinURLs(DUMMY, ...args);
  if (url) {
    return url.slice(DUMMY.length);
  }
  return '';
}

function joinURLs(...args: string[]): string | undefined {
  if (args.length === 0) {
    return undefined;
  }
  let u: URL;
  try {
    u = new URL(args[0]);
    // args[0] is an absolute URL
  } catch {
    return undefined;
  }
  if (args.length === 1) {
    return args[0];
  }
  try {
    u = new URL(args[1], args[0]);
  } catch {
    return args[0];
  }
  return joinURLs(u.href, ...args.slice(2));
}
