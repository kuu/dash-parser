import {
  fromByteRangeString,
  toByteRangeString,
} from '../utils';
import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export class SegmentURL extends Element {
  public media?: string;
  public mediaRange?: Range;
  public index?: string;
  public indexRange?: Range;

  constructor(initialValues?: Partial<SegmentURL>) {
    super({name: 'SegmentURL', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      mediaRange,
      indexRange,
    } = initialValues;

    if (typeof mediaRange === 'string') {
      initialValues.mediaRange = fromByteRangeString(mediaRange.includes(',') ? mediaRange.slice(0, mediaRange.indexOf(',')) : mediaRange);
    }
    if (typeof indexRange === 'string') {
      initialValues.indexRange = fromByteRangeString(indexRange.includes(',') ? indexRange.slice(0, indexRange.indexOf(',')) : indexRange);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.media === 'string') {
      obj.media = this.media;
    }
    if (this.mediaRange) {
      obj.mediaRange = toByteRangeString(this.mediaRange);
    }
    if (typeof this.index === 'string') {
      obj.index = this.index;
    }
    if (this.indexRange) {
      obj.indexRange = toByteRangeString(this.indexRange);
    }
    return obj;
  }
}
