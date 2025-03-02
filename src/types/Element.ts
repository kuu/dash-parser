import {throwError} from '../utils';
import type {ParsedObject, Range} from './types';

export abstract class Element {
  static readonly ALLOWED_CHILDREN: string[];
  static readonly CHILDRREN_SPEC: Record<string, Range>;
  get static(): typeof Element {
    return this.constructor as typeof Element;
  }

  public name: string;

  children: Element[] = [];
  constructor(initialValues?: Partial<Element>) {
    this.formatParams(initialValues);
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

  abstract formatParams(initialValues?: Partial<ParsedObject>): void;
  abstract verifyAttributes(ctx: ParsedObject): void;
  abstract verifyChildren(ctx: ParsedObject): void;
  abstract get serializedProps(): ParsedObject;

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
