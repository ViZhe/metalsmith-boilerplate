
import $ from 'jquery'


class Form {
  constructor(el, options) {
    console.log('constructor')
    console.log(options)
    this.el = el

    this.options = {
      target: '.js-form',
      classSuccessBlock: 'b-form-success',
      classFieldError: 'b-form__field_error',
      classElemError: 'b-form__error',
      showErrors: true,
      ...options
    }

    this.initEvents()
  }
  initEvents() {
    console.log('initEvents')

    this.el.on('submit', '.js-form', $.proxy(this.submitForm, this))
  }
  submitForm(e) {
    console.log('submitForm')

    e.preventDefault()
    const $thisFrom = $(e.target)

    $.ajax({
      url: '',
      data: $thisFrom.serialize()
    }).done(data => {
      console.log(data)
      if (this.options.showErrors) {
        $(`.${this.options.classElemError}`).remove()
      }
      $(`.${this.options.classFieldError}`).removeClass(this.options.classFieldError)

      if (data.status === 500) {
        $.each(data.errors, (key, value) => {
          $thisFrom
            .find(`[name=${key}]`)
            .addClass(this.options.classFieldError)
            .before(
              this.options.showErrors
                ? `<span class="${this.options.classElemError}">${value}</span>`
                : ''
            )
        })
      } else if (data.status === 200) {
        $thisFrom
        .before(`<div class="${this.options.classSuccessBlock}">
          <div class="${this.options.classSuccessBlock}__title">Спасибо!</div>
            <p>${data.message}</p>
          </div>`)
        .remove()
      }
    })
  }
}

function form(options) {
  return new Form(this, options)
}

$.fn.form = form
