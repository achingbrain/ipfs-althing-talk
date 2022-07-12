import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'

export default {
  handler: async (args, session) => {
    // Do something with args and return either:
    //  - nothing
    //  - a string
    //  - a promise of a string
    //  - an Iterable of strings (e.g. an Array or other Symbol.iterator)
    //  - an async iterable of strings

    const path = args._[0]

    if (!path) {
      throw new Error('error: md: please specify a path')
    }

    const node = session.fs.getNode(path, session)

    if (!node) {
      throw new Error('error: md: no such file or directory')
    }

    if (node.children) {
      throw new Error('error: md: not a file')
    }

    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeRaw)
      .use(rehypeSanitize)
      .use(rehypeStringify)
      .process(node.content)

    await session.api.print(String(file))
  },
  args: {
    string: [
      0
    ]
  }
}

function parseMarkdown (input) {
  const ast = fromMarkdown(md)
}