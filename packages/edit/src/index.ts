import baseManifest from '@tailor-cms/ce-quill-html-manifest';
import type { ElementManifest } from '@tailor-cms/ce-quill-html-manifest';

import Edit from './components/Edit.vue';
import TopToolbar from './components/TopToolbar.vue';

const manifest: ElementManifest = {
  ...baseManifest,
  Edit,
  TopToolbar,
};

export default manifest;
export { Edit, TopToolbar };
