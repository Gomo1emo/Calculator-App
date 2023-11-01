class Calculator {
    constructor(previousViewTextElement, currentViewTextElement) {
        this.previousViewTextElement = previousViewTextElement
        this.currentViewTextElement = currentViewTextElement
        this.clear()
    }

    clear() {
        this.currentView = ''
        this.previousView = ''
        this.operation = undefined
    }

    delete() {
        this.currentView = this.currentView.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentView.includes('.')) return 
        this.currentView = this.currentView.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentView === '') return
        if (this.previousView !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousView = this.currentView
        this.currentView = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousView)
        const current = parseFloat(this.currentView)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentView = computation
        this.operation = undefined
        this.previousView = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentViewTextElement.innerText = this.getDisplayNumber(this.currentView) 
         if (this.operation != null) {
            this.previousViewTextElement.innerText = `${this.getDisplayNumber(this.previousView)} ${this.operation}`
         }else {
            this.previousViewTextElement.innerText = ''
         }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousViewTextElement = document.querySelector('[data-previous-view]')
const currentViewTextElement = document.querySelector('[data-current-view]')

const calculator = new Calculator(previousViewTextElement, currentViewTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', buuton => {
    calculator.delete()
    calculator.updateDisplay()
})