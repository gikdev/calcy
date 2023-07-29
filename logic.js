class Calcy {
  constructor (parent) {
    this.calcy = parent
    this.output = parent.querySelector('#output')
    this.valueBtns = parent.querySelectorAll('.btn--value')
    this.btnClear = parent.querySelector('.btn--clear')
    this.btnClearAll = parent.querySelector('.btn--clear-all')
    this.btnCalc = parent.querySelector('.btn--calc')
    this.btnTheme = parent.querySelector('#btn-theme')
    this.svgs = {
      sun: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#26d2b7" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path></svg>',
      moon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#26d2b7" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path></svg>',
    }
  }
  init = () => {
    this.setListeners()
    this.loadThings()
    return this
  }
  setListeners = () => {
    this.valueBtns.forEach(btn => btn.addEventListener('click', this.addFromValue))
    this.btnClear.addEventListener('click', this.clear)
    this.btnClearAll.addEventListener('click', this.clearAll)
    this.btnCalc.addEventListener('click', this.calc)
    this.btnTheme.addEventListener('click', this.toggleTheme)
  }
  calc = () => {
    if (this.output.value === '') { 
      this.showErrMsg(true)
      return
    }
    const convertedString = this.convertStr(this.output.value)
    try { this.output.value = eval(convertedString) }
    catch (e) { this.showErrMsg() }
  }
  showErrMsg = empty => {
    let perviousValue = this.output.value
    if (empty) this.output.value = 'Put something in!'
    if (!empty) this.output.value = 'Error... Try Again'
    setTimeout(() => { this.output.value = perviousValue }, 1000)
  }
  setUI = (classToRemove, classToAdd, whichSvg) => {
    this.calcy.classList.remove(classToRemove)
    this.calcy.classList.add(classToAdd)
    this.btnTheme.innerHTML = this.svgs[whichSvg]
  }
  loadThings = () => {
    if (localStorage.theme == 'dark-theme') {

      this.setUI('light-theme', 'dark-theme', 'sun')

    } else if (localStorage.theme == 'light-theme') {

      this.setUI('dark-theme', 'light-theme', 'moon')

    } else if (!localStorage.theme) {

      localStorage.setItem('theme', 'dark-theme')
      this.loadThings()

    }
  }
  toggleTheme = () => {
    if (localStorage.theme == 'dark-theme') {

      this.setUI('dark-theme', 'light-theme', 'moon')
      localStorage.removeItem('theme')
      localStorage.setItem('theme', 'light-theme')
      
    } else if (localStorage.theme == 'light-theme') {
      
      this.setUI('light-theme', 'dark-theme', 'sun')
      localStorage.removeItem('theme')
      localStorage.setItem('theme', 'dark-theme')

    }
  }
  convertStr = string => string.replace(/÷/g, '/').replace(/×/g, '*').replace(/π/g, '3.14')
  addFromValue = e => this.output.value += e.target.innerText
  clearAll = () => this.output.value = ''
  clear = () => this.output.value = this.output.value.slice(0, -1)
}

const calcy = new Calcy(document.querySelector('.calcy')).init()