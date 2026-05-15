import * as types from './types';
import type {
  ParsedObject,
  Context,
  Element,
  BaseURL,
} from './types';
import {print} from './utils';
import {fromXML} from './xml';

type Factory = {new (obj: ParsedObject, ctx: ParsedObject): Element};

export function parse(text: string): Element | undefined {
  const obj = fromXML(text);
  if (!obj) {
    return undefined;
  }
  return parseElement(undefined, obj, {mpdType: undefined, baseUrls: [], prefixes: {}});
}

function parseElement(element: Element | undefined, obj: ParsedObject | undefined, ctx: Context): Element | undefined {
  if (element) {
    element.verifyAttributes(ctx);
  }

  if (!obj) {
    if (element) {
      element.verifyChildren(ctx);
    }
    return element;
  }

  if (typeof obj === 'string') {
    if (element) {
      element.textContent = obj;
      element.verifyChildren(ctx);
    }
    return element;
  }

  const originalContext = cloneContext(ctx);
  for (const key of Object.keys(obj)) {
    if (key === '@') {
      continue;
    }

    if (key === '#text' && element) {
      element.textContent = obj[key] as string;
    }

    const type = getType(key, ctx);
    if (!type) {
      print(`Unknown element: ${key}`);
      continue;
    }
    const o = obj[key] as ParsedObject | ParsedObject[];
    const children = Array.isArray(o) ? o : [o];
    for (const child of children) {
      const elem = new type(child['@'] as ParsedObject, ctx);
      if (element) {
        element.addElement(elem);
      } else {
        element = elem;
      }
      if (elem.name === 'BaseURL') {
        ctx.baseUrls.push(elem as BaseURL);
      }
      parseElement(elem, child as ParsedObject, ctx);
    }
  }
  if (element) {
    element.verifyChildren(ctx);
  }
  Object.assign(ctx, originalContext); // Restore the context
  return element;
}

function cloneContext(ctx: Context): Context {
  return {
    mpdType: ctx.mpdType,
    baseUrls: [...ctx.baseUrls],
    prefixes: {...ctx.prefixes},
  };
}

function getType(key: string, ctx: Context): Factory | undefined {
  if (key.includes(':')) {
    const [prefix, name] = key.split(':');
    const ns = ctx.prefixes[prefix];
    return ns ? types[ns.importPath][name] as Factory : undefined;
  }
  return types[key] as Factory;
}
