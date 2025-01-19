import type {ParsedObject} from './types';
import {DescriptorType} from './DescriptorType';

export class FramePacking extends DescriptorType {
  constructor(initialValues?: Partial<FramePacking>) {
    super('FramePacking');
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
