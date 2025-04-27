import {throwError} from '../utils';
import {type ParsedObject, type Range, getImportPath} from './types';

export abstract class Element {
  static readonly ALLOWED_CHILDREN: string[];
  static readonly CHILDRREN_SPEC: Record<string, Range>;
  get static(): typeof Element {
    return this.constructor as typeof Element;
  }

  public get NAMESPACE(): string {
    return 'urn:mpeg:dash:schema:mpd:2011';
  }

  public name: string;
  public textContent?: string;
  public xmlns?: ParsedObject;
  public prefixedAttributes?: Record<string, any>;

  children: Element[] = [];
  constructor(initialValues?: Partial<Element>, ctx?: ParsedObject) {
    this.formatParams(initialValues, ctx);
    Object.assign(this, initialValues);
    this.name ??= 'Element';
  }

  addElement(element: Element): void {
    // console.log(`element.name = "${element.name}"`);
    // console.log(`this.static.ALLOWED_CHILDREN = "${JSON.stringify(this.static.ALLOWED_CHILDREN, null, 2)}"`);
    if (!this.static.ALLOWED_CHILDREN.includes(element.name)) {
      return this.reject(`${element.name} cannot be added`);
    }
    this.children.push(element);
  }

  getElements(name: string): Element[] {
    return this.children.filter(child => child.name === name);
  }

  getAllElements(name: string | ((e: Element) => boolean)): Array<[child: Element, parent: Element]> {
    const result: Array<[Element, Element]> = [];
    this.getElementsRecursively(name, result);
    return result;
  }

  reject(message: string): void {
    throwError(`${this.name}: ${message}`);
  }

  verify(ctx: ParsedObject): void {
    this.verifyAttributes(ctx);
    this.verifyChildren(ctx);
  }

  formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues || !ctx) {
      return;
    }
    const xmlns: ParsedObject = {};
    for (const key of Object.keys(initialValues)) {
      if (key === 'xmlns' || key.startsWith('xmlns:')) {
        const importPath = getImportPath(initialValues[key] as string);
        const prefix = key === 'xmlns' ? '' : key.replace('xmlns:', '');
        if (prefix) {
          ctx.prefixes[prefix] = {importPath, uri: initialValues[key] as string};
        }
        xmlns[prefix] = initialValues[key] as string;
        delete initialValues[key];
      }
    }
    if (Object.keys(xmlns).length > 0) {
      initialValues.xmlns = xmlns;
    }
    const prefixedAttributes: ParsedObject = {};
    for (const key of Object.keys(initialValues)) {
      for (const prefix of Object.keys(ctx.prefixes as ParsedObject)) {
        if (key.startsWith(`${prefix}:`)) {
          const newKey = key.replace(`${prefix}:`, '');
          const obj = prefixedAttributes[prefix] as ParsedObject || {};
          obj[newKey] = initialValues[key] as string;
          prefixedAttributes[prefix] = obj;
          delete initialValues[key];
        }
      }
    }
    if (Object.keys(prefixedAttributes).length > 0) {
      initialValues.prefixedAttributes = prefixedAttributes;
    }
  }
  abstract verifyAttributes(ctx: ParsedObject): void;
  abstract verifyChildren(ctx: ParsedObject): void;

  get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (this.xmlns) {
      for (const [key, value] of Object.entries(this.xmlns)) {
        obj[key ? `xmlns:${key}` : 'xmlns'] = value as string;
      }
    }
    if (this.prefixedAttributes) {
      for (const [prefix, o] of Object.entries(this.prefixedAttributes)) {
        for (const [key, value] of Object.entries(o as ParsedObject)) {
          obj[`${prefix}:${key}`] = value as string;
        }
      }
    }
    return obj;
  }

  protected verifyInt(key: string, mandatory = false) {
    if (mandatory) {
      this.verifyMandatory(key);
    }
    const value = this[key] as unknown;
    if (typeof value === 'number' && !Number.isInteger(value)) {
      this.reject(`@${key} should be an integer`);
    }
  }

  protected verifyUnsignedInt(key: string, mandatory = false) {
    this.verifyInt(key, mandatory);
    const value = this[key] as unknown;
    if (typeof value === 'number' && value < 0) {
      this.reject(`@${key} should be an unsigned integer`);
    }
  }

  protected verifyMandatory(key: string) {
    if (this[key] === undefined) {
      this.reject(`@${key} is mandatory`);
    }
  }

  protected verifyChidrenSpec(spec: Record<string, Range>) {
    for (const key of Object.keys(spec)) {
      const [min, max] = spec[key];
      const count = this.children.filter(el => el.name === key).length;
      if (count < min || count > max) {
        this.reject(`Number of ${key} is ${count}, but should be between ${min} and ${max}`);
      }
    }
  }

  protected verifyAvailabilityTimeComplete(ctx: ParsedObject): void {
    const ancestors = ctx.baseUrls as Element[];
    const siblings = this.getElements('BaseURL');
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const isTimeOffsetPresentInAnyLevel = [...ancestors, ...siblings].some(baseUrl => baseUrl['availabilityTimeOffset'] !== undefined);
    const segmentBaseList = this.getElements('SegmentBase');
    for (const segmentBase of segmentBaseList) {
      if (segmentBase['availabilityTimeComplete'] !== undefined) { // eslint-disable-line @typescript-eslint/dot-notation
        if (segmentBase['availabilityTimeOffset'] === undefined && !isTimeOffsetPresentInAnyLevel) { // eslint-disable-line @typescript-eslint/dot-notation
          delete segmentBase['availabilityTimeComplete']; // eslint-disable-line @typescript-eslint/dot-notation
          continue;
        }
        for (const sibling of siblings) {
          delete sibling['availabilityTimeComplete']; // eslint-disable-line @typescript-eslint/dot-notation
        }
      }
    }
  }

  private getElementsRecursively(name: string | ((e: Element) => boolean), result: Array<[child: Element, parent: Element]>): void {
    for (const child of this.children) {
      if (
        (typeof name === 'function' && name(child))
        || (typeof name === 'string' && child.name === name)
      ) {
        result.push([child, this]);
      }
      child.getElementsRecursively(name, result);
    }
  }
}
