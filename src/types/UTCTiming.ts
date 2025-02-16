import type {ParsedObject} from './types';
import {Element} from './Element';

export class UTCTiming extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public timing?: string;

  constructor(initialValues?: Partial<UTCTiming>) {
    super({name: 'UTCTiming', ...initialValues});
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
