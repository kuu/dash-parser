import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationSet extends Element {
  public id?: number;
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationSet>, ctx?: ParsedObject) {
    super({name: 'InitializationSet', ...initialValues}, ctx);
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
