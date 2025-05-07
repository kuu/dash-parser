import type {ParsedObject} from './types';
import {Element} from './Element';

export class EventStream extends Element {
  static override readonly ALLOWED_CHILDREN = [
    ...(super.ALLOWED_CHILDREN ?? []),
    'Event',
  ];

  public xlinkHref?: string;
  public xlinkActuate?: 'onLoad' | 'onRequest';
  public schemeIdUri?: string;
  public value?: string;
  public timescale?: number;
  public presentationTimeOffset?: number;

  constructor(initialValues?: Partial<EventStream>, ctx?: ParsedObject) {
    super({name: 'EventStream', ...initialValues}, ctx);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    if (!initialValues) {
      return;
    }

    const {
      schemeIdUri,
      value,
    } = initialValues;

    if (typeof initialValues['xlink:href'] === 'string') {
      initialValues.xlinkHref = initialValues['xlink:href'];
      delete initialValues['xlink:href'];
    }
    if (typeof initialValues['xlink:actuate'] === 'string') {
      initialValues.xlinkActuate = initialValues['xlink:actuate'];
      delete initialValues['xlink:actuate'];
    }
    if (typeof schemeIdUri === 'string') {
      initialValues.schemeIdUri = schemeIdUri;
    }
    if (typeof value === 'number') {
      initialValues.value = Number(value).toString(10);
    }
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    if (this.xlinkActuate && !this.xlinkHref) {
      this.reject('@xlink:actuate shall not be present if the @xlink:href attribute is not present');
    }
    if (typeof this.schemeIdUri !== 'string') {
      this.reject('schemeIdUri is required');
    }
    if (typeof this.timescale === 'number' && !Number.isInteger(this.timescale)) {
      this.reject('timescale should be an integer');
    }
  }

  override verifyChildren(ctx: ParsedObject): void {
    const events = this.getElements('Event') as Event[];
    if (!events.every((event, i, array) => i === 0 || (event.presentationTime ?? 0) >= (array[i - 1].presentationTime ?? 0))) {
      this.reject('Events in Event Streams shall be ordered such that their presentation time is non-decreasing');
    }
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.xlinkHref === 'string') {
      obj['xlink:href'] = this.xlinkHref;
    }
    if (typeof this.xlinkActuate === 'string') {
      obj['xlink:actuate'] = this.xlinkActuate;
    }
    if (typeof this.schemeIdUri === 'string') {
      obj.schemeIdUri = this.schemeIdUri;
    }
    if (typeof this.value === 'string') {
      obj.value = this.value;
    }
    if (typeof this.timescale === 'number') {
      obj.timescale = this.timescale;
    }
    if (typeof this.presentationTimeOffset === 'number') {
      obj.presentationTimeOffset = this.presentationTimeOffset;
    }
    return obj;
  }
}

export class Event extends Element {
  public presentationTime?: number;
  public duration?: number;
  public id?: number;
  public contentEncoding?: string;
  public messageData?: string;

  constructor(initialValues?: Partial<Event>, ctx?: ParsedObject) {
    super({name: 'Event', ...initialValues}, ctx);
    this.formatParams(initialValues);
    Object.assign(this, initialValues);
  }

  override formatParams(initialValues?: Partial<ParsedObject>, ctx?: ParsedObject): void {
    super.formatParams(initialValues, ctx);
  }

  override verifyAttributes(ctx: ParsedObject): void {
    super.verifyUnsignedInt('id');
  }

  override verifyChildren(ctx: ParsedObject): void {
    // NOP
  }

  override get serializedProps(): ParsedObject {
    const obj = super.serializedProps;
    if (typeof this.presentationTime === 'number') {
      obj.presentationTime = this.presentationTime;
    }
    if (typeof this.duration === 'number') {
      obj.duration = this.duration;
    }
    if (typeof this.id === 'number') {
      obj.id = this.id;
    }
    if (typeof this.contentEncoding === 'string') {
      obj.contentEncoding = this.contentEncoding;
    }
    if (typeof this.messageData === 'string') {
      obj.messageData = this.messageData;
    }
    return obj;
  }
}
