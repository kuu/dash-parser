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
    super('ProducerReferenceTime');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
