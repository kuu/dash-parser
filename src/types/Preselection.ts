import type {ParsedObject} from './types';
import {Element} from './Element';

export class Preselection extends Element {
  public id?: string;
  public lang?: string;

  constructor(initialValues?: Partial<Preselection>) {
    super({name: 'Preselection', ...initialValues});
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
