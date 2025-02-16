import type {ParsedObject} from './types';
import {Element} from './Element';

export class ContentPopularityRate extends Element {
  public source?: string;
  public sourceDescription?: string;

  constructor(initialValues?: Partial<ContentPopularityRate>) {
    super({name: 'ContentPopularityRate', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
