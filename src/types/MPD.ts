import {Temporal} from '@js-temporal/polyfill';
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
    super('MPD');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
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
      initialValues.mediaPresentationDuration = Temporal.Duration.from(mediaPresentationDuration).total({unit: 'seconds'});
    }
    if (typeof minimumUpdatePeriod === 'string') {
      initialValues.minimumUpdatePeriod = Temporal.Duration.from(minimumUpdatePeriod).total({unit: 'seconds'});
    }
    if (typeof minBufferTime === 'string') {
      initialValues.minBufferTime = Temporal.Duration.from(minBufferTime).total({unit: 'seconds'});
    }
    if (typeof timeShiftBufferDepth === 'string') {
      initialValues.timeShiftBufferDepth = Temporal.Duration.from(timeShiftBufferDepth).total({unit: 'seconds'});
    }
    if (typeof suggestedPresentationDelay === 'string') {
      initialValues.suggestedPresentationDelay = Temporal.Duration.from(suggestedPresentationDelay).total({unit: 'seconds'});
    }
    if (typeof maxSegmentDuration === 'string') {
      initialValues.maxSegmentDuration = Temporal.Duration.from(maxSegmentDuration).total({unit: 'seconds'});
    }
    if (typeof maxSubsegmentDuration === 'string') {
      initialValues.maxSubsegmentDuration = Temporal.Duration.from(maxSubsegmentDuration).total({unit: 'seconds'});
    }
  }

  override verifyAttributes(): void {
    if (!this.profiles || !this.minBufferTime) {
      this.reject('Required attributes are missing');
    }
    if (this.type === 'dynamic' && !this.availabilityStartTime) {
      this.reject('@availabilityStartTime shall be present when @type is "dynamic"');
    }
    if (this.availabilityStartTime && this.availabilityEndTime && this.availabilityStartTime >= this.availabilityEndTime) {
      this.reject('@availabilityStartTime shall be less than @availabilityEndTime');
    }
    if (!this.mediaPresentationDuration && !this.minimumUpdatePeriod) {
      const lastPeriod = this.getElements('Period').at(-1);
      if (lastPeriod && lastPeriod['duration'] === undefined) { // eslint-disable-line @typescript-eslint/dot-notation
        this.reject('@mediaPresentationDuration shall be present when neither @minimumUpdatePeriod nor @duration of the last Period are present.');
      }
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
    if (this.getElements('PatchLocation').length > 0 && (typeof this.id !== 'string' || !this.publishTime)) {
      this.reject('If PatchLocation is present, @id and @publishTime shall be present');
    }
    if (this.getElements('PatchLocation').length > 0 && (this.type !== 'dynamic' || !this.minimumUpdatePeriod)) {
      this.reject('PatchLocation shall not be present when @type is not "dynamic" or the @minimumUpdatePeriod is not present');
    }
  }

  override verifyChildren(): void {
    const spec = this.static.CHILDRREN_SPEC;
    for (const key of Object.keys(spec)) {
      const [min, max] = this.static.CHILDRREN_SPEC[key];
      const count = this.children.filter(el => el.name === key).length;
      if (count < min || count > max) {
        this.reject(`Number of ${key} is ${count}, but should be between ${min} and ${max}`);
      }
    }
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      profiles: this.profiles,
      minBufferTime: Temporal.Duration.from({seconds: this.minBufferTime}).toString(),
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
      obj.mediaPresentationDuration = Temporal.Duration.from({seconds: this.mediaPresentationDuration}).toString();
    }
    if (this.minimumUpdatePeriod) {
      obj.minimumUpdatePeriod = Temporal.Duration.from({seconds: this.minimumUpdatePeriod}).toString();
    }
    if (this.timeShiftBufferDepth) {
      obj.timeShiftBufferDepth = Temporal.Duration.from({seconds: this.timeShiftBufferDepth}).toString();
    }
    if (this.suggestedPresentationDelay) {
      obj.suggestedPresentationDelay = Temporal.Duration.from({seconds: this.suggestedPresentationDelay}).toString();
    }
    if (this.maxSegmentDuration) {
      obj.maxSegmentDuration = Temporal.Duration.from({seconds: this.maxSegmentDuration}).toString();
    }
    if (this.maxSubsegmentDuration) {
      obj.maxSubsegmentDuration = Temporal.Duration.from({seconds: this.maxSubsegmentDuration}).toString();
    }
    return obj;
  }
}
