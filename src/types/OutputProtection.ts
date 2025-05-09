import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class OutputProtection extends Descriptor {
  constructor(initialValues?: Partial<OutputProtection>) {
    super({name: 'OutputProtection', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
