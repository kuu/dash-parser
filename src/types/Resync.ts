import type {ParsedObject} from './types';
import {Element} from './Element';

export class Resync extends Element {
  public type?: string;
  public dT?: number;
  public dImax?: number;
  public dImin?: number;
  public marker?: boolean;

  constructor(initialValues?: Partial<Resync>, ctx?: ParsedObject) {
    super({name: 'Resync', ...initialValues}, ctx);
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
