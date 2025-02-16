import type {ParsedObject} from './types';
import {Element} from './Element';

export class SegmentList extends Element {
  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';

  constructor(initialValues?: Partial<SegmentList>) {
    super({name: 'SegmentList', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
