import type {ParsedObject} from './types';
import {Element} from './Element';

export class ProgramInformation extends Element {
  public title?: string;
  public source?: string;
  public lang?: string;

  constructor(initialValues?: Partial<ProgramInformation>) {
    super({name: 'ProgramInformation', ...initialValues});
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
