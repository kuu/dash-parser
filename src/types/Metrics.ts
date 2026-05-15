import type {ParsedObject} from './types';
import {Element} from './Element';

export class Metrics extends Element {
  public metrics?: string;

  constructor(initialValues?: Partial<Metrics>, ctx?: ParsedObject) {
    super({name: 'Metrics', ...initialValues}, ctx);
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
