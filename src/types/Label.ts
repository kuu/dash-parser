import type {ParsedObject} from './types';
import {Element} from './Element';

export class Label extends Element {
  public id?: string;
  public lang?: string;

  constructor(initialValues?: Partial<Label>, ctx?: ParsedObject) {
    super({name: 'Label', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<Label>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
