import type {ParsedObject, Range} from './types';
import {Element} from './Element';

export class ProgramInformation extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'Title',
    'Source',
    'Copyright',
  ];

  static override readonly CHILDRREN_SPEC: Record<string, Range> = {
    Title: [0, 1],
    Source: [0, 1],
    Copyright: [0, 1],
  };

  public lang?: string;
  public moreInformationURL?: string;

  constructor(initialValues?: Partial<ProgramInformation>, ctx?: ParsedObject) {
    super({name: 'ProgramInformation', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    this.verifyChidrenSpec(this.static.CHILDRREN_SPEC);
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.lang === 'string') {
      obj.lang = this.lang;
    }
    if (typeof this.moreInformationURL === 'string') {
      obj.moreInformationURL = this.moreInformationURL;
    }
    return obj;
  }
}

export class Title extends Element {
  // Title specifies the title for the Media Presentation.
  constructor(initialValues?: Partial<ProgramInformation>, ctx?: ParsedObject) {
    super({name: 'Title', ...initialValues}, ctx);
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

export class Source extends Element {
  constructor(initialValues?: Partial<ProgramInformation>, ctx?: ParsedObject) {
    super({name: 'Source', ...initialValues}, ctx);
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

export class Copyright extends Element {
  constructor(initialValues?: Partial<ProgramInformation>, ctx?: ParsedObject) {
    super({name: 'Copyright', ...initialValues}, ctx);
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
