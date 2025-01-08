import type {ParsedObject} from './types';
import {LabelType} from './LabelType';

export class Label extends LabelType {
  constructor(initialValues?: Partial<Label>) {
    super('Label');
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
