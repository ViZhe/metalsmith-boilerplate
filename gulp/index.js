
import gulp from 'gulp'

import config from './config'
import Clean from './tasks/clean'
import Images from './tasks/images'
import Metalsmith from './tasks/metalsmith'
import Scripts from './tasks/scripts'
import Server from './tasks/server'
import Styles from './tasks/styles'


gulp.task('clean', Clean.delete)
gulp.task('images:build', Images.build)
gulp.task('metalsmith:build', Metalsmith.build)
gulp.task('scripts:build', Scripts.build)
gulp.task('scripts:lint', Scripts.lint)
gulp.task('server', Server.run)
gulp.task('styles:build', Styles.build)
gulp.task('styles:lint', Styles.lint)


gulp.task('build', gulp.series([
  'clean',
  'images:build',
  'styles:lint', 'styles:build',
  'scripts:lint', 'scripts:build',
  'metalsmith:build'
]))

gulp.task('watch', () => {
  gulp.watch(config.scripts.watch, gulp.series('scripts:build'))
  gulp.watch(config.styles.watch, gulp.series('styles:build'))
  gulp.watch(config.metalsmith.watch, gulp.series('metalsmith:build'))
  gulp.watch(config.images.watch, gulp.series('images:build'))
})

gulp.task('default',
  gulp.series([
    'build',
    gulp.parallel(['watch', 'server'])
  ]
))
