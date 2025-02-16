import type {ParsedObject} from './types';
import {Element} from './Element';

export class BaseURL extends Element {
  public url?: string;

  constructor(initialValues?: Partial<BaseURL>) {
    super({name: 'BaseURL', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
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
