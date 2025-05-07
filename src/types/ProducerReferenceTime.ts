import type {ParsedObject} from './types';
import {Element} from './Element';

export class ProducerReferenceTime extends Element {
  public id?: string;
  public inband?: boolean;
  public type?: string;
  public applicationScheme?: string;
  public wallClockTime?: string;
  public presentationTime?: string;

  constructor(initialValues?: Partial<ProducerReferenceTime>, ctx?: ParsedObject) {
    super({name: 'ProducerReferenceTime', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
