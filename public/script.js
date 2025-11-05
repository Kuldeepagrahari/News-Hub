const api_key = '0cad9cfd5f434a8cab1f24f1c8127d48';

console.log("JavaScript is running!");

const blog_cont = document.getElementById('blog-container');
// Ensure this element exists in your HTML with id="blog-container"
if (blog_cont) {
    blog_cont.style.color = "white";
} else {
    console.error("Element with id 'blog-container' not found.");
}

const searchField = document.getElementById("search-input")
const video = document.getElementById("video") // Assuming this is the placeholder you want to hide

const searchBtn = document.getElementById("search-btn")

/**
 * Creates a promise that resolves after a specified delay.
 * @param {number} ms - The delay in milliseconds.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetch_blogs() {
    try {
        const apiUrl = `https://news-hub-application.onrender.com/api/news`;  // backend proxy
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (video) video.style.display = "none";
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

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://news-hub-application.onrender.com/api/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 'ok') {
            throw new Error(`API error! message: ${data.message}`);
        }

        return data.articles;
    } catch (err) {
        console.error('Error in fetchNewsQuery:', err);
        return [];
    }
}

function displayBlogs(articles) {
    // Check if blog_cont exists before trying to manipulate its content
    if (!blog_cont) {
        console.error("Cannot display blogs: 'blog-container' not found.");
        return;
    }
    
    blog_cont.innerHTML = "";

    articles.forEach((article) => {
        const blog_box = document.createElement("div");
        blog_box.classList.add("boxes");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'placeholder.jpg'; // Fallback image if urlToImage is null
        img.alt = article.title || 'No title available';

        const title = document.createElement("h3");
        
        // Defensive check for title before slicing
        const rawTitle = article.title || 'Untitled Article';
        const truncatedTitle = rawTitle.length>30?rawTitle.slice(0,30)+'...':rawTitle

        title.textContent = truncatedTitle

        const description = document.createElement("p");
        
        // Defensive check for description before slicing
        const rawDescription = article.description || 'No summary available for this article.';
        const truncDesc = rawDescription.length > 120 ? rawDescription.slice(0,120) + '...':rawDescription

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

// === FIX: Added delay(1000) before initial fetch ===
(async () => {
    try {
        // Wait for 1000 milliseconds (1 second) before fetching news
        await delay(2000); 
        console.log("Delay finished, fetching initial news...");

        const articles = await fetch_blogs();
        // console.log(articles);
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

// === FIX: Corrected the sam function call (removed the empty call) ===
function sam (a, b) {
    console.log(a + b);
}
// sam(); // Removed the empty call to prevent NaN/errors