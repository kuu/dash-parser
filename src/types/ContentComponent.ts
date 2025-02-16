import type {ParsedObject} from './types';
import {Element} from './Element';

export class ContentComponent extends Element {
  static override readonly ALLOWED_CHILDREN = [
    'Accessibility',
    'Role',
    'Rating',
    'Viewpoint',
  ];

  public id?: string;
  public lang?: string;
  public contentType?: string;
  public par?: [w: number, h: number];

  constructor(initialValues?: Partial<ContentComponent>) {
    super({name: 'ContentComponent', ...initialValues});
  }

  override formatParams(initialValues?: Partial<ParsedObject>): void {
    if (!initialValues) {
      return;
    }

    const {
      id,
      par,
    } = initialValues;

    if (typeof id === 'number') {
      initialValues.id = `${id}`;
    }
    if (typeof par === 'string') {
      initialValues.par = par.split(':').map(value => Number.parseInt(value, 10)) as [number, number];
    }
  }

  override verifyAttributes(ctx: ParsedObject): void {
    // NOP
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj: ParsedObject = {};
    if (typeof this.id === 'string') {
      obj.id = this.id;
    }
    if (typeof this.lang === 'string') {
      obj.lang = this.lang;
    }
    if (typeof this.contentType === 'string') {
      obj.contentType = this.contentType;
    }
    if (this.par) {
      obj.par = this.par.join(':');
    }
    return obj;
  }
}
