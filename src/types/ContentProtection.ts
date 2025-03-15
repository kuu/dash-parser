import type {ParsedObject} from './types';
import {Descriptor} from './Descriptor';

type CencAttributes = {
  defaultKid?: string;
};

export class ContentProtection extends Descriptor {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'cenc:pssh',
  ];

  public ref?: string;
  public refId?: string;
  public robustness?: string;
  public cenc?: CencAttributes;

  constructor(initialValues?: Partial<ContentProtection>) {
    super({name: 'ContentProtection', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    super.formatParams(initialValues);

    if (!initialValues) {
      return;
    }

    const {
      ref,
      refId,
      robustness,
    } = initialValues;

    if (typeof ref === 'number') {
      initialValues.ref = `${ref}`;
    }
    if (typeof refId === 'number') {
      initialValues.refId = `${refId}`;
    }
    if (typeof robustness === 'number') {
      initialValues.robustness = `${robustness}`;
    }
    if (initialValues['xmlns:cenc'] === 'urn:mpeg:cenc:2013') {
      initialValues.cenc = {
        defaultKid: initialValues['cenc:default_KID'] as string,
      };
      delete initialValues['cenc:default_KID'];
      delete initialValues['xmlns:cenc'];
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (this.ref) {
      if (this.refId) {
        this.reject('@ref shall not be present if the @refId attribute is present');
      }
    } else {
      super.verifyAttributes(ctx);
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    super.verifyChildren(ctx);
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;

    if (typeof this.ref === 'string') {
      obj.ref = this.ref;
    }
    if (typeof this.refId === 'string') {
      obj.refId = this.refId;
    }
    if (typeof this.robustness === 'string') {
      obj.robustness = this.robustness;
    }
    if (this.cenc) {
      obj['cenc:default_KID'] = this.cenc.defaultKid;
      obj['xmlns:cenc'] = 'urn:mpeg:cenc:2013';
    }
    return obj;
  }
}
