import type {ParsedObject} from './types';
import {Element} from './Element';

export class Subset extends Element {
  public contains?: string;
  public id?: string;

  constructor(initialValues?: Partial<Subset>) {
    super('Subset');
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
