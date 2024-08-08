// global funtion to fetch any data we want

let blog_object_array = []

function create_health_blogs(){
    let blogs = [
        {
            title: 'The Importance of Balanced Nutrition for Overall Health',
            id:-3,
            date: '2022-01-01',
            body: "Balanced nutrition is crucial for maintaining overall health and well-being. It involves consuming a variety of foods in the right proportions to provide the body with essential nutrients. These nutrients include carbohydrates, proteins, fats, vitamins, and minerals, each playing a vital role in bodily functions. Carbohydrates are the body's primary energy source, while proteins are essential for growth, repair, and maintenance of tissues. Fats, though often misunderstood, are vital for energy storage, insulation, and protecting vital organs.Vitamins and minerals, though needed in smaller amounts, are critical for numerous biochemical processes. For example, vitamin C is necessary for collagen production and immune function, while calcium is essential for bone health. A balanced diet helps in maintaining a healthy weight, reducing the risk of chronic diseases such as diabetes, heart disease, and cancer. It also supports mental health, as nutrients like omega-3 fatty acids have been linked to reduced symptoms of depression and anxiety.Incorporating a variety of foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats, ensures that the body receives a broad spectrum of nutrients. Avoiding excessive consumption of processed foods, sugary drinks, and unhealthy fats is equally important. Ultimately, balanced nutrition is about moderation, variety, and making informed food choices to support a healthy lifestyle.",
            likes: 192,
            views: 305,
        },
        {
            title: 'The Role of Hydration in Health and Nutrition',
            id:-2,
            date: '2022-01-01',
            body: "A plant-based diet, which emphasizes the consumption of fruits, vegetables, legumes, nuts, seeds, and whole grains, has been associated with numerous health benefits. This dietary approach is rich in essential nutrients, fiber, and antioxidants, which can help reduce the risk of chronic diseases. Studies have shown that individuals following plant-based diets have lower rates of heart disease, hypertension, type 2 diabetes, and certain cancers. One of the primary benefits of a plant-based diet is its high fiber content. Dietary fiber aids in digestion, helps maintain healthy cholesterol levels, and promotes a feeling of fullness, which can support weight management. Additionally, plant-based diets are typically lower in saturated fats and cholesterol, further contributing to cardiovascular health. Antioxidants found in fruits and vegetables help combat oxidative stress and inflammation in the body. This can slow the aging process and reduce the risk of chronic diseases. Plant-based diets also tend to be more environmentally sustainable, as they generally require fewer resources and produce fewer greenhouse gases compared to diets high in animal products.Adopting a plant-based diet does not necessarily mean becoming a strict vegetarian or vegan. Even incorporating more plant-based meals into your routine can have significant health benefits. It is important to ensure adequate intake of essential nutrients like protein, iron, calcium, and vitamin B12, which can be found in plant sources or fortified foods.",
            likes: 340,
            views: 1120,
        },
        {
            title: 'The Benefits of a Plant-Based Diet',
            id:-1,
            date: '2022-01-01',
            body: "Balanced nutrition is crucial for maintaining overall health and well-being. It involves consuming a variety of foods in the right proportions to provide the body with essential nutrients. These nutrients include carbohydrates, proteins, fats, vitamins, and minerals, each playing a vital role in bodily functions. Carbohydrates are the body's primary energy source, while proteins are essential for growth, repair, and maintenance of tissues. Fats, though often misunderstood, are vital for energy storage, insulation, and protecting vital organs.Vitamins and minerals, though needed in smaller amounts, are critical for numerous biochemical processes. For example, vitamin C is necessary for collagen production and immune function, while calcium is essential for bone health. A balanced diet helps in maintaining a healthy weight, reducing the risk of chronic diseases such as diabetes, heart disease, and cancer. It also supports mental health, as nutrients like omega-3 fatty acids have been linked to reduced symptoms of depression and anxiety.Incorporating a variety of foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats, ensures that the body receives a broad spectrum of nutrients. Avoiding excessive consumption of processed foods, sugary drinks, and unhealthy fats is equally important. Ultimately, balanced nutrition is about moderation, variety, and making informed food choices to support a healthy lifestyle.",
            likes: 392,
            views: 505,
        },
        {
            title: 'Understanding the Impact of Processed Foods on Health',
            id:0,
            date: '2022-01-01',
            body: "Processed foods, which are often high in added sugars, unhealthy fats, and sodium, can have detrimental effects on health when consumed in excess. These foods, including sugary snacks, fast food, and ready-made meals, are typically calorie-dense but nutrient-poor, leading to poor dietary quality and various health issues. High consumption of processed foods is linked to an increased risk of obesity, cardiovascular diseases, diabetes, and certain cancers. This is partly due to their high content of unhealthy ingredients, such as trans fats, refined sugars, and sodium, which contribute to inflammation, high blood pressure, and insulin resistance. Additionally, processed foods often contain artificial additives and preservatives, the long-term health effects of which are still not fully understood. Another concern is that processed foods can lead to overconsumption. Their high palatability, often achieved through the combination of sugar, fat, and salt, can stimulate appetite and reduce the sensation of fullness, causing individuals to eat more than needed. To mitigate the health risks associated with processed foods, it is advisable to focus on whole, minimally processed foods. This includes fresh fruits and vegetables, whole grains, lean proteins, and healthy fats. Preparing meals at home allows for greater control over ingredients and portion sizes, promoting healthier eating habits. In summary, while processed foods can be convenient and affordable, their regular consumption can negatively impact health. Prioritizing whole foods and preparing meals from scratch can help improve dietary quality and support overall health.",
            likes: 692,
            views: 205,
        },
    ]
    blog_object_create2(blogs)
}

