


//on scroll logic
function animate_on_scroll(animation_element,RM,TD,infinte){
    const options = {
        rootMargin: RM,
        threshold:TD,
    }
    let observer_up = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('animate-js')
            }
            else if (infinte  == true && entry.isIntersecting == false){
                entry.target.classList.remove('animate-js')
            }
        })
    },options)
    const observed = document.querySelectorAll(animation_element)
    observed.forEach((e)=>observer_up.observe(e))    
}
animate_on_scroll('.products-ul li' ,'-45% 0px ',.1,true)
animate_on_scroll('#ba-1','0px' , 0,false)
animate_on_scroll('#ba-2','0px' , 0,false)
animate_on_scroll('.reason','0px' , 0,false)
animate_on_scroll('.hero','0px' , 0 ,true)



// nav logic

// nav animation logic && scroll to top logic
    const nav = document.querySelector('#header')
    const scroll_to_top  = document.querySelector('.scroll_to_top')
    scroll_to_top.onclick = function(){
        scroll({
            top: '100px',
            left:'100px',
            behavior:'smooth'
        })
    }
    window.onscroll = function(e){
        if(scrollY >= 80 && scrollY <= 900){
            nav.style.cssText = ' opacity:0; translate:0px -200px;'
        } else if (scrollY >= 900){
            nav.style.cssText = ' opacity:1; translate:0px 0px;'
        }else if(scrollY <= 80){
            nav.style.cssText = '  translate: 0px 0px; opacity:1; transition:0s;'
        } 
        if(scrollY >= 400){
            scroll_to_top.style.cssText = 'opacity:1;'
        }else{
            scroll_to_top.style.cssText = 'opacity:0;'
        }
    }
//burger menu logic 



const burger_icon = document.querySelector('.burger-icon')
const burger_icon_menu = document.querySelector('.burger-icon-menu') 
const close_burger_menu = document.querySelector('.delete')


burger_icon.onclick = function(){
    burger_icon_menu.classList.add('show')
    close_burger_menu.onclick = function(){
        burger_icon_menu.classList.remove('show')
    }
}


// clicking outside the menu


window.addEventListener('click' ,(e)=>{
    if(e.target.parentElement == burger_icon || e.target == burger_icon_menu){
        burger_icon_menu.classList.add('show')
    }else{
        burger_icon_menu.classList.remove('show')
    }
})


// incase window has chaged


window.onresize = function(){
    if(window.innerWidth >799){
        burger_icon_menu.classList.remove('show')
    }
}


// products 





