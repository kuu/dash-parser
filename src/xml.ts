import {
  XMLParser,
  XMLBuilder,
  XMLValidator,
} from 'fast-xml-parser';
import type {ParsedObject} from './types';
import {throwError} from './utils';

const parser = new XMLParser({
  ignoreDeclaration: false,
  ignoreAttributes: false,
  parseAttributeValue: true,
  ignorePiTags: true,
  removeNSPrefix: false,
  trimValues: true,
  attributesGroupName: '@',
  attributeNamePrefix: '',
  allowBooleanAttributes: false,
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributesGroupName: '@',
  attributeNamePrefix: '',
  format: true,
  suppressEmptyNode: true,
  suppressBooleanAttributes: false,
});

export function fromXML(xml: string): ParsedObject | undefined {
  if (!XMLValidator.validate(xml)) {
    throwError(`Invalid XML:\n---\n${xml}\n---`);
    return undefined;
  }
  return parser.parse(xml) as ParsedObject;
}

export function toXML(obj: ParsedObject): string | undefined {
  const txt = builder.build(obj) as string;
  return txt ? `<?xml version="1.0" encoding="UTF-8"?>\n${txt.trim()}` : undefined;
}
