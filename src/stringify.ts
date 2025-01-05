import type * as types from './types';
import {toXML} from './xml';

export function stringify(manifest: types.MPD): string | undefined {
  return toXML({MPD: convertToXMLObject(manifest)});
}

function convertToXMLObject(element: types.Element): types.ParsedObject {
  const obj: types.ParsedObject = {'@': element.serializedProps};
  for (const child of element.elements) {
    const key = child.name;
    const childObj = convertToXMLObject(child);
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
  return obj;
}
