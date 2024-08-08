function pagintion_Handle(pagination,data){
    let count = 0
    const load_more = document.querySelector('.pagination')
    pagination.addEventListener('click',function(el){
            if(load_products()){
                load_more.textContent = 'Loading...'
                setTimeout(function(){
                    load_more.textContent = 'Load More'
                    let generator = load_products(data)
                    for(let i =0 ;i < count;i++){
                        generator.next().value
                    }
                    add_Product_To_Page(generator)
                    count+=4
                    products = document.querySelectorAll('.products ul li')
                    Handle_Clicked_Product()
                    animate_on_scroll('.products-ul li' ,'-250px 0px',.1,true)
                },1000)
            }else{
                load_more.textContent = 'No More Products'
            }
        })
}
function* load_products(data){
    for(let i = 0 ; i < data.length;i++ ){
        yield data[i]
    }
}
function create_li(product_details){
    //load img-contenar div information
    let li = document.createElement('li')
    let img_contenar = document.createElement('div')
    img_contenar.classList.add('img-contenar')
    let img = document.createElement('img')
    img.src = product_details.image
    img_contenar.appendChild(img)
    //load about-product div information
    let about_product = document.createElement('div')
    about_product.classList.add('about-product')
    let h5 = document.createElement('h5')
    let p  = document.createElement('p')
    p.textContent = 'adidas'
    h5.textContent = product_details.title
    about_product.appendChild(p)
    about_product.appendChild(h5)


    let rating = document.createElement('div')
    rating.classList.add('rating')
    let stars =  document.createElement('div')
    stars.classList.add('stars')
    for(let i =0 ;i<5;i++){
        let star = document.createElement('img')
        star.src = './img/star-solid.svg'
        stars.appendChild(star) 
    }
    rating.appendChild(stars)
    
    let cart_price = document.createElement('div')
    cart_price.classList.add('cart-price')
    let h4 = document.createElement('h4')
    h4.textContent = `$${product_details.price}`
    let button = document.createElement('button')
    button.classList.add('cart')
    let cart_img = document.createElement('img')
    cart_img.src = './img/Screenshot (153).png'
    button.appendChild(cart_img)
    cart_price.appendChild(h4)
    cart_price.appendChild(button)
    about_product.appendChild(rating)

    rating.appendChild(cart_price)

    about_product.appendChild(rating)
    li.appendChild(img_contenar)
    li.appendChild(about_product)
    
    
    return li
}
function add_Product_To_Page(generator){
    const products_ul = document.querySelector('.products .products-ul')
    for(let i = 0; i < 4 ;i++){ 
        products_ul.appendChild(create_li(generator.next().value))
    }
}
async function  fetch_data (){
try{
    let data = await fetch('https://fakestoreapi.com/products').then(res=>res.json())
    const pagination = document.querySelector('.pagination')
    pagintion_Handle(pagination,data)
}catch{
    console.log(Error('No Such Data Found'))
}
}
fetch_data()




let products = document.querySelectorAll('.products ul li')



//get the clicked element information



let currentTarget  ; 


function Handle_Clicked_Product(){
    products.forEach(function(e,index){
        e.addEventListener('click',function(e){
            currentTarget = {
                target_name:e.currentTarget.querySelector('.about-product').querySelector('h5').textContent,
                main_img:e.currentTarget.firstElementChild.firstElementChild.src,
                product_imgs:Array.from(document.querySelectorAll('.products ul li'))
                .map((li)=>{
                    if( index+4 > document.querySelectorAll('.products ul li').length -1){
                        index = 0 
                    }
                    return li.firstElementChild.firstElementChild.src
                }).slice(index,index+4),
                price:e.currentTarget.querySelector('.cart-price').querySelector('h4').textContent
            }
            //store the information in localStorage
            localStorage.setItem('current',JSON.stringify(currentTarget))
            //change the location href to the product page
            window.location = './sproduct.html'
        })
    })
    Handle_single_Product_Page()
    galary()
}



//add the information about every selected


function Handle_single_Product_Page(){
    let currentTarget  = localStorage.getItem('current')
    currentTarget = JSON.parse(currentTarget)
        let product_name = document.querySelector('#product-name')
        let main_img = document.querySelector('#main-img')
        let product_imgs = document.querySelectorAll('.other-imges img')
        let price = document.querySelector('#price')
        let number_of_pecies = document.querySelector('#number')
        price.textContent = `$${parseInt(currentTarget.price.slice(1,3)) * parseInt(number_of_pecies.value)}`
        number_of_pecies.oninput = function(){
            if(number_of_pecies.value>=1){
                price.textContent = `$${parseInt(currentTarget.price.slice(1,3)) * parseInt(number_of_pecies.value)}`
            }else{
                price.textContent = `$${0}`
            }
        }
        product_name.textContent = currentTarget.target_name
        main_img.src = currentTarget.main_img
        product_imgs.forEach((img,index)=>img.src = currentTarget.product_imgs[index])
}
Handle_Clicked_Product()
//Make The Galary
function galary(){
    const imgs = document.querySelectorAll('.other-imges img')
    const main_image = document.querySelector('#main-img')
    imgs.forEach((imgs)=>{
        imgs.addEventListener('click',(img)=> {
            main_image.src = img.target.src
        })
    })
}