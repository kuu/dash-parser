import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationGroup extends Element {
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationGroup>) {
    super({name: 'InitializationGroup', ...initialValues});
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
