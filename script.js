const api_key = '0cad9cfd5f434a8cab1f24f1c8127d48';

console.log("JavaScript is running!");

const blog_cont = document.getElementById('blog-container');
blog_cont.style.color = "white";

const searchField = document.getElementById("search-input")


const searchBtn = document.getElementById("search-btn")

async function fetch_blogs() {
    try {
        // apiUrl = site url + query + api-key
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${api_key}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.status !== 'ok') {
            throw new Error(`API error! message: ${data.message}`);
        }

        return data.articles;
    } catch (err) {
        console.error('Error in fetch_blogs:', err);
        return [];
    }
}


searchBtn.addEventListener('click',async ()=>{
    const query = searchField.value.trim()

    if(query !== ""){
        try{
           const articles=await fetchNewsQuery(query)
           displayBlogs(articles)
        }catch(err){
          console.log('error fetching news',err)
        }
    }
})

async function fetchNewsQuery(query){
    try {
        // apiUrl = site url + query + api-key
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${api_key}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        if (data.status !== 'ok') {
            throw new Error(`API error! message: ${data.message}`);
        }

        return data.articles;
    } catch (err) {
        console.error('Error in fetch_blogs:', err);
        return [];
    }
}
function displayBlogs(articles) {
    blog_cont.innerHTML = "";

    articles.forEach((article) => {
        const blog_box = document.createElement("div");
        blog_box.classList.add("boxes");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'placeholder.jpg'; // Fallback image if urlToImage is null
        img.alt = article.title || 'No title available';

        const title = document.createElement("h3");
      
        
        const truncatedTitle = article.title.length>30?article.title.slice(0,30)+'...':article.title

        title.textContent = truncatedTitle

        const description = document.createElement("p");

        const truncDesc = article.description.length > 120 ? article.description.slice(0,120):article.description

        description.textContent = truncDesc

        blog_box.appendChild(img);
        blog_box.appendChild(title);
        blog_box.appendChild(description);
        blog_box.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })

        blog_cont.append(blog_box);
    });
}

(async () => {
    try {
        const articles = await fetch_blogs();
        console.log(articles);
        displayBlogs(articles);
    } catch (err) {
        console.error("Error in fetching news:", err);
    }
})();


// Smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
