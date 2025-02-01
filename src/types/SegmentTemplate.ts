import type {ParsedObject} from './types';
import {Element} from './Element';

export class SegmentTemplate extends Element {
  public media?: string;
  public timescale?: number;

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
    const obj: ParsedObject = {};
    if (typeof this.timescale === 'number') {
      obj.timescale = this.timescale;
    }
    return obj;
  }
}
