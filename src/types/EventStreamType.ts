import type {ParsedObject} from './types';
import {Element} from './Element';

export class EventStreamType extends Element {
  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    // NOP
  }

  override verifyAttributes(): void {
    // NOP
  }

  override verifyChildren(): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return {};
  }
}
