import {Element as MpdElement} from '../Element';

export abstract class Element extends MpdElement {
  public override get NAMESPACE(): string {
    return 'urn:mpeg:dash:schema:mpd:2011';
  }
}
