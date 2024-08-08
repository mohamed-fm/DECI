
    //build the selceted blog
    blog_div_create(JSON.parse(localStorage.getItem('blog')),JSON.parse(localStorage.getItem('blog')).body_full)
    animate_on_scroll('.blog' ,'-45% 0px ',0,true)


    //build the comments section    

    const Blog_Load_More = document.querySelector('#blog-pagination')
    let current = 10
    Blog_Load_More.onclick = function(){
        Blog_Load_More.textContent = 'Loading... '
        setTimeout(function(){
            Fetch_data(current,'https://dummyjson.com/comments',sblog_commments_object_create,Blog_Load_More,'.comment')
            current+=10
        },2000)
    } 



    function sblog_commments_object_create(res){
        res.comments.forEach(function(el,index){
            let comment = {
                id:el.id,
                body:el.body,
                user_name:el.user.fullName,
                likes:el.likes,
                img: random_img(),
            }
            function random_img(){
                let img  = `./img/people/${Math.floor(Math.random()*16)}.jpg`
                return img
            }
            comments_create(comment)
        })
    }
    function comments_create(comment){
        const comments_contenar = document.querySelector('.comments')
        
        //comment div create
        let comment_div =  document.createElement('div')
        comment_div.classList.add('comment')
        //user_div_create
        let user_div = document.createElement('div')
        user_div.classList.add('user')
        let user_img = document.createElement('img')
        user_img.src = comment.img
        user_img.alt = 'user_img'
        user_div.append(user_img)
        let user_name = document.createElement('p')
        user_name.textContent = comment.user_name
        user_div.append(user_name)
        comment_div.append(user_div)
        //comment-body_create
        let comment_body = document.createElement('p')
        comment_body.textContent = comment.body
        comment_div.append(comment_body)
        //comment_likes_create
        let comment_likes_contenar = document.createElement('div')
        comment_likes_contenar.classList.add('comment_likes')
        let likes_icon = document.createElement('span')
        let number_of_likes = comment.likes 
        likes_icon.textContent = number_of_likes
        let icon = document.createElement('i')
        icon.classList.add('fa-solid','fa-thumbs-up')
        icon.style.cssText  = "color: #74C0FC;"
        likes_icon.append(icon)
        comment_likes_contenar.append(likes_icon)
        comment_div.append(comment_likes_contenar)
        
        // translate comment based on the index of it
        //comments_contenar append childs
        comments_contenar.append(comment_div)
    }
    Fetch_data(0,'https://dummyjson.com/comments',sblog_commments_object_create,Blog_Load_More,'.comment')



    function Fetch_data(current,url,Function_To_Call,button,element_to_animate){
        try{
            fetch(`${url}?limit=10&skip=${current}`).then(res => res.json()).then((res)=>{
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









    