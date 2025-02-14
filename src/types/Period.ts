import {toTemporalDurationString, fromTemporalDurationString} from '../utils';
import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export class Period extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
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

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    AssetIdentifier: [0, 1],
  };

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
      initialValues.duration = fromTemporalDurationString(duration);
    }
    if (typeof bitstreamSwitching === 'string') {
      initialValues.bitstreamSwitching = bitstreamSwitching === 'true';
    }
  }

  override verifyAttributes(): void {
    if (this.xlinkActuate && !this.xlinkHref) {
      this.reject('@xlink:actuate shall not be present if @xlink:href is not present');
    }
  }

  override verifyChildren(): void {
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
    if (!(typeof this.duration === 'number' && this.duration === 0) && this.getElements('AdaptationSet').length === 0) {
      this.reject('At least one AdaptationSet shall be present in each Period unless @duration is set to zero');
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (this.getElements('ContentProtection').some(cp => cp['refId'] === undefined)) {
      this.reject('If ContentProtection is present, it shall include @refId');
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const adaptationSetIds = this.getElements('AdaptationSet').filter(elem => typeof elem['id'] === 'number').map(elem => elem['id'] as number);
    if (Array.isArray(adaptationSetIds) && adaptationSetIds.length !== new Set(adaptationSetIds).size) {
      this.reject('AdaptationSet@id shall be a unique value in the scope of the containing Period');
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const representationIds = this.getAllElements('Representation').filter(([elem]) => typeof elem['id'] === 'string').map(([elem]) => elem['id'] as string);
    if (Array.isArray(representationIds) && representationIds.length !== new Set(representationIds).size) {
      this.reject('Representation@id shall be unique within a Period');
    }
    const subsets = this.getElements('Subset');
    if (subsets.length > 0) {
      if (!Array.isArray(adaptationSetIds)) {
        this.reject('AdaptationSet@id shall be present when Subset is present');
      }
      const subsetIds: string[] = [];
      for (const subset of subsets) {
        const contains = subset['contains'] as number[]; // eslint-disable-line @typescript-eslint/dot-notation
        for (const id of contains) {
          if (!adaptationSetIds.includes(id)) {
            this.reject('Subset@contains shall reference AdaptationSet@id');
          }
        }
        if (contains.length === adaptationSetIds.length) {
          this.reject('No Subset shall contain all the Adaptation Sets');
        }
        const id = subset['id'] as string; // eslint-disable-line @typescript-eslint/dot-notation
        if (id) {
          if (subsetIds.includes(id)) {
            this.reject('Subset@id shall be unique within a Period');
          }
          subsetIds.push(id);
        }
      }
    }
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
      obj.duration = toTemporalDurationString(this.duration);
    }
    if (typeof this.bitstreamSwitching === 'boolean') {
      obj.bitstreamSwitching = `${this.bitstreamSwitching}`;
    }
    return obj;
  }
}