function blog_object_create2(res){
    for(let i = 0 ;i < res.length ; i++){
        let blog = {
            id:res[i].id ,
            title:res[i].title,
            body:`${res[i].body.split(' ').slice(0,40).join(' ')}...`,
            body_full:`${res[i].body.split(' ').slice(0,80).join(' ')}`,
            img:random_img(i),
            likes:res[i].likes,
            views:res[i].views,
            date:random_date(),
        }
        blog_object_array.push(blog)
        blog_div_create(blog,blog.body)
        sblog_clikced_blog_object_create(blog_object_array)
    }
    function random_img(i){
        let src = `./img/blog/image${i}.jpg` 
        return src
    }
    function random_date(){
        let date = `${Math.floor(Math.random() * 30) + 1} / ${Math.floor(Math.random() * 11) + 1}`
        return date
    }
}

create_health_blogs()


//fetch blogs

function Fetch_data(current,url,Function_To_Call,button,element_to_animate){
    try{
        fetch(`${url}?limit=4&skip=${current}`).then(res => res.json()).then((res)=>{
            Function_To_Call(res)
            animate_on_scroll(element_to_animate,'-310px 0px ',0,true)
            if(res.length == 0){
                button.textContent = 'No More Posts'
            }else{
                button.textContent = 'Lode More'
            }
        });
    }catch{
        console.log(Error('No Such Data Found'))
    }
}

// blog page bulding

    
    
    const Blog_Load_More = document.querySelector('#blog-pagination')
    let current = 4
    Blog_Load_More.onclick = function(){
        Blog_Load_More.textContent = 'Loading... '
        setTimeout(function(){
            Fetch_data(current,'https://dummyjson.com/posts',blog_object_create,Blog_Load_More,'.blog')
            current+=4
        },2000)
    }



    
    function blog_object_create(res){
        res.posts.forEach(function(el){
            let blog = {
                id:el.id ,
                title:el.title,
                body:`${el.body.split(' ').slice(0,40).join(' ')}...`,
                body_full:el.body,
                img:random_img(),
                likes:el.reactions.likes,
                views:el.views,
                date:random_date(),
            }
            blog_object_array.push(blog)
            blog_div_create(blog,blog.body)
            sblog_clikced_blog_object_create(blog_object_array)

        })
        function random_img(){
            let src = `./img/blog/b${Math.floor(Math.random() * 20)}.jpg` 
            return src
        }
        function random_date(){
            let date = `${Math.floor(Math.random() * 31)} / ${Math.floor(Math.random() * 12)}`
            return date
        }
    }


function blog_div_create(blog,body){
        const blog_contenar = document.querySelector('#blogs .contenar')
        // create blog div && div content
        let blog_div =  document.createElement('div')
        blog_div.classList.add('blog')
        blog_div.id = blog.id
        // blog img contenar div
        let  img_contenar = document.createElement('div')
        img_contenar.id = 'img_contenar' 
        let img=  document.createElement('img')
        img.src = blog.img 
        img.alt = 'blog_img'
        img_contenar.append(img)
        let blog_date_of_puplish = document.createElement('p')
        blog_date_of_puplish.textContent = blog.date
        img_contenar.append(blog_date_of_puplish)
        // blog details div
        let blog_details = document.createElement('div')
        blog_details.classList.add('details')
        let blog_title  = document.createElement('h3')
        blog_title.textContent = blog.title
        blog_details.append(blog_title)
        let blog_body  = document.createElement('p')
        blog_body.textContent = body
        blog_details.append(blog_body)
        let blog_read_more_contenar  = document.createElement('h5')
        let blog_read_more  = document.createElement('a')
        blog_read_more.textContent = 'CONTINUE READING'
        blog_read_more.href = 'sblog.html'
        blog_read_more_contenar.append(blog_read_more)
        blog_details.append(blog_read_more_contenar)
        let likes_contenar  = document.createElement('div')
        likes_contenar.classList.add('likes')
        let likes_heart_contenar = document.createElement('p')
        let likes = document.createElement('span')
        likes.textContent = blog.likes
        likes_heart_contenar.append(likes)
        let likes_heart = document.createElement('li')
        likes_heart.classList.add('fa-solid')
        likes_heart.classList.add('fa-heart')
        likes_heart.style.cssText = 'color: #74C0FC;'
        likes_heart_contenar.append(likes_heart)
        likes_contenar.append(likes_heart_contenar)
        let watches_contenar = document.createElement('p')
        let watches = document.createElement('span')
        watches.textContent = blog.views
        let watches_eye = document.createElement('li')
        watches_eye.classList.add('fa-solid')
        watches_eye.classList.add('fa-eye')
        watches_eye.style.cssText = 'color: #74C0FC;'
        watches_contenar.append(watches)
        watches_contenar.append(watches_eye)
        likes_contenar.append(watches_contenar)
        blog_details.append(likes_contenar)
        //blog div append childs
        blog_div.append(img_contenar)
        blog_div.append(blog_details)
        // blog contenar append childs
        blog_contenar.appendChild(blog_div)
    }



    Fetch_data(0,'https://dummyjson.com/posts',blog_object_create,Blog_Load_More,'.blog')


// clikced blog to localstorage


function sblog_clikced_blog_object_create(blog_object_array){
    let blogs = document.querySelectorAll('.blog')
    blogs.forEach(function(e,index){
        e.onclick = function(clicked){
            if(+clicked.currentTarget.id == blog_object_array[index].id){
                localStorage.setItem('blog',JSON.stringify(blog_object_array[index]))
                window.location.href  = 'file:///E:/ECOMMERCE-main/sblog.html'
            }
        }
    })
}

