
import gulp from 'gulp'
import eslint from 'gulp-eslint'
import webpack from 'gulp-webpack'

import config from '../config'


class Scripts {
  static build() {
    const webpackPlugins = [
      new webpack.webpack.optimize.CommonsChunkPlugin('jquery', 'jquery.js')
    ]
    if (config.isProd) {
      webpackPlugins.push(
        new webpack.webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      )
    }

    return gulp.src(config.scripts.src.main)
    .pipe(webpack({
      entry: {
        main: [
          './source/assets/js/main.js'
        ],
        jquery: [
          'jquery'
        ]
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
      plugins: webpackPlugins,
      output: {
        filename: '[name].js'
      }
    }))
    .pipe(gulp.dest(config.scripts.dest))
  }
  static lint() {
    return gulp.src(config.scripts.src.all)
      .pipe(eslint())
      .pipe(eslint.format())
  }
}


export default Scripts
