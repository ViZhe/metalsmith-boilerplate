
import metalsmith from 'metalsmith'
import assets from 'metalsmith-assets'
import collections from 'metalsmith-collections'
import htmlMinifier from 'metalsmith-html-minifier'
import ignore from 'metalsmith-ignore'
import inPlace from 'metalsmith-in-place'
import layouts from 'metalsmith-layouts'
import markdown from 'metalsmith-markdownit'
import markdownAttr from 'markdown-it-attrs'
import paths from 'metalsmith-paths'
import permalinks from 'metalsmith-permalinks'

import config from '../config'


class Metalsmith {
  static build(callback) {
    return metalsmith(config.root)
      .clean(config.metalsmith.clean)
      .source(config.metalsmith.source)
      .destination(config.metalsmith.destination)
      .metadata(config.metalsmith.metadata)
      .use(paths())
      .use(collections(config.metalsmith.collections))
      .use(ignore(config.metalsmith.ignore))
      .use(markdown(config.metalsmith.markdown).use(markdownAttr))
      .use(permalinks(config.metalsmith.permalinks))
      .use(inPlace(config.metalsmith.inPlace))
      .use(layouts(config.metalsmith.layouts))
      .use(htmlMinifier())
      .use(assets(config.metalsmith.assets))
      .build(error => {
        if (error) {
          console.log(error)
        }
        callback()
      })
  }
}


export default Metalsmith
