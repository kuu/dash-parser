import type {ParsedObject} from './types';
import {Element} from './Element';

export class CommonAttributesElements extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'FramePacking',
    'AudioChannelConfiguration',
    'ContentProtection',
    'OutputProtection',
    'EssentialProperty',
    'SupplementalProperty',
    'InbandEventStream',
    'Switching',
    'RandomAccess',
    'GroupLabel',
    'Label',
    'ProducerReferenceTime',
    'ContentPopularityRate',
    'Resync',
  ];

  public profiles?: string | string[];
  public width?: number;
  public height?: number;
  public sar?: [w: number, h: number];
  public frameRate?: [numerator: number, denominator: number];
  public audioSamplingRate?: number | [min: number, max: number];
  public mimeType?: string;
  public segmentProfiles?: string | string[];
  public codecs?: string | string[];
  public containerProfiles?: string | string[];
  public maximumSAPPeriod?: number;
  public startWithSAP?: number;
  public maxPlayoutRate?: number;
  public codingDependency?: boolean;
  public scanType?: 'progressive' | 'interlaced' | 'unknown';
  public selectionPriority?: number;
  public tag?: string;

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      profiles,
      sar,
      frameRate,
      audioSamplingRate,
      segmentProfiles,
      codecs,
      containerProfiles,
      codingDependency,
    } = initialValues;

    if (typeof profiles === 'string' && profiles.includes(',')) {
      initialValues.profiles = profiles.split(',').map(profile => profile.trim());
    }
    if (typeof sar === 'string') {
      initialValues.sar = sar.split(':').map(value => Number.parseInt(value, 10)) as [number, number];
    }
    if (typeof frameRate === 'number') {
      initialValues.frameRate = [frameRate, 1];
    } else if (typeof frameRate === 'string') {
      initialValues.frameRate = frameRate.split('/').map(value => Number.parseInt(value, 10)) as [number, number];
    }
    if (typeof audioSamplingRate === 'number') {
      initialValues.audioSamplingRate = audioSamplingRate;
    } else if (typeof audioSamplingRate === 'string') {
      initialValues.audioSamplingRate = audioSamplingRate.split(' ').map(value => Number.parseFloat(value)) as [number, number];
    }
    if (typeof segmentProfiles === 'string' && segmentProfiles.includes(' ')) {
      initialValues.segmentProfiles = segmentProfiles.split(' ').map(profile => profile.trim());
    }
    if (typeof codecs === 'string' && codecs.includes(',')) {
      initialValues.codecs = codecs.split(',').map(codec => codec.trim());
    }
    if (typeof containerProfiles === 'string' && containerProfiles.includes(' ')) {
      initialValues.containerProfiles = containerProfiles.split(' ').map(profile => profile.trim());
    }
    if (typeof codingDependency === 'string') {
      initialValues.codingDependency = codingDependency === 'true';
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (typeof this.width === 'number' && (typeof this.mimeType === 'string' && !this.mimeType.startsWith('video'))) {
      this.reject('@width is only allowed for video content types');
    }
    if (typeof this.width === 'number' && (!Number.isInteger(this.width) || this.width < 1)) {
      this.reject('@width should be an unsigned integer');
    }
    if (typeof this.height === 'number' && (typeof this.mimeType === 'string' && !this.mimeType.startsWith('video'))) {
      this.reject('@height is only allowed for video content types');
    }
    if (typeof this.height === 'number' && (!Number.isInteger(this.height) || this.height < 1)) {
      this.reject('@height should be an unsigned integer');
    }
    if (this.sar && (typeof this.mimeType === 'string' && !this.mimeType.startsWith('video'))) {
      this.reject('@sar is only allowed for video content types');
    }
    if (this.sar && !(Array.isArray(this.sar) && this.sar.length === 2)) {
      this.reject('@sar should be a par of numbers');
    }
    if (
      this.sar && (
        (typeof this.sar[0] === 'number' && this.sar[0] <= 0)
        || (typeof this.sar[1] === 'number' && this.sar[1] <= 0)
      )
    ) {
      this.reject('@sar cannot contain zero or negative numbers');
    }
    if (this.frameRate && (typeof this.mimeType === 'string' && !this.mimeType.startsWith('video'))) {
      this.reject('@frameRate is only allowed for video content types');
    }
    if (
      this.frameRate && (
        (typeof this.frameRate[0] === 'number' && this.frameRate[0] <= 0)
        || (typeof this.frameRate[1] === 'number' && this.frameRate[1] <= 0)
      )
    ) {
      this.reject('@frameRate cannot contain zero or negative numbers');
    }
    if (this.audioSamplingRate && (typeof this.mimeType === 'string' && !this.mimeType.startsWith('audio'))) {
      this.reject('@audioSamplingRate is only allowed for audio content types');
    }
    if (typeof this.audioSamplingRate === 'number' && (!Number.isInteger(this.audioSamplingRate) || this.audioSamplingRate <= 0)) {
      this.reject('@audioSamplingRate shall be a decimal integer greater than zero');
    }
    if (
      Array.isArray(this.audioSamplingRate) && (
        (typeof this.audioSamplingRate[0] === 'number' && (!Number.isInteger(this.audioSamplingRate[0]) || this.audioSamplingRate[0] <= 0))
        || (typeof this.audioSamplingRate[1] === 'number' && (!Number.isInteger(this.audioSamplingRate[1]) || this.audioSamplingRate[1] <= 0))
      )
    ) {
      this.reject('@audioSamplingRate shall be a decimal integer greater than zero');
    }
    if (Array.isArray(this.audioSamplingRate) && this.audioSamplingRate[0] >= this.audioSamplingRate[1]) {
      this.reject('@audioSamplingRate a pair of decimal integer values specifies the minimum and maximum sampling rate');
    }
    if (this.name === 'AdaptationSet' && typeof this.mimeType === 'string') {
      ctx.mimeTypeIsDefined = true;
    } else if (!ctx.mimeTypeIsDefined && typeof this.mimeType !== 'string') {
      this.reject('@mimeType should be defined');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};

    if (this.profiles) {
      obj.profiles = Array.isArray(this.profiles) ? this.profiles.join(',') : this.profiles;
    }
    if (typeof this.width === 'number') {
      obj.width = this.width;
    }
    if (typeof this.height === 'number') {
      obj.height = this.height;
    }
    if (this.sar) {
      obj.sar = this.sar.join(':');
    }
    if (this.frameRate) {
      obj.frameRate = this.frameRate[1] === 1 ? `${this.frameRate[0]}` : this.frameRate.join('/');
    }
    if (this.audioSamplingRate) {
      obj.audioSamplingRate = typeof this.audioSamplingRate === 'number' ? `${this.audioSamplingRate}` : this.audioSamplingRate.join(' ');
    }
    if (typeof this.mimeType === 'string') {
      obj.mimeType = this.mimeType;
    }
    if (this.segmentProfiles) {
      obj.segmentProfiles = Array.isArray(this.segmentProfiles) ? this.segmentProfiles.join(' ') : this.segmentProfiles;
    }
    if (this.codecs) {
      obj.codecs = Array.isArray(this.codecs) ? this.codecs.join(',') : this.codecs;
    }
    if (this.containerProfiles) {
      obj.containerProfiles = Array.isArray(this.containerProfiles) ? this.containerProfiles.join(' ') : this.containerProfiles;
    }
    if (typeof this.maximumSAPPeriod === 'number') {
      obj.maximumSAPPeriod = this.maximumSAPPeriod;
    }
    if (typeof this.startWithSAP === 'number') {
      obj.startWithSAP = this.startWithSAP;
    }
    if (typeof this.maxPlayoutRate === 'number') {
      obj.maxPlayoutRate = this.maxPlayoutRate;
    }
    if (typeof this.codingDependency === 'boolean') {
      obj.codingDependency = `${this.codingDependency}`;
    }
    if (typeof this.scanType === 'string') {
      obj.scanType = this.scanType;
    }
    if (typeof this.selectionPriority === 'number') {
      obj.selectionPriority = this.selectionPriority;
    }
    if (typeof this.tag === 'string') {
      obj.tag = this.tag;
    }
    return obj;
  }
}
