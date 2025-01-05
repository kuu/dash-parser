import * as types from './types';
import {fromXML} from './xml';

export function parse(text: string): types.MPD | undefined {
  const obj = fromXML(text)?.MPD as types.ParsedObject;
  if (!obj) {
    return undefined;
  }
  const mpd = new types.MPD(obj['@'] as types.ParsedObject);
  parseElement(mpd, obj);
  return mpd;
}

function parseElement(element: types.Element, obj: types.ParsedObject | undefined): void {
  // console.log('=== parseElement: Enter');
  if (!obj) {
    // console.log('=== parseElement: Exit-1');
    return;
  }
  const children = Array.isArray(obj) ? obj : [obj];
  for (const child of children) {
    // console.log('+++ parse child');
    for (const key of Object.keys(child as types.ParsedObject)) {
      // console.log(`--- parse key: '${key}'`);
      if (key === '@') {
        // console.log('--- parse key end-1');
        continue;
      }
      const obj = child[key] as types.ParsedObject;
      const type = types[key] as {new (obj: types.ParsedObject): types.Element};
      if (!type) {
        // console.log('--- parse key end-2');
        continue;
      }
      const elem = new type(obj['@'] as types.ParsedObject);
      element.addElement(elem);
      parseElement(elem, obj);
    }
    // console.log('+++ parse child end');
  }
  element.checkChildren();
  // console.log('=== parseElement: Exit-2');
}
