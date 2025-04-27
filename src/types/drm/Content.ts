import type {ParsedObject} from '../types';
import {Element} from './Element';

export class Content extends Element {
  constructor(initialValues?: Partial<Content>, ctx?: ParsedObject) {
    super({name: 'drm:Content', ...initialValues}, ctx);
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
