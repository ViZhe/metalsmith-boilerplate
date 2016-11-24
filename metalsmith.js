
import fs from 'fs'
import Metalsmith from 'metalsmith'
import assets from 'metalsmith-assets'
import beautify from 'metalsmith-beautify'
import browserSync from 'metalsmith-browser-sync'
import collections from 'metalsmith-collections'
import filenames from 'metalsmith-filenames'
import htmlMinifier from 'metalsmith-html-minifier'
import ignore from 'metalsmith-ignore'
import imagemin from 'metalsmith-imagemin/lib/node6'
import inPlace from 'metalsmith-in-place'
import layouts from 'metalsmith-layouts'
import markdown from 'metalsmith-markdownit'
import markdownAttr from 'markdown-it-attrs'
import metadata from 'metalsmith-metadata'
import paths from 'metalsmith-paths'
import permalinks from 'metalsmith-permalinks'
import webpack from 'ms-webpack'
import wp from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import serviceworker from './plugins/metalsmith-serviceworker'


const isProduction = process.env.NODE_ENV === 'production'

const getMetadata = () => {
  const obj = {}
  const files = fs.readdirSync(`${__dirname}/content/data/`)
  for (const name of files) {
    obj[name.replace(/\.[^.]+$/, '')] = `data/${name}`
  }
  return obj
}

const metalsmith = new Metalsmith(__dirname)
  .source('./content/')
  .destination('./build/')
  .metadata({
    BASEURL: '/',
    SITENAME: 'My sitename'
  })
  .use(paths())
  .use(filenames())
  .use(metadata(getMetadata()))
  .use(markdown({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true
  }).use(markdownAttr))
  .use(collections({
    articles: {
      pattern: 'articles/*.html',
      sortBy: 'title',
      reverse: true
    },
    faq: {
      pattern: '_faq/*.html',
      sortBy: 'title',
      reverse: true
    }
  }))
  .use(ignore([
    '_**/*'
  ]))
  .use(webpack({
    context: './source/',
    entry: {
      main: [
        './js/main.js',
        './css/main.styl'
      ],
      jquery: ['jquery']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        },
        {
          test: /\.styl$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css!postcss!group-css-media-queries!stylus'
          )
        },
        {
          test: /\.(svg|gif|png|jpg)$/,
          loader: 'url?limit=30000&name=[name].[hash].[ext]'
        },
        {
          test: /\.(eot|woff|ttf)$/,
          loader: 'url?limit=100000&name=[name].[hash].[ext]'
        }
      ]
    },
    stylus: {
      set: {
        'include css': true,
        'resolve url': true
      }
    },
    postcss: () => ([
      autoprefixer({
        browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
      }),
      cssnano
    ]),
    plugins: [
      new wp.optimize.OccurenceOrderPlugin(),
      new wp.optimize.CommonsChunkPlugin('jquery', '[name].[chunkhash].js'),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new wp.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new wp.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    stats: {
      chunkModules: false
    },
    watch: false,
    cache: false,
    output: {
      path: './build',
      filename: '[name].[chunkhash].js'
    }
  }))
  .use(permalinks({
    relative: false
  }))
  .use(inPlace({
    engine: 'ejs',
    pattern: '**/*.{ejs, html}',
    root: './source/includes',
    rename: true
  }))
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'ejs',
    default: 'default.ejs',
    directory: './source/layouts/',
    root: './source/includes',
    pattern: '**/*.html'
  }))
  .use(beautify({
    indent_char: ' ',
    indent_size: 2
  }))
  .use(assets({
    source: './source/static',
    destination: './'
  }))
  .use(serviceworker())

if (isProduction) {
  metalsmith.use(imagemin({
    gifsicle: {
      interlaced: true
    },
    jpegtran: {
      progressive: true
    },
    optipng: {},
    svgo: {
      plugins: [
        {cleanupIDs: false},
        {removeViewBox: false}
      ]
    }
  }))
  .use(htmlMinifier())
} else {
  metalsmith.use(browserSync({
    server: 'build',
    files: [
      'content/**/*.*',
      'source/**/*.*'
    ],
    open: false,
    notify: false
  }))
}

metalsmith.build((err) => {
  if (err) {
    console.log(err)
  }
})
