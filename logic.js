class Calcy {
  constructor (parent) {
    this.output = parent.querySelector('#output')
    this.valueBtns = parent.querySelectorAll('.btn--value')
    this.btnClear = parent.querySelector('.btn--clear')
    this.btnClearAll = parent.querySelector('.btn--clear-all')
    this.btnCalc = parent.querySelector('.btn--calc')
  }
  init = () => {
    this.setListeners()
    return this
  }
  setListeners = () => {
    this.valueBtns.forEach(btn => btn.addEventListener('click', this.addFromValue))
    this.btnClear.addEventListener('click', this.clear)
    this.btnClearAll.addEventListener('click', this.clearAll)
    this.btnCalc.addEventListener('click', this.calc)
  }
  calc = () => {
    if (this.output.value === '') { 
      this.errorMessage(true)
      return
    }
    const convertedString = this.output.value.replace(/÷/g, '/').replace(/×/g, '*')
    try { this.output.value = eval(convertedString) }
    catch (e) { this.errorMessage() }
  }
  errorMessage = (empty) => {
    let perviousValue = this.output.value
    if (empty) this.output.value = 'Put something in!'
    if (!empty) this.output.value = 'Error... Try Again'
    setTimeout(() => { this.output.value = perviousValue }, 1000)
  }
  addFromValue = e => this.output.value += e.target.innerText
  clearAll = () => this.output.value = ''
  clear = () => this.output.value = this.output.value.slice(0, -1)
}

const calcy = new Calcy(document.querySelector('.calcy')).init()