import {
  fromTemporalDurationString,
  toTemporalDurationString,
  fromByteRangeString,
  toByteRangeString,
} from '../utils';
import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export class SegmentBase extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'Initialization',
    'RepresentationIndex',
    'FailoverContent',
  ];

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    Initialization: [0, 1],
    RepresentationIndex: [0, 1],
  };

  public timescale?: number;
  public presentationTimeOffset?: number;
  public eptDelta?: number;
  public pdDelta?: number;
  public presentationDuration?: number;
  public timeShiftBufferDepth?: number;
  public indexRange?: Range;
  public indexRangeExact?: boolean;
  public availabilityTimeOffset?: number | 'INF';
  public availabilityTimeComplete?: boolean;

  constructor(initialValues?: Partial<SegmentBase>) {
    super({name: 'SegmentBase', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      timeShiftBufferDepth,
      indexRange,
    } = initialValues;

    if (typeof timeShiftBufferDepth === 'string') {
      initialValues.timeShiftBufferDepth = fromTemporalDurationString(timeShiftBufferDepth);
    }
    if (typeof indexRange === 'string') {
      initialValues.indexRange = fromByteRangeString(indexRange.includes(',') ? indexRange.slice(0, indexRange.indexOf(',')) : indexRange);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    this.verifyUnsignedInt('timescale');
    if (typeof this.presentationTimeOffset === 'number' && this.presentationTimeOffset < 0) {
      this.reject('@presentationTimeOffset cannot be a negative value');
    }
    if (typeof this.timeShiftBufferDepth === 'number' && ctx.mpdType !== 'dynamic') {
      this.reject('@timeShiftBufferDepth shall not be defined if MPD@type is static');
    }
    if (typeof this.presentationDuration === 'number' && this.presentationDuration < 0) {
      this.reject('@presentationDuration cannot be a negative value');
    }
    if (typeof this.indexRangeExact === 'boolean' && this.indexRange === undefined) {
      this.reject('@indexRangeExact shall not be present if @indexRange is absent');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.timescale === 'number') {
      obj.timescale = this.timescale;
    }
    if (typeof this.presentationTimeOffset === 'number') {
      obj.presentationTimeOffset = this.presentationTimeOffset;
    }
    if (typeof this.eptDelta === 'number') {
      obj.eptDelta = this.eptDelta;
    }
    if (typeof this.pdDelta === 'number') {
      obj.pdDelta = this.pdDelta;
    }
    if (typeof this.presentationDuration === 'number') {
      obj.presentationDuration = this.presentationDuration;
    }
    if (typeof this.timeShiftBufferDepth === 'number') {
      obj.timeShiftBufferDepth = toTemporalDurationString(this.timeShiftBufferDepth);
    }
    if (this.indexRange) {
      obj.indexRange = toByteRangeString(this.indexRange);
    }
    if (typeof this.indexRangeExact === 'boolean') {
      obj.indexRangeExact = this.indexRangeExact;
    }
    if (typeof this.availabilityTimeOffset === 'number' || this.availabilityTimeOffset === 'INF') {
      obj.availabilityTimeOffset = this.availabilityTimeOffset;
    }
    if (typeof this.availabilityTimeComplete === 'boolean') {
      obj.availabilityTimeComplete = this.availabilityTimeComplete;
    }
    return obj;
  }
}
