import type {ParsedObject} from './types';
import {Element} from './Element';

export class ProducerReferenceTime extends Element {
  public id?: string;
  public inband?: boolean;
  public type?: string;
  public applicationScheme?: string;
  public wallClockTime?: string;
  public presentationTime?: string;

  constructor(initialValues?: Partial<ProducerReferenceTime>) {
    super({name: 'ProducerReferenceTime', ...initialValues});
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
