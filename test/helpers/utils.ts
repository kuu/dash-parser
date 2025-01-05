import * as DASH from '../../src/index';
import type {MPD} from '../../src/types';

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
      } else if (!next.startsWith('>') && !next.startsWith('/>')) {
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

export function bothPass(xml: string, obj: MPD): void {
  expect(DASH.parse(xml)).toEqual(obj);
  expect(stripCommentsAndLineBreaks(DASH.stringify(obj) ?? '')).toEqual(stripCommentsAndLineBreaks(xml));
}

export function bothFail(xml: string, obj: MPD): void {
  expect(() => DASH.parse(xml)).toThrow();
  expect(() => DASH.stringify(obj)).toThrow();
}
