import Quill, { Module } from 'quill';
import Toolbar from 'quill/modules/toolbar';

import ImageEmbedTooltip from '../ui/image-embed-tooltip';

export default class ImageEmbed extends Module {
  static NAME = 'imageEmbed';

  constructor(quill: Quill, options = {}) {
    super(quill, options);
    const { bounds } = quill.options;
    const tooltip = new ImageEmbedTooltip(quill, bounds as any, options);
    const toolbar = quill.getModule('toolbar') as Toolbar;
    toolbar.handlers.image = () => tooltip.show();
  }
}
