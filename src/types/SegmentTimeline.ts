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
    this.verifySegmentTime(ctx);
  }

  private verifySegmentTime(ctx: ParsedObject): void {
    const segments = this.getElements('S');
    let presentationTime = 0;
    for (const segment of segments) {
      const t = segment['t'] as number; // eslint-disable-line @typescript-eslint/dot-notation
      const d = segment['d'] as number; // eslint-disable-line @typescript-eslint/dot-notation
      const r = segment['r'] as number; // eslint-disable-line @typescript-eslint/dot-notation
      if (!t) {
        presentationTime += d * ((r ?? 0) + 1);
        continue;
      }
      if (t < presentationTime) {
        this.reject('S@t shall be equal to or greater than the sum of the previous S element earliest presentation time and the sum of the contiguous Segment durations.');
      }
      presentationTime = t + (d * ((r ?? 0) + 1));
    }
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}

export class S extends Element {
  public d?: number;
  public r?: number;
  public t?: number;
  public n?: number;
  public k?: number;

  constructor(initialValues?: Partial<S>) {
    super({name: 'S', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    this.verifyUnsignedInt('d', true);
    this.verifyInt('r');
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.d === 'number') {
      obj.d = this.d;
    }
    if (typeof this.r === 'number') {
      obj.r = this.r;
    }
    if (typeof this.t === 'number') {
      obj.t = this.t;
    }
    if (typeof this.n === 'number') {
      obj.n = this.n;
    }
    if (typeof this.k === 'number') {
      obj.k = this.k;
    }
    return obj;
  }
}
