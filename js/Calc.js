


let calcTypes = document.querySelectorAll('.types div')
let calcSection =document.querySelector('.calcinputs')
let section_name = document.querySelector('.section_name1')
let inputs = document.querySelectorAll('.inputs input')
let submit = document.querySelector('#ClaorieCalc')
let result = document.querySelector('.result')


calcTypes.forEach((el)=>{
    el.onclick = function() {
        calcTypes.forEach((el)=>{
            el.classList.remove('current')
        })
        this.classList.add('current')
        calcSection.style.cssText = 'display:none;'
        result.textContent = '0'
        inputs.forEach((el)=>{
            el.value = ''
        })
        section_name.textContent = this.textContent + 'Calculater For Normal Neads'
        document.querySelector('.section_name2').textContent = this.textContent
        document.querySelector('.loading').style.display = 'block'
        setTimeout(()=>{
            document.querySelector('.loading').style.display = 'none'
            calcSection.style.cssText = 'display: flex; flex-direction: column; align-items: center;'
        },1000)
    } 
})




submit.onclick = function(){
    
    let calc = true
    for(let i= 0 ;i < inputs.length ;i++){
        if(inputs[i].value == ''){
            calc = false
            return alert('please enter the values')
        }else if(isNaN(parseInt(inputs[i].value))){
            calc = false
            return alert('please enter the numbers')            
        }
    }
    if(calc){
        let weight = inputs[0].value
        let height = inputs[1].value
        let age = inputs[2].value
        result.innerHTML = 'Calculating...'
        let eq ; 
        let current;
        for(let i = 0 ;i < calcTypes.length ;i++){
            if(calcTypes[i].classList.contains('calorie') && calcTypes[i].classList.contains('current')  ){
                eq = (10 * weight ) + (6.25*height) - (5*age) + 5
                current = ' Calorie'
                break
            }else if(calcTypes[i].classList.contains('protein') && calcTypes[i].classList.contains('current')){
                eq = weight * 1.0
                current = ' g of Protein'
                break
            }else if(calcTypes[i].classList.contains('carb') ){
                eq = weight * 5.5
                current = ' g of Carbs'
                break
            }
    }
    setTimeout(()=>{
        result.innerHTML = eq + current
    },2000)
    }
}