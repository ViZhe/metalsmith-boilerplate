
import yargs from 'yargs'

import packageJson from '../package.json'


const headerCat = `
/*!
 * @author ${packageJson.author.name}
 * @version ${packageJson.version}
 *
 *                  $$____________$$
 *                  $___$________$___$
 *                  $_____$$$$$$_____$
 *                 $_____sss___sss____$
 *                $______ii_____ii_____$
 *                 $_______$$$________$
 *     $$$$$$$$     $_______$________$
 *   $$________$       $$_________$$
 *    $_________$     $___$$$$$___$
 *       $______$    $__$________$__$
 *       $_____$    $__$__________$__$
 *      $____$   $$$$__$___hope___$__$$$$
 *     $___$    $____$__$________$___$___$
 *     $__$     $____$__$________$__$____$
 *    $___$      $____$__$____$_$__$____$
 *      $__$      $____$___$_$_____$___$
 *       $___$$$$$_$___$___$_$____$___$
 *          $$$$$_$____$____$_____$____$
 *                $$$_$_____$______$_$$$
 *                     $$$$___$$$$$
 */
`

const path = {
  root: `${__dirname}/../`,
  src: 'source/',
  dest: 'app/'
}

const config = {
  isProd: yargs.boolean('prod').argv.prod,
  root: path.root,
  src: path.src,
  dest: path.dest,
  headerCat,
  metalsmith: {
    watch: [
      'pages/',
      `${path.src}includes/**/*`,
      `${path.src}layouts/**/*`
    ],
    clean: false,
    source: 'pages/',
    destination: path.dest,
    metadata: {
      BASEURL: ''
    },
    collections: {
      articles: {
        pattern: 'articles/*.md',
        sortBy: 'title',
        reverse: true
      },
      faq: {
        pattern: '_faq/*.md',
        sortBy: 'title',
        reverse: true
      }
    },
    ignore: '_**/*',
    markdown: {
      html: true,
      linkify: true,
      typographer: true
    },
    permalinks: {
      pattern: ':permalink'
    },
    inPlace: {
      engine: 'ejs'
    },
    layouts: {
      engine: 'ejs',
      directory: 'source/layouts/',
      default: 'default.ejs',
      pattern: '**/*.{html, ejs}',
      rename: true
    },
    assets: {
      source: 'source/statics/',
      destination: './'
    }
  },
  styles: {
    src: {
      main: `${path.src}assets/css/main.styl`,
      all: `${path.src}assets/css/**/*.styl`
    },
    dest: `${path.dest}assets/css/`,
    watch: [
      `${path.src}assets/css/**/*.styl`
    ],
    base64: {
      baseDir: 'app/assets/css/',
      extensions: ['png', 'svg', 'jpg'],
      maxImageSize: 1024 * 10
    },
    cssUrlAdjuster: {
      prepend: '../img/',
      append: `?v=${packageJson.version}`
    },
    autoprefixer: {
      browser: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
    }
  },
  fonts: {
    base64: {
      extensions: ['woff'],
      maxImageSize: 1024 * 1024 * 10
    }
  },
  images: {
    src: `${path.src}assets/img/**/*`,
    dest: `${path.dest}assets/img/`,
    watch: `${path.src}assets/img/**/*`
  },
  scripts: {
    src: {
      main: `${path.src}assets/js/main.js`,
      all: `${path.src}assets/js/**/*.js`
    },
    dest: `${path.dest}assets/js/`,
    watch: `${path.src}assets/js/**/*.js`
  }
}

export default config
