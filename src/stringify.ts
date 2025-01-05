import type {ParsedObject, Element, MPD} from './types';
import {toXML} from './xml';

export function stringify(manifest: MPD): string | undefined {
  return toXML({MPD: convertToXMLObject(manifest)});
}

function convertToXMLObject(element: Element): ParsedObject {
  element.verify();
  const obj: ParsedObject = {'@': element.serializedProps};
  for (const child of element.children) {
    const key = child.name;
    const childObj = convertToXMLObject(child);
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
  return obj;
}
