import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

export class AudioChannelConfiguration extends Descriptor {
  constructor(initialValues?: Partial<AudioChannelConfiguration>, ctx?: ParsedObject) {
    super({name: 'AudioChannelConfiguration', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyAttributes(ctx);
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    return super.serializedProps;
  }
}
