import type {ParsedObject} from './types';
import {Element} from './Element';

export class Metrics extends Element {
  public metrics?: string;

  constructor(initialValues?: Partial<Metrics>) {
    super('Metrics');
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
