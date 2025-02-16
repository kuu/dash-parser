import type {ParsedObject} from './types';
import {Element} from './Element';

export class InitializationSet extends Element {
  public id?: number;
  public sourceURL?: string;

  constructor(initialValues?: Partial<InitializationSet>) {
    super({name: 'InitializationSet', ...initialValues});
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
