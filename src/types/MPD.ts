import {toTemporalDurationString, fromTemporalDurationString} from '../utils';
import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export class MPD extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'ProgramInformation',
    'BaseURL',
    'Location',
    'PatchLocation',
    'ServiceDescription',
    'InitializationSet',
    'InitializationGroup',
    'InitializationPresentation',
    'ContentProtection',
    'Period',
    'Metrics',
    'EssentialProperty',
    'SupplementalProperty',
    'UTCTiming',
    'LeapSecondInformation',
  ];

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    Period: [1, Infinity],
    LeapSecondInformation: [0, 1],
  };

  public id?: string;
  public profiles?: string | string[];
  public type?: 'static' | 'dynamic';
  public availabilityStartTime?: Date;
  public publishTime?: Date;
  public availabilityEndTime?: Date;
  public mediaPresentationDuration?: number;
  public minimumUpdatePeriod?: number;
  public minBufferTime?: number;
  public timeShiftBufferDepth?: number;
  public suggestedPresentationDelay?: number;
  public maxSegmentDuration?: number;
  public maxSubsegmentDuration?: number;

  constructor(initialValues?: Partial<MPD>) {
    super({name: 'MPD', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      id,
      profiles,
      availabilityStartTime,
      publishTime,
      availabilityEndTime,
      mediaPresentationDuration,
      minimumUpdatePeriod,
      minBufferTime,
      timeShiftBufferDepth,
      suggestedPresentationDelay,
      maxSegmentDuration,
      maxSubsegmentDuration,
    } = initialValues;

    if (typeof id === 'number') {
      initialValues.id = `${id}`;
    }
    if (typeof profiles === 'string' && profiles.includes(',')) {
      initialValues.profiles = profiles.split(',').map(profile => profile.trim());
    }
    if (typeof availabilityStartTime === 'string') {
      initialValues.availabilityStartTime = new Date(availabilityStartTime);
    }
    if (typeof publishTime === 'string') {
      initialValues.publishTime = new Date(publishTime);
    }
    if (typeof availabilityEndTime === 'string') {
      initialValues.availabilityEndTime = new Date(availabilityEndTime);
    }
    if (typeof mediaPresentationDuration === 'string') {
      initialValues.mediaPresentationDuration = fromTemporalDurationString(mediaPresentationDuration);
    }
    if (typeof minimumUpdatePeriod === 'string') {
      initialValues.minimumUpdatePeriod = fromTemporalDurationString(minimumUpdatePeriod);
    }
    if (typeof minBufferTime === 'string') {
      initialValues.minBufferTime = fromTemporalDurationString(minBufferTime);
    }
    if (typeof timeShiftBufferDepth === 'string') {
      initialValues.timeShiftBufferDepth = fromTemporalDurationString(timeShiftBufferDepth);
    }
    if (typeof suggestedPresentationDelay === 'string') {
      initialValues.suggestedPresentationDelay = fromTemporalDurationString(suggestedPresentationDelay);
    }
    if (typeof maxSegmentDuration === 'string') {
      initialValues.maxSegmentDuration = fromTemporalDurationString(maxSegmentDuration);
    }
    if (typeof maxSubsegmentDuration === 'string') {
      initialValues.maxSubsegmentDuration = fromTemporalDurationString(maxSubsegmentDuration);
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (!this.profiles || !this.minBufferTime) {
      this.reject('Required attributes are missing');
    }
    if (this.type === 'dynamic' && !this.availabilityStartTime) {
      this.reject('@availabilityStartTime shall be present when @type is "dynamic"');
    }
    if (this.availabilityStartTime && this.availabilityEndTime && this.availabilityStartTime >= this.availabilityEndTime) {
      this.reject('@availabilityStartTime shall be less than @availabilityEndTime');
    }
    if (this.minimumUpdatePeriod && this.type !== 'dynamic') {
      this.reject('@minimumUpdatePeriod shall not be present when @type is not "dynamic"');
    }
    if (this.timeShiftBufferDepth && this.type !== 'dynamic') {
      this.reject('@timeShiftBufferDepth shall not be present when @type is not "dynamic"');
    }
    if (this.suggestedPresentationDelay && this.type !== 'dynamic') {
      this.reject('@suggestedPresentationDelay shall not be present when @type is not "dynamic"');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
    if (!this.mediaPresentationDuration && !this.minimumUpdatePeriod) {
      const lastPeriod = this.getElements('Period').at(-1);
      if (lastPeriod && lastPeriod['duration'] === undefined) { // eslint-disable-line @typescript-eslint/dot-notation
        this.reject('@mediaPresentationDuration shall be present when neither @minimumUpdatePeriod nor @duration of the last Period are present.');
      }
    }
    if (this.getElements('PatchLocation').length > 0 && (typeof this.id !== 'string' || !this.publishTime)) {
      this.reject('If PatchLocation is present, @id and @publishTime shall be present');
    }
    if (this.getElements('PatchLocation').length > 0 && (this.type !== 'dynamic' || !this.minimumUpdatePeriod)) {
      this.reject('PatchLocation shall not be present when @type is not "dynamic" or the @minimumUpdatePeriod is not present');
    }
    if (typeof this.timeShiftBufferDepth === 'number') {
      this.getAllElements(elem => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (typeof elem['timeShiftBufferDepth'] === 'number' && elem['timeShiftBufferDepth'] < this.timeShiftBufferDepth!) {
          this.reject('Representation-level @timeShiftBufferDepth shall be not smaller than the value on MPD level');
        }
        return true;
      });
    }
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      profiles: this.profiles,
      minBufferTime: toTemporalDurationString(this.minBufferTime!),
    };
    if (this.id !== undefined) {
      obj.id = this.id;
    }
    if (this.profiles) {
      obj.profiles = Array.isArray(this.profiles) ? this.profiles.join(',') : this.profiles;
    }
    if (this.type) {
      obj.type = this.type;
    }
    if (this.availabilityStartTime) {
      obj.availabilityStartTime = this.availabilityStartTime.toISOString();
    }
    if (this.publishTime) {
      obj.publishTime = this.publishTime.toISOString();
    }
    if (this.availabilityEndTime) {
      obj.availabilityEndTime = this.availabilityEndTime.toISOString();
    }
    if (this.mediaPresentationDuration) {
      obj.mediaPresentationDuration = toTemporalDurationString(this.mediaPresentationDuration);
    }
    if (this.minimumUpdatePeriod) {
      obj.minimumUpdatePeriod = toTemporalDurationString(this.minimumUpdatePeriod);
    }
    if (this.timeShiftBufferDepth) {
      obj.timeShiftBufferDepth = toTemporalDurationString(this.timeShiftBufferDepth);
    }
    if (this.suggestedPresentationDelay) {
      obj.suggestedPresentationDelay = toTemporalDurationString(this.suggestedPresentationDelay);
    }
    if (this.maxSegmentDuration) {
      obj.maxSegmentDuration = toTemporalDurationString(this.maxSegmentDuration);
    }
    if (this.maxSubsegmentDuration) {
      obj.maxSubsegmentDuration = toTemporalDurationString(this.maxSubsegmentDuration);
    }
    return obj;
  }
}
