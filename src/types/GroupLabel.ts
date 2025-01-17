import type {ParsedObject} from './types';
import {LabelType} from './LabelType';

export class GroupLabel extends LabelType {
  constructor(initialValues?: Partial<GroupLabel>) {
    super('GroupLabel');
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
  }

  override verifyAttributes(): void {
    super.verifyAttributes();
  }

  override verifyChildren(): void {
    super.verifyChildren();
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
