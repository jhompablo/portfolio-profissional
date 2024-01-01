let manyText = ['Programador JR','Dev. Front end','Analista de sistemas','Analista de suporte']
let title = document.querySelector('.home-content .text-animate h3')
let isValidForm = true
let delay = 200
let secDelay = 100
let newTextDelay = 2000
let charIndex = 0
let index = 0

/** evento p/ escrever texto **/
const animeText01 = () => {
   if(charIndex < manyText[index].length){
        title.textContent += manyText[index].charAt(charIndex)
        charIndex++
        setTimeout(animeText01, delay)
   }else{
        setTimeout(animeText02, newTextDelay)
   }    
}

const animeText02 = () => {
    if(charIndex > 0){
        title.textContent = manyText[index].substring(0, charIndex-1)
        charIndex--
        setTimeout(animeText02, secDelay);
    }else{
        index++
        if(index >= manyText.length){
            index = 0
        }
        setTimeout(animeText01, delay + 1000)
    }
}


const menu = () => {
    let menuIcon = document.querySelector('#menu-icon')
    let navbar = document.querySelector('.navbar')

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x')
        navbar.classList.toggle('active')
    })
}



/** efeito do menu - active **/
const scrollAnimate = () => {
    let header = document.querySelector('header')
    
    header.classList.toggle('active-effect', window.scrollY > 80)
    header.classList.toggle('sticky', window.scrollY > 80)
}

const menuChange = () => {
    let section = document.querySelectorAll('section')
    let link = document.querySelectorAll('header nav a')

    section.forEach(item => {
        let top = item.offsetTop - 80
        let bottom = item.offsetHeight + item.offsetTop
        let id = item.getAttribute('id')

        if (window.scrollY >= top && window.scrollY < bottom) {
            link.forEach(item => {
                item.classList.remove('active')
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active') 
            })
        }
    })
}

/** animação da barra de conhecimento **/
const animeSkillsBar = () => {
    let progressBar = document.querySelectorAll('.progress .bar')
    let top = document.querySelector('.skills').offsetTop - 80
    let bottom = document.querySelector('.skills').offsetHeight + top
    let numValue = document.querySelectorAll('.progress h3 span')
    let number = [90, 80, 90, 70, 60, 80, 65, 80, 70]
    let sum = 0


    if(window.scrollY >= top && window.scrollY < bottom){
        progressBar.forEach((item, n) => {
            numValue[n].textContent = 0
            let bar = item.children[0]
            for(i=0; i<=number[n]; i++){
                sum += i
                bar.setAttribute('style','width:'+sum)
                numValue[n].textContent = sum+'%'
                numValue[n].setAttribute('style','visibility: visible')
                sum = 0
            }
        })
    }else{
        progressBar.forEach((item, n) => {
            let bar = item.children[0]
            bar.setAttribute('style','width:0')
            numValue[n].textContent = 0
        })
    }

}

/** validação de email **/
const validationEmail = () =>{
    const nome = document.querySelector('.nome')
    const email = document.querySelector('.email')
    const assunto = document.querySelector('.assunto')
    const mensagem = document.querySelector('.mensagem')
    const url = document.forms[0].getAttribute('action')
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,3}$/g
   
    
    if(!nome.value.trim()){
       nome.setAttribute('placeholder', 'infome o nome')
       nome.setAttribute('style', 'border: .2rem solid #f00')
       isValidForm = false
    }else{
       nome.setAttribute('style', 'border: .2rem solid #00abf0')
       isValidForm 
    }

    if(!email.value.match(regex) || !regex.test(email.value)){
        email.value = ''
        email.setAttribute('placeholder', 'email incorreto')
        email.setAttribute('style', 'border: .2rem solid #f00') 
        isValidForm = false
    }else{
        email.setAttribute('style', 'border: .2rem solid #00abf0')
        isValidForm 
    }

    if(!assunto.value.trim()){
        assunto.setAttribute('placeholder', 'infome o assunto')
        assunto.setAttribute('style', 'border: .2rem solid #f00')
        isValidForm = false
    }else{
        assunto.setAttribute('style', 'border: .2rem solid #00abf0')
        isValidForm  
     }
}


/** usando api FormSubmit **/
const emailJS = () =>{
    const url = document.forms[0].getAttribute('action')
    const data = new FormData(document.forms[0])
    const retorno = document.querySelector('.retorno')
    const error = 'falha na transmissão'
    const success = 'mensagem enviada com sucesso'
    
    fetch(url, {
        method: document.forms[0].getAttribute('method'),
        body: data,
        headers: {'Accept':'application:json'},
     }).then(response =>{
        response.json() // caso haja necessidade de converter
        response.status === 200 ? retorno.innerHTML = success : retorno.innerHTML = error
    }).catch(error => {
        retorno.innerHTML = 'erro: '+error
    })
}


const contactChange = () =>{
    const scroll = window.scrollY 
    const contactHeight = document.querySelector('.contact') 
    const elem = document.querySelectorAll('input[type=text]')
 
    
    if((scroll+contactHeight.clientHeight) < contactHeight.offsetTop){
        document.querySelector('.nome').setAttribute('placeholder','nome')
        document.querySelector('.email').setAttribute('placeholder','email')
        document.querySelector('.assunto').setAttribute('placeholder','assunto')  
        elem.forEach(item => {
            item.setAttribute('style','border: .2rem solid  #00abf0')
        });

    }
}

/** limpa o campo com placeholder **/
const placeholderInput = () => {
    document.forms[0].reset()
    document.querySelector('.nome').setAttribute('placeholder', 'nome')
    document.querySelector('.email').setAttribute('placeholder', 'email')
    document.querySelector('.assunto').setAttribute('placeholder', 'assunto')
    document.querySelector('.mensagem').setAttribute('placeholder', 'mensagem')
}



window.addEventListener('scroll', () => {scrollAnimate(), menuChange(), animeSkillsBar(), contactChange()})
window.addEventListener('load', () => menu(), animeText01())
 

document.forms[0].addEventListener('submit', ev => {
    const msgRetorno = document.querySelector('.retorno') 
    ev.preventDefault()

    validationEmail()
    console.log(isValidForm)
    if(isValidForm){
        emailJS()
        msgRetorno.setAttribute('style','opacity: 1')
        setTimeout(() => {
            msgRetorno.removeAttribute('style', 'opacity')
            placeholderInput()
        }, 4000);
      }
     isValidForm = true
})
 


