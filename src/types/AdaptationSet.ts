import type {ParsedObject} from './types';
import {Element} from './Element';

export class AdaptationSet extends Element {
  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad" | "onRequest';

  constructor(initialValues?: Partial<AdaptationSet>) {
    super('AdaptationSet');
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
