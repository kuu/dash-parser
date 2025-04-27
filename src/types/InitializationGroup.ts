import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationGroup extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationGroup>, ctx?: ParsedObject) {
    super({name: 'InitializationGroup', ...initialValues}, ctx);
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
