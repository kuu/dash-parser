import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationPresentation extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationPresentation>) {
    super('InitializationPresentation');
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
