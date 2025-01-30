import * as types from './types';
import {print} from './utils';
import {fromXML} from './xml';

export function parse(text: string): types.MPD | undefined {
  const xmlObject = fromXML(text)?.MPD as types.ParsedObject;
  if (!xmlObject) {
    return undefined;
  }
  const mpd = new types.MPD(xmlObject['@'] as types.ParsedObject);
  parseElement(mpd, xmlObject, {});
  return mpd;
}

function parseElement(element: types.Element, obj: types.ParsedObject | undefined, ctx: types.ParsedObject): void {
  // console.log(`=== parseElement: Enter: element.name=${element.name}, ctx=${JSON.stringify(ctx, null, 2)}`);
  element.verifyAttributes(ctx);
  if (!obj) {
    // console.log('=== parseElement: Exit-1');
    return element.verifyChildren(ctx);
  }
  // console.log(JSON.stringify(obj, null, 2));
  for (const key of Object.keys(obj)) {
    // console.log(`--- parse key: '${key}'`);
    if (key === '@') {
      // console.log('--- parse key end-1');
      continue;
    }

    const type = types[key] as {new (obj: types.ParsedObject): types.Element};
    if (!type) {
      print(`Unknown element: ${key}`);
      // console.log('--- parse key end-2');
      continue;
    }
    const o = obj[key] as types.ParsedObject | types.ParsedObject[];
    const children = Array.isArray(o) ? o : [o];
    for (const child of children) {
      // console.log(`--- addElement: '${key}'`);
      const elem = new type(child['@'] as types.ParsedObject);
      element.addElement(elem);
      parseElement(elem, child as types.ParsedObject, ctx);
    }
  }
  element.verifyChildren(ctx);
  // console.log('=== parseElement: Exit-2');
}
