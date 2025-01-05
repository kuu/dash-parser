import type {ParsedObject} from './types';
import {Element} from './Element';

export class ProgramInformation extends Element {
  public title?: string;
  public source?: string;
  public lang?: string;

  constructor(initialValues?: Partial<ProgramInformation>) {
    super('ProgramInformation');
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
