import * as anchor from 'markdown-it-anchor';
import slugify from '../src/slugify';


import mdInstance from './pure-instance';

const md = mdInstance.use(anchor, {
  slugify
});

describe('@blog/markdown-util:slugify', () => {

  it('# should convert a-b => a-b with id `a-b` correctly', () => {
    const input = `# a-b`;
    const expectOutput = `<h1 id="a-b">a-b</h1>`;
    const output = md.render(input).trim();
    expect(output).toEqual(expectOutput);
  });

  it('# should convert a b => a b with id `a-b` correctly', () => {
    const input = `# a b`;
    const expectOutput = `<h1 id="a-b">a b</h1>`;
    const output = md.render(input).trim();
    expect(output).toEqual(expectOutput);
  });

  it('# should convert chinese characters with id same as input correctly', () => {
    const input = `# 背景`;
    const expectOutput = `<h1 id="背景">背景</h1>`;
    const output = md.render(input).trim();
    expect(output).toEqual(expectOutput);
  });

  it('# should convert chinese characters with spaces in id correctly', () => {
    const input = `# 背 景`;
    const expectOutput = `<h1 id="背-景">背 景</h1>`;
    const output = md.render(input).trim();
    expect(output).toEqual(expectOutput);
  });

});