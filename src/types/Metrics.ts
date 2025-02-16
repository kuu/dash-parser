import type {ParsedObject} from './types';
import {Element} from './Element';

export class Metrics extends Element {
  public metrics?: string;

  constructor(initialValues?: Partial<Metrics>) {
    super({name: 'Metrics', ...initialValues});
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
