const api_key = '0cad9cfd5f434a8cab1f24f1c8127d48'

console.log("sam")
const blog_cont = document.getElementById('blog-container')

blog_cont.style.color="white"
async function fetch_blogs (){
    try{
        // apiUrl = site url + query + api-key
       const apiUrl = `https://newsapi.org/v2/top-headlines?country=india&pageSize=10&apikey=${api_key}`

       const response = await fetch(apiUrl)
       const data = await response.json()
       console.log(data)
       return data.articles

    }catch(err){
        console.log(err)
        return []
    }
}

 function displayBlogs(articles){
    blog_cont.innerHTML = ""
    articles.forEach((article) => {
        const blog_box = document.createElement("div")
        blog_box.classList.add("boxes")

        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement("h2")
        title.textContent = article.title

        const description = document.createElement("p")
        description.textContent = article.description


        // data transfer to parents

        blog_box.appendChild(img)
        blog_box.appendChild(title)
        blog_box.appendChild(description)

        blog_cont.append(blog_box)


    });

 }
(async () => {
    try{
       const articles = await fetch_blogs()
       console.log(articles)
       displayBlogs(articles)
    }catch(err){
       console.log("error in fetching news" + err)
    }
}
)()