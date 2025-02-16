import type {ParsedObject} from './types';
import {Element} from './Element';

export class Resync extends Element {
  public type?: string;
  public dT?: number;
  public dImax?: number;
  public dImin?: number;
  public marker?: boolean;

  constructor(initialValues?: Partial<Resync>) {
    super({name: 'Resync', ...initialValues});
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
