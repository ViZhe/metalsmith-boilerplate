
const scrollToTop = (config) => {
  const options = {
    selector: '.js-scroll-top',
    class: 'm-scroll-top_show',
    ...config
  }

  const selector = $(options.selector)

  $(window).on('scroll', () => {
    const scrollTop = $(document).scrollTop()
    if (scrollTop > 100) {
      selector.addClass(options.class)
    } else {
      selector.removeClass(options.class)
    }
  })

  selector.on('click', () => {
    $('body, html').animate({
      scrollTop: 0
    }, 700)
  })
}


export default scrollToTop
