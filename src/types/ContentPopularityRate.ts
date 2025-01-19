import type {ParsedObject} from './types';
import {Element} from './Element';

export class ContentPopularityRate extends Element {
  public source?: string;
  public sourceDescription?: string;

  constructor(initialValues?: Partial<ContentPopularityRate>) {
    super('ContentPopularityRate');
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
