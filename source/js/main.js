
import $ from 'jquery'

import scrollToTop from './plugins/scrollToTop'
import './plugins/form'
import './plugins/lightGallery'
import './plugins/lightGalleryHash'
import './plugins/lightGalleryVideo'


scrollToTop()

$('body').lightGallery({
  selector: '.js-light-gallery'
})

$('body').form()

// $(document).ready(() => {
// })

// $('*').on('click', () => {
// })
