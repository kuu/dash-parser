import {Temporal} from '@js-temporal/polyfill';
import {throwError} from './utils';

export type ParsedObject = Record<string, any>;
export type Range = [number, number];

export abstract class Element {
  static readonly ALLOWED_CHILDREN: string[];
  static readonly CHILDRREN_SPEC: Record<string, Range>;
  get static(): typeof Element {
    return this.constructor as typeof Element;
  }

  elements: Element[] = [];
  constructor(readonly name: string) {}

  addElement(element: Element): void {
    // console.log(`element.name = "${element.name}"`);
    // console.log(`this.static.ALLOWED_CHILDREN = "${JSON.stringify(this.static.ALLOWED_CHILDREN, null, 2)}"`);
    if (!this.static.ALLOWED_CHILDREN.includes(element.name)) {
      return throwError(`${element.name} cannot be added`);
    }
    this.elements.push(element);
  }

  abstract checkParams(initialValues?: Partial<ParsedObject>): void;
  abstract checkChildren(): void;
  abstract get serializedProps(): ParsedObject;
}

export class MPD extends Element {
  static override readonly ALLOWED_CHILDREN = [
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
  public profiles: string | string[] = 'urn:mpeg:dash:profile:isoff-on-demand';
  public type?: 'static' | 'dynamic';
  public availabilityStartTime?: Date;
  public publishTime?: Date;
  public availabilityEndTime?: Date;
  public mediaPresentationDuration?: number;
  public minimumUpdatePeriod?: number;
  public minBufferTime = 2;
  public timeShiftBufferDepth?: number;
  public suggestedPresentationDelay?: number;
  public maxSegmentDuration?: number;
  public maxSubsegmentDuration?: number;

  constructor(initialValues?: Partial<MPD>) {
    super('MPD');
    this.checkParams(initialValues);
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues?.profiles || !initialValues?.minBufferTime) {
      return throwError('Required attributes are missing');
    }
    const {
      id,
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

  checkChildren(): void {
    const spec = this.static.CHILDRREN_SPEC;
    for (const key of Object.keys(spec)) {
      const [min, max] = this.static.CHILDRREN_SPEC[key];
      const count = this.elements.filter(el => el.name === key).length;
      if (count < min || count > max) {
        throwError(`Number of ${key} is ${count}, but should be between ${min} and ${max}`);
      }
    }
  }

  get serializedProps(): ParsedObject {
    const obj: ParsedObject = {
      profiles: this.profiles,
      minBufferTime: Temporal.Duration.from({seconds: this.minBufferTime}).toString(),
    };
    if (this.id !== undefined) {
      obj.id = this.id;
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

export class ProgramInformation extends Element {
  public title?: string;
  public source?: string;
  public lang?: string;

  constructor(initialValues?: Partial<ProgramInformation>) {
    super('ProgramInformation');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class BaseURL extends Element {
  public url?: string;

  constructor(initialValues?: Partial<BaseURL>) {
    super('BaseURL');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class Location extends Element {
  public url?: string;

  constructor(initialValues?: Partial<Location>) {
    super('Location');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class PatchLocation extends Element {
  public url?: string;

  constructor(initialValues?: Partial<PatchLocation>) {
    super('PatchLocation');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class ServiceDescription extends Element {
  public lang?: string;
  public value?: string;

  constructor(initialValues?: Partial<ServiceDescription>) {
    super('ServiceDescription');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class InitializationSet extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationSet>) {
    super('InitializationSet');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class InitializationGroup extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationGroup>) {
    super('InitializationGroup');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class InitializationPresentation extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationPresentation>) {
    super('InitializationPresentation');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class ContentProtection extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public cencPSSH?: string;

  constructor(initialValues?: Partial<ContentProtection>) {
    super('ContentProtection');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class Period extends Element {
  public id?: string;
  public start?: number;
  public duration?: number;

  constructor(initialValues?: Partial<Period>) {
    super('Period');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class Metrics extends Element {
  public metrics?: string;

  constructor(initialValues?: Partial<Metrics>) {
    super('Metrics');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class EssentialProperty extends Element {
  public schemeIdUri?: string;
  public value?: string;

  constructor(initialValues?: Partial<EssentialProperty>) {
    super('EssentialProperty');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class SupplementalProperty extends Element {
  public schemeIdUri?: string;
  public value?: string;

  constructor(initialValues?: Partial<SupplementalProperty>) {
    super('SupplementalProperty');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class UTCTiming extends Element {
  public schemeIdUri?: string;
  public value?: string;
  public timing?: string;

  constructor(initialValues?: Partial<UTCTiming>) {
    super('UTCTiming');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}

export class LeapSecondInformation extends Element {
  public nextLeapChangeTime?: string;
  public insertionTime?: string;

  constructor(initialValues?: Partial<LeapSecondInformation>) {
    super('LeapSecondInformation');
    Object.assign(this, initialValues);
  }

  checkParams(initialValues?: Partial<ParsedObject>): void {
    console.log('');
  }

  checkChildren(): void {
    console.log('');
  }

  get serializedProps(): ParsedObject {
    return {};
  }
}
