import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', (event) => this.onClick(event))
  }

  render() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `)
  }

  onClick() {
    if (event.target.closest('.modal__close')) {
      this.close()
    }
  }

  sub(ref) {
    return this.elem.querySelector(`.modal__${ref}`)
  }

  pressEscInModal(event) {
    if(event.key == 'Escape') {
      console.log(event.key)
      this.close()
    }
  }

  open() {
    document.body.append(this.elem)
    document.body.classList.add('is-modal-open')

    this._pressEscInModal = (event) => this.pressEscInModal(event)
    document.addEventListener('keydown', this._pressEscInModal)
  }

  setTitle(modalTitle) {
    this.sub('title').innerHTML = modalTitle
  }

  setBody(node) {
    this.sub('body').append(node)
  }

  close() {
    document.body.classList.remove('is-modal-open')
    document.removeEventListener('keydown', this._pressEscInModal)
    this.elem.remove()
  }
}