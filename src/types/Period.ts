import {Temporal} from '@js-temporal/polyfill';
import type {ParsedObject} from './types';
import {Element} from './Element';

export class Period extends Element {
  static override readonly ALLOWED_CHILDREN = [
    'BaseURL',
    'SegmentBase',
    'SegmentList',
    'SegmentTemplate',
    'AssetIdentifier',
    'EventStream',
    'ServiceDescription',
    'ContentProtection',
    'AdaptationSet',
    'Subset',
    'SupplementalProperty',
    'EmptyAdaptationSet',
    'GroupLabel',
    'Preselection',
  ];

  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';
  public id?: string;
  public start?: Date;
  public duration?: number;
  public bitstreamSwitching?: boolean;

  constructor(initialValues?: Partial<Period>) {
    super('Period');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      id,
      start,
      duration,
      bitstreamSwitching,
    } = initialValues;

    if (typeof initialValues['xlink:href'] === 'string') {
      initialValues.xlinkHref = initialValues['xlink:href'];
      delete initialValues['xlink:href'];
    }
    if (typeof initialValues['xlink:actuate'] === 'string') {
      initialValues.xlinkActuate = initialValues['xlink:actuate'];
      delete initialValues['xlink:actuate'];
    }
    if (typeof id === 'number') {
      initialValues.id = `${id}`;
    }
    if (typeof start === 'string') {
      initialValues.start = new Date(start);
    }
    if (typeof duration === 'string') {
      initialValues.duration = Temporal.Duration.from(duration).total({unit: 'seconds'});
    }
    if (typeof bitstreamSwitching === 'string') {
      initialValues.bitstreamSwitching = bitstreamSwitching === 'true';
    }
  }

  override verifyAttributes(): void {
    if (this.xlinkActuate && !this.xlinkHref) {
      this.reject('@xlink:actuate shall not be present if @xlink:href is not present');
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (this.getElements('ContentProtection').some(cp => cp['refId'] === undefined)) {
      this.reject('If ContentProtection is present, it shall include @refId');
    }
    if (!(typeof this.duration === 'number' && this.duration === 0) && this.getElements('AdaptationSet').length === 0) {
      this.reject('At least one AdaptationSet shall be present in each Period unless @duration is set to zero');
    }
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};

    if (typeof this.xlinkHref === 'string') {
      obj['xlink:href'] = this.xlinkHref;
    }
    if (typeof this.xlinkActuate === 'string') {
      obj['xlink:actuate'] = this.xlinkActuate;
    }
    if (typeof this.id === 'string') {
      obj.id = this.id;
    }
    if (this.start instanceof Date) {
      obj.start = this.start.toISOString();
    }
    if (typeof this.duration === 'number') {
      obj.duration = Temporal.Duration.from({seconds: this.duration}).toString();
    }
    if (typeof this.bitstreamSwitching === 'boolean') {
      obj.bitstreamSwitching = `${this.bitstreamSwitching}`;
    }
    return obj;
  }
}
