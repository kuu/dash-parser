import type {ParsedObject} from './types';
import {Element} from './Element';

export class EmptyAdaptationSet extends Element {
  constructor(initialValues?: Partial<EmptyAdaptationSet>) {
    super({name: 'EmptyAdaptationSet', ...initialValues});
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
