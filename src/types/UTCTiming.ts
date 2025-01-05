import type {ParsedObject} from './types';
import {Element} from './Element';

export class UTCTiming extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public timing?: string;

  constructor(initialValues?: Partial<UTCTiming>) {
    super('UTCTiming');
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
    return {};
  }
}
