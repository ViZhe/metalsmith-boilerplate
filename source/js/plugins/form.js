
import $ from 'jquery'


class Form {
  constructor(el, options) {
    this.el = el
    this.sending = false
    this.options = {
      target: '',
      classSuccessBlock: 'b-form-success',
      classFieldError: 'is-error',
      classElemError: 'b-form__error',
      showErrors: false,
      ...options
    }

    this.initEvents()
  }
  initEvents() {
    this.el.on('submit', this.options.target, $.proxy(this.submitForm, this))
  }
  submitForm(e) {
    e.preventDefault()

    if (this.sending) {
      return
    }

    this.sending = true
    const $thisForm = $(e.target)

    $.ajax({
      method: 'post',
      url: '',
      data: $thisForm.serialize()
    }).done((data) => {
      this.sending = false

      if (this.options.showErrors) {
        $(`.${this.options.classElemError}`).remove()
      }
      $(`.${this.options.classFieldError}`).removeClass(this.options.classFieldError)

      if (data.status === 400 && data.errors) {
        if (data.error) {
          console.error(data)
        }
        if (data.errors) {
          $.each(data.errors, (key, value) => {
            const $field = $thisForm.find(`[name=${key}]`)
            $field.addClass(this.options.classFieldError)

            if (this.options.showErrors) {
              $field.before(`<span class="${this.options.classElemError}">${value}</span>`)
            }
          })
        }
      } else if (data.status === 200) {
        $thisForm
        .before(`<div class="${this.options.classSuccessBlock}">
          <div class="${this.options.classSuccessBlock}__title">Спасибо!</div>
            <p>Форма успешно отправлена.</p>
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
