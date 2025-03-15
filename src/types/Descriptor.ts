import type {ParsedObject} from './types';
import {Element} from './Element';

export abstract class Descriptor extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public id?: string;

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.schemeIdUri !== 'string') {
      this.reject('schemeIdUri is missing');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.schemeIdUri === 'string') {
      obj.schemeIdUri = this.schemeIdUri;
    }
    if (typeof this.value === 'string') {
      obj.value = this.value;
    }
    if (typeof this.id === 'string') {
      obj.id = this.id;
    }
    return obj;
  }
}
