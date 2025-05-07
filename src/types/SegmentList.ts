import type {ParsedObject} from './types';
import {MultipleSegmentBase} from './MultipleSegmentBase';

export class SegmentList extends MultipleSegmentBase {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'SegmentURL',
  ];

  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';

  constructor(initialValues?: Partial<SegmentList>, ctx?: ParsedObject) {
    super({name: 'SegmentList', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues) {
      return;
    }

    if (typeof initialValues['xlink:href'] === 'string') {
      initialValues.xlinkHref = initialValues['xlink:href'];
      delete initialValues['xlink:href'];
    }
    if (typeof initialValues['xlink:actuate'] === 'string') {
      initialValues.xlinkActuate = initialValues['xlink:actuate'];
      delete initialValues['xlink:actuate'];
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
    if (this.xlinkActuate && !this.xlinkHref) {
      this.reject('@xlink:actuate shall not be present if @xlink:href is not present');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (this.xlinkHref) {
      obj['xlink:href'] = this.xlinkHref;
    }
    if (this.xlinkActuate) {
      obj['xlink:actuate'] = this.xlinkActuate;
    }
    return obj;
  }
}
