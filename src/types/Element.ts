import {printError, throwError} from '../utils';
import type {ParsedObject, Range} from './types';

export abstract class Element {
  static readonly ALLOWED_CHILDREN: string[];
  static readonly CHILDRREN_SPEC: Record<string, Range>;
  get static(): typeof Element {
    return this.constructor as typeof Element;
  }

  children: Element[] = [];
  constructor(readonly name: string) {}

  addElement(element: Element): void {
    // console.log(`element.name = "${element.name}"`);
    // console.log(`this.static.ALLOWED_CHILDREN = "${JSON.stringify(this.static.ALLOWED_CHILDREN, null, 2)}"`);
    if (!this.static.ALLOWED_CHILDREN.includes(element.name)) {
      return this.reject(`${element.name} cannot be added`);
    }
    this.children.push(element);
  }

  getElements(name: string, recursive = false): Element[] | Array<[child: Element, parent: Element]> {
    if (!recursive) {
      return this.children.filter(child => child.name === name);
    }
    const result: Array<[Element, Element]> = [];
    for (const child of this.children) {
      if (child.name === name) {
        result.push([child, this]);
      }
      result.push(...child.getElements(name, recursive) as Array<[Element, Element]>);
    }
    return result;
  }

  reject(message: string): void {
    throwError(`${this.name}: ${message}`);
  }

  verify(): void {
    this.verifyAttributes();
    this.verifyChildren();
  }

  abstract formatParams(initialValues?: Partial<ParsedObject>): void;
  abstract verifyAttributes(): void;
  abstract verifyChildren(): void;
  abstract get serializedProps(): ParsedObject;
}
