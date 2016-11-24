
import sw from './serviceWorker'


export default () => (
  (files, metalsmith, done) => {
    const file = {}
    const filesNameArr = []
    Object.keys(files).forEach((fileName) => {
      filesNameArr.push(`'${fileName.replace(/index\.html$/, '') || '/'}'`)
    })

    let content = sw()
    content = content.replace('__CACHE_NAME_REPLACEMENT__', `'key-${Math.random()}'`)
    content = content.replace('__REQUIRED_FILES_REPLACEMENT__', `[${filesNameArr}]`)

    file.contents = Buffer.from(content)
    file.mode = '0644'
    // eslint-disable-next-line no-param-reassign
    files['serviceWorker.js'] = file

    done()
  }
)
