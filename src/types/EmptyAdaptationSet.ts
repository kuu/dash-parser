import type {ParsedObject} from './types';
import {Element} from './Element';

export class EmptyAdaptationSet extends Element {
  constructor(initialValues?: Partial<EmptyAdaptationSet>) {
    super('EmptyAdaptationSet');
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
