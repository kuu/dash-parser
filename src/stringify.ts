import * as types from './types';
import {toXML} from './xml';

export function stringify(mpd: types.MPD): string | undefined {
  return toXML({MPD: convertToXMLObject(mpd, {baseUrls: [], mpdType: mpd.type})});
}

function convertToXMLObject(element: types.Element, ctx: types.ParsedObject): types.ParsedObject {
  const baseUrls = ctx.baseUrls as types.Element[];
  const baseUrlsNum = baseUrls.length;
  element.verify(ctx);
  const obj: types.ParsedObject = {'@': element.serializedProps};
  if (element.textContent !== undefined) {
    obj['#text'] = element.textContent;
  }
  for (const child of element.children) {
    if (child instanceof types.BaseURL) {
      baseUrls.push(child);
    }
    const key = child.name;
    const childObj = convertToXMLObject(child, ctx);
    if (!childObj) {
      continue;
    }
    if (obj[key]) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      (obj[key] as types.ParsedObject[]).push(childObj);
    } else {
      obj[key] = childObj;
    }
  }
  ctx.baseUrls.length = baseUrlsNum;
  return obj;
}
