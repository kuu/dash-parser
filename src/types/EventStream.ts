import type {ParsedObject} from './types';
import {Element} from './Element';

export class EventStream extends Element {
  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';

  constructor(initialValues?: Partial<EventStream>) {
    super({name: 'EventStream', ...initialValues});
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
