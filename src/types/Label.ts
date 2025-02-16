import type {ParsedObject} from './types';
import {Element} from './Element';

export class Label extends Element {
  public id?: string;
  public lang?: string;

  constructor(initialValues?: Partial<Label>) {
    super({name: 'Label', ...initialValues});
  }

  override formatParams(initialValues?: Partial<Label>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
