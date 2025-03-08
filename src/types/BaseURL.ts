import {
  fromTemporalDurationString,
  toTemporalDurationString,
} from '../utils';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class BaseURL extends Element {
  public serviceLocation?: string;
  public byteRange?: string;
  public availabilityTimeOffset?: number | 'INF';
  public availabilityTimeComplete?: boolean;
  public timeShiftBufferDepth?: number;
  public rangeAccess?: boolean;

  constructor(initialValues?: Partial<BaseURL>) {
    super({name: 'BaseURL', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      timeShiftBufferDepth,
    } = initialValues;

    if (typeof timeShiftBufferDepth === 'string') {
      initialValues.timeShiftBufferDepth = fromTemporalDurationString(timeShiftBufferDepth);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.timeShiftBufferDepth === 'number' && ctx.mpdType !== 'dynamic') {
      this.reject('@timeShiftBufferDepth shall not be defined if MPD@type is static');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.serviceLocation === 'string') {
      obj.serviceLocation = this.serviceLocation;
    }
    if (typeof this.byteRange === 'string') {
      obj.byteRange = this.byteRange;
    }
    if (typeof this.availabilityTimeOffset === 'number' || this.availabilityTimeOffset === 'INF') {
      obj.availabilityTimeOffset = this.availabilityTimeOffset;
    }
    if (typeof this.availabilityTimeComplete === 'boolean') {
      obj.availabilityTimeComplete = this.availabilityTimeComplete;
    }
    if (typeof this.timeShiftBufferDepth === 'number') {
      obj.timeShiftBufferDepth = toTemporalDurationString(this.timeShiftBufferDepth);
    }
    if (typeof this.rangeAccess === 'boolean') {
      obj.rangeAccess = this.rangeAccess;
    }
    return obj;
  }
}
