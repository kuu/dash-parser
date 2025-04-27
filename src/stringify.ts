import {
  type ParsedObject,
  type Context,
  type Element,
  type MPD,
  BaseURL,
} from './types';
import {toXML} from './xml';

export function stringify(element: Element): string | undefined {
  const obj = convertToXMLObject(element, {mpdType: element.name === 'MPD' ? (element as MPD).type : undefined, baseUrls: [], prefixes: {}});
  return toXML({[element.name]: obj});
}

function convertToXMLObject(element: Element, ctx: Context): ParsedObject {
  const baseUrls = ctx.baseUrls as Element[];
  const baseUrlsNum = baseUrls.length;
  element.verify(ctx);
  const obj: ParsedObject = {'@': element.serializedProps};
  if (element.textContent !== undefined) {
    obj['#text'] = element.textContent;
  }
  for (const child of element.children) {
    if (child instanceof BaseURL) {
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
      (obj[key] as ParsedObject[]).push(childObj);
    } else {
      obj[key] = childObj;
    }
  }
  ctx.baseUrls.length = baseUrlsNum;
  return obj;
}
