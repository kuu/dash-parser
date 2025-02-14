import type {ParsedObject} from './types';
import {Element} from './Element';

export class Initialization extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<Initialization>) {
    super('Initialization');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.sourceURL === 'string') {
      obj.sourceURL = this.sourceURL;
    }
    return obj;
  }
}
