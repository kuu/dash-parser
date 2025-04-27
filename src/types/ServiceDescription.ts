import type {ParsedObject} from './types';
import {Element} from './Element';

export class ServiceDescription extends Element {
  public lang?: string;
  public value?: string;

  constructor(initialValues?: Partial<ServiceDescription>, ctx?: ParsedObject) {
    super({name: 'ServiceDescription', ...initialValues}, ctx);
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
