import {
  fromByteRangeString,
  toByteRangeString,
} from '../utils';
import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export abstract class URLType extends Element {
  public sourceURL?: string;
  public range?: Range;

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      range,
    } = initialValues;

    if (typeof range === 'string') {
      initialValues.range = fromByteRangeString(range.includes(',') ? range.slice(0, range.indexOf(',')) : range);
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
    if (typeof this.sourceURL === 'string') {
      obj.sourceURL = this.sourceURL;
    }
    if (this.range) {
      obj.range = toByteRangeString(this.range);
    }
    return obj;
  }
}
