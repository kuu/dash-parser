import type {ParsedObject} from './types';
import {Element} from './Element';

export class LeapSecondInformation extends Element {
  public nextLeapChangeTime?: string;
  public insertionTime?: string;

  constructor(initialValues?: Partial<LeapSecondInformation>, ctx?: ParsedObject) {
    super({name: 'LeapSecondInformation', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
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
