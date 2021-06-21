import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.value = value
    this.prevValue = value
    this.steps = steps

    this.render(steps)
    this.addEventList()
  }

  render(steps) {
    this.elem = createElement(`
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress" style="width: 0%;"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps">
          ${this.generSpans(steps)}
        </div>
      </div>
    `)

    document.body.append(this.elem)

    this.doStepActive()
  }


  addEventList() {
    this.elem.addEventListener('click', (event) => this.onClick(event))
  }

  onClick(event) {
    this.leftPercents(event)
  }

  leftPercents(event) {
    let el = event.target.closest('div.slider')

    let amountSegments = this.steps - 1
    let clickPositionPx = event.clientX - el.offsetLeft
    let segmentPercent = 100 / amountSegments // процентная величина одного сегмента
    let clickPositionPercent = clickPositionPx / (el.clientWidth / 100) // положение клика в процентах, относительно ширины слайдера

    let numberSegment = clickPositionPercent / segmentPercent
    numberSegment = numberSegment.toFixed()

    this.prevValue = this.value
    this.value = numberSegment

    let leftPercent = numberSegment * segmentPercent
    let thumb = this.sub('thumb')
    let progress = this.sub('progress')

    thumb.style.left = `${leftPercent}%`
    progress.style.width = `${leftPercent}%`

    this.updateValue()
    this.doStepActive()
    this.generCustomEvent()
  }

  doStepActive() {
    let sliderSteps = this.sub('steps')
    let listSpan = sliderSteps.children

    listSpan[this.prevValue].classList.remove('slider__step-active')
    listSpan[this.value].classList.add('slider__step-active')
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`)
  }

  updateValue() {
    let sliderValue = this.sub('value')
    sliderValue.innerHTML = this.value
  }

  generCustomEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
      detail: this.value, // значение 0, 1, 2, 3, 4
      bubbles: true // событие всплывает - это понадобится в дальнейшем
    }))
  }

  generSpans(steps) {
    let spans = ''
    for (let i = 0; i < steps; i++) {
      spans += '<span></span>'
    }
    return spans
  }
}