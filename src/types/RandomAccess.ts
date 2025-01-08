import type {ParsedObject} from './types';
import {Element} from './Element';

export class RandomAccess extends Element {
  public interval?: number;
  public type?: 'closed"' | 'open' | 'gradual';

  constructor(initialValues?: Partial<RandomAccess>) {
    super('RandomAccess');
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
