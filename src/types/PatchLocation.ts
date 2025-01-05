import type {ParsedObject} from './types';
import {Element} from './Element';

export class PatchLocation extends Element {
  public url?: string;

  constructor(initialValues?: Partial<PatchLocation>) {
    super('PatchLocation');
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
