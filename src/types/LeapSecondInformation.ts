import type {ParsedObject} from './types';
import {Element} from './Element';

export class LeapSecondInformation extends Element {
  public nextLeapChangeTime?: string;
  public insertionTime?: string;

  constructor(initialValues?: Partial<LeapSecondInformation>) {
    super({name: 'LeapSecondInformation', ...initialValues});
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
