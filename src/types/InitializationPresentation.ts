import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationPresentation extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationPresentation>) {
    super({name: 'InitializationPresentation', ...initialValues});
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
