import type {ParsedObject} from './types';
import {Element} from './Element';

export class Preselection extends Element {
  public id?: string;
  public lang?: string;

  constructor(initialValues?: Partial<Preselection>, ctx?: ParsedObject) {
    super({name: 'Preselection', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
