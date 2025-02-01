import type {ParsedObject} from './types';
import {CommonAttributesElements} from './CommonAttributesElements';

export class AdaptationSet extends CommonAttributesElements {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'Accessibility',
    'Role',
    'Rating',
    'Viewpoint',
    'ContentComponent',
    'BaseURL',
    'SegmentBase',
    'SegmentList',
    'SegmentTemplate',
    'Representation',
  ];

  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';
  public id?: number;
  public group?: number;
  public lang?: string;
  public contentType?: string;
  public par?: [w: number, h: number];
  public minBandwidth?: number;
  public maxBandwidth?: number;
  public minWidth?: number;
  public maxWidth?: number;
  public minHeight?: number;
  public maxHeight?: number;
  public minFrameRate?: number;
  public maxFrameRate?: number;
  public segmentAlignment?: boolean;
  public bitstreamSwitching?: boolean;
  public subsegmentAlignment?: boolean;
  public subsegmentStartsWithSAP?: number;
  public initializationSetRef?: number[];
  public initializationPrincipal?: string;

  constructor(initialValues?: Partial<AdaptationSet>) {
    super('AdaptationSet');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);

    if (!initialValues) {
      return;
    }

    const {
      par,
      segmentAlignment,
      bitstreamSwitching,
      subsegmentAlignment,
      initializationSetRef,
    } = initialValues;

    if (typeof initialValues['xlink:href'] === 'string') {
      initialValues.xlinkHref = initialValues['xlink:href'];
      delete initialValues['xlink:href'];
    }
    if (typeof initialValues['xlink:actuate'] === 'string') {
      initialValues.xlinkActuate = initialValues['xlink:actuate'];
      delete initialValues['xlink:actuate'];
    }
    if (typeof par === 'string') {
      initialValues.par = par.split(':').map(value => Number.parseInt(value, 10)) as [number, number];
    }
    if (typeof segmentAlignment === 'string') {
      initialValues.segmentAlignment = segmentAlignment === 'true';
    }
    if (typeof bitstreamSwitching === 'string') {
      initialValues.bitstreamSwitching = bitstreamSwitching === 'true';
    }
    if (typeof subsegmentAlignment === 'string') {
      initialValues.subsegmentAlignment = subsegmentAlignment === 'true';
    }
    if (typeof initializationSetRef === 'string') {
      initialValues.initializationSetRef = initializationSetRef
        .split(' ').map(value => Number.parseInt(value, 10))
        .filter(value => !Number.isNaN(value));
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (typeof this.id === 'number' && (!Number.isInteger(this.id) || this.id < 0)) {
      this.reject('@id should be an unsigned integer');
    }
    if (typeof this.group === 'number' && (!Number.isInteger(this.group) || this.group < 0)) {
      this.reject('@group should be an unsigned integer');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
    if (typeof this.width === 'number' && typeof this.height === 'number') {
      const elems = [this, ...this.getElements('ContentComponent')];
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const pars = elems.filter(elem => Array.isArray(elem['par'])).map(elem => elem['par'] as [number, number]);
      const [sarX, sarY] = this.sar ?? [1, 1];
      for (const par of pars) {
        const [parX, parY] = par;
        if ((this.width * sarX) / (this.height * sarY) !== (parX / parY)) {
          this.reject(`@par(${parX}:${parY}) and @width(${this.width}), @height(${this.height}), @sar(${sarX}:${sarY}) are not consistent`);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const componentIds = this.getElements('ContentComponent').filter(item => typeof item['id'] === 'string').map(item => item['id'] as string);
    if (componentIds.length > 1 && new Set(componentIds).size !== componentIds.length) {
      this.reject('ContentComponent@id shall be unique in the scope of the containing Adaptation Set.');
    }

    const randomAccessList = this.getAllElements('RandomAccess');
    if (randomAccessList.length > 0) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const timsScaleList = this.getAllElements(e => e['timescale'] !== undefined);
      if (timsScaleList.length === 0) {
        this.reject('No @timescale found. RandomAccess@interval shall be specified in the scale of the @timescale on Representation level.');
      }
    }
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.xlinkHref === 'string') {
      obj['xlink:href'] = this.xlinkHref;
    }
    if (typeof this.xlinkActuate === 'string') {
      obj['xlink:actuate'] = this.xlinkActuate;
    }
    if (typeof this.id === 'number') {
      obj.id = this.id;
    }
    if (typeof this.group === 'number') {
      obj.group = this.group;
    }
    if (typeof this.lang === 'string') {
      obj.lang = this.lang;
    }
    if (typeof this.contentType === 'string') {
      obj.contentType = this.contentType;
    }
    if (this.par) {
      obj.par = this.par.join(':');
    }
    if (typeof this.minBandwidth === 'number') {
      obj.minBandwidth = this.minBandwidth;
    }
    if (typeof this.maxBandwidth === 'number') {
      obj.maxBandwidth = this.maxBandwidth;
    }
    if (typeof this.minWidth === 'number') {
      obj.minWidth = this.minWidth;
    }
    if (typeof this.maxWidth === 'number') {
      obj.maxWidth = this.maxWidth;
    }
    if (typeof this.minHeight === 'number') {
      obj.minHeight = this.minHeight;
    }
    if (typeof this.maxHeight === 'number') {
      obj.maxHeight = this.maxHeight;
    }
    if (typeof this.minFrameRate === 'number') {
      obj.minFrameRate = this.minFrameRate;
    }
    if (typeof this.maxFrameRate === 'number') {
      obj.maxFrameRate = this.maxFrameRate;
    }
    if (typeof this.segmentAlignment === 'boolean') {
      obj.segmentAlignment = `${this.segmentAlignment}`;
    }
    if (typeof this.bitstreamSwitching === 'boolean') {
      obj.bitstreamSwitching = `${this.bitstreamSwitching}`;
    }
    if (typeof this.subsegmentAlignment === 'boolean') {
      obj.subsegmentAlignment = `${this.subsegmentAlignment}`;
    }
    if (typeof this.subsegmentStartsWithSAP === 'number') {
      obj.subsegmentStartsWithSAP = this.subsegmentStartsWithSAP;
    }
    if (Array.isArray(this.initializationSetRef) && this.initializationSetRef.every(item => typeof item === 'number')) {
      obj.initializationSetRef = this.initializationSetRef.join(' ');
    }
    if (typeof this.initializationPrincipal === 'string') {
      obj.initializationPrincipal = this.initializationPrincipal;
    }
    return obj;
  }
}
