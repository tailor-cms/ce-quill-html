import type { HookMap, ServerModule } from '@tailor-cms/cek-common';
import { initState, type } from '@tailor-cms/ce-quill-html-manifest';
import type { Element } from '@tailor-cms/ce-quill-html-manifest';

export const hookMap: HookMap<Element> = new Map();

const serverModule: ServerModule<Element> = {
  type,
  initState,
  hookMap,
};

export default serverModule;
export { type, initState };
