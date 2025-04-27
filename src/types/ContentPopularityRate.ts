import type {ParsedObject} from './types';
import {Element} from './Element';

export class ContentPopularityRate extends Element {
  public source?: string;
  public sourceDescription?: string;

  constructor(initialValues?: Partial<ContentPopularityRate>, ctx?: ParsedObject) {
    super({name: 'ContentPopularityRate', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
