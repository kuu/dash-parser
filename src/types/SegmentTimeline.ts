import type {ParsedObject} from './types';
import {Element} from './Element';

export class SegmentTimeline extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'S',
  ];

  constructor(initialValues?: Partial<SegmentTimeline>) {
    super({name: 'SegmentTimeline', ...initialValues});
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

export class S extends Element {
  public d?: number;

  constructor(initialValues?: Partial<S>) {
    super({name: 'S', ...initialValues});
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
    const obj: ParsedObject = {};
    if (typeof this.d === 'number') {
      obj.d = this.d;
    }
    return obj;
  }
}
