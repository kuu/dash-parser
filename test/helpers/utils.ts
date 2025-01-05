import * as DASH from '../../src/index';
import type {MPD} from '../../src/types';
import {printError} from '../../src/utils';

export function parsePass(text: string) {
  let obj: MPD | undefined;
  try {
    obj = DASH.parse(text);
  } catch (err) {
    printError(err as string);
    return undefined;
  }
  console.log(JSON.stringify(obj, null, 2));
  return obj;
}

export function stringifyPass(obj: MPD): string | undefined {
  let text: string | undefined;
  try {
    text = DASH.stringify(obj);
  } catch (err) {
    printError(err as string);
    return undefined;
  }
  console.log(text);
  return text;
}

export function bothPass(text: string): string | undefined {
  const obj = parsePass(text);
  return obj ? stringifyPass(obj) : undefined;
}

export function stripSpaces(text: string): string {
  const chars = new Array<string>();
  let insideDoubleQuotes = false;
  for (const ch of text) {
    if (ch === '"') {
      insideDoubleQuotes = !insideDoubleQuotes;
    } else if (ch === ' ' && !insideDoubleQuotes) {
      continue;
    }
    chars.push(ch);
  }
  return chars.join('');
}

export function stripCommentsAndLineBreaks(text: string): string {
  const lines = new Array<string>();
  let insideComments = false;
  let insideTag = false;
  const inputs = text.split('\n');
  for (let i = 0; i < inputs.length - 1; i++) {
    let curr = inputs[i].trim();
    const next = inputs[i + 1].trim();
    if (!curr) {
      // empty line
      continue;
    }
    if (curr.startsWith('<!--')) {
      if (!curr.endsWith('-->')) {
        insideComments = true;
      }
      continue;
    }
    if (insideComments) {
      if (curr.endsWith('-->')) {
        insideComments = false;
      }
      continue;
    }
    if (curr.startsWith('<') && !curr.endsWith('>')) {
      insideTag = true;
      curr += ' ';
    } else if (insideTag) {
      if (curr.endsWith('>')) {
        insideTag = false;
      } else if (!next.startsWith('>')) {
        curr += ' ';
      }
    }
    // lines.push(stripSpaces(curr));
    lines.push(curr);
    if (i === inputs.length - 2) {
      lines.push(next);
    }
  }
  return lines.join('');
}
