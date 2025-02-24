import { Module } from 'quill';

import ImageEmbedTooltip from '../ui/image-embed-tooltip';

export default class ImageEmbed extends Module {
  static NAME = 'imageEmbed';

  constructor(quill: any, options = {}) {
    super(quill, options);
    const { bounds } = quill.options;
    quill.tooltips = quill.tooltips || {};
    quill.tooltips.imageEmbed = new ImageEmbedTooltip(quill, bounds, options);
  }
}
