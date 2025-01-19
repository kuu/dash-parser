import type {ParsedObject} from './types';
import {Element} from './Element';

export class LabelType extends Element {
  public id?: string;
  public lang?: string;

  override formatParams(initialValues?: Partial<LabelType>): void {
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
