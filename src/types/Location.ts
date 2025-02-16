import type {ParsedObject} from './types';
import {Element} from './Element';

export class Location extends Element {
  public url?: string;

  constructor(initialValues?: Partial<Location>) {
    super({name: 'Location', ...initialValues});
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
