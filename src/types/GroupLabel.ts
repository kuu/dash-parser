import type {ParsedObject} from './types';
import {Element} from './Element';

export class GroupLabel extends Element {
  public id?: string;
  public lang?: string;

  constructor(initialValues?: Partial<GroupLabel>) {
    super('GroupLabel');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

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
