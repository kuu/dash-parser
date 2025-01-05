import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationSet extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationSet>) {
    super('InitializationSet');
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
