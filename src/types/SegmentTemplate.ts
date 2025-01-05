import type {ParsedObject} from './types';
import {Element} from './Element';

export class SegmentTemplate extends Element {
  public media?: string;

  constructor(initialValues?: Partial<SegmentTemplate>) {
    super('SegmentTemplate');
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
