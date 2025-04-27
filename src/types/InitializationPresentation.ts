import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationPresentation extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationPresentation>, ctx?: ParsedObject) {
    super({name: 'InitializationPresentation', ...initialValues}, ctx);
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
