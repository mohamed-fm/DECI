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
}
Handle_Clicked_Product()