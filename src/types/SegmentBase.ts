import type {ParsedObject} from './types';
import {Element} from './Element';

export class SegmentBase extends Element {
  public timescale?: number;

  constructor(initialValues?: Partial<SegmentBase>) {
    super('SegmentBase');
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
