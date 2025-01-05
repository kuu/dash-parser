import type {ParsedObject} from './types';
import {Element} from './Element';

export class Location extends Element {
  public url?: string;

  constructor(initialValues?: Partial<Location>) {
    super('Location');
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
