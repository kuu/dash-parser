import type {ParsedObject} from '../types';
import {Element} from './Element';

export class License extends Element {
  constructor(initialValues?: Partial<License>, ctx?: ParsedObject) {
    super({name: 'drm:License', ...initialValues}, ctx);
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
