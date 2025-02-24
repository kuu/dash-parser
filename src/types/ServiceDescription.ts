import type {ParsedObject} from './types';
import {Element} from './Element';

export class ServiceDescription extends Element {
  public lang?: string;
  public value?: string;

  constructor(initialValues?: Partial<ServiceDescription>) {
    super({name: 'ServiceDescription', ...initialValues});
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
