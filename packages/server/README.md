# @tailor-cms/ce-quill-html-server

Server-side module for the **Quill HTML** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Provides the server half of the element: state initialisation, lifecycle hooks and any AI configuration, registered by the Tailor server runtime.

## Installation

```sh
npm install @tailor-cms/ce-quill-html-server
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import serverModule from '@tailor-cms/ce-quill-html-server';
```

## Element

| Property | Value |
| --- | --- |
| Name | Quill HTML |
| Type | `HTML` |
| Icon | [`mdi-text-box-outline`](https://pictogrammers.com/library/mdi/) |
| Composite | No |

## Packages

This element ships as four packages, published together from the
[`ce-quill-html`](https://github.com/tailor-cms/ce-quill-html) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-quill-html-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-quill-html-manifest) | Shared element definition |
| [`@tailor-cms/ce-quill-html-edit`](https://www.npmjs.com/package/@tailor-cms/ce-quill-html-edit) | Authoring component |
| [`@tailor-cms/ce-quill-html-display`](https://www.npmjs.com/package/@tailor-cms/ce-quill-html-display) | End-user component |
| [`@tailor-cms/ce-quill-html-server`](https://www.npmjs.com/package/@tailor-cms/ce-quill-html-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
