import * as MarkdownIt from 'markdown-it';
import MetadataPlugin from '../lib/metadata';

import * as sample from './fixtures/sample-metadata.md';

describe('@utils/markdown-it-metadata', () => {

  it('# detect metadata and add parsed metadata at tokens', () => {

    let md = MarkdownIt().use(MetadataPlugin);

    let context = {};
    md.parse(sample, context);

    expect(context).toHaveProperty('metadata');
    expect(context['metadata']).toHaveProperty('title');
    expect(context['metadata']).toHaveProperty('created');
    expect(context['metadata']).toHaveProperty('updated');
  });


  it('# detect metadata and will not appear in renderer', () => {
    let md = MarkdownIt().use(MetadataPlugin);

    let context = {};
    let html = md.render(sample, context);

    expect(html).not.toContain('created');
    expect(html).not.toContain('updated');
  });
});