import type {ParsedObject} from './types';
import {Element} from './Element';

export class LeapSecondInformation extends Element {
  public nextLeapChangeTime?: string;
  public insertionTime?: string;

  constructor(initialValues?: Partial<LeapSecondInformation>) {
    super('LeapSecondInformation');
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
