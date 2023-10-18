const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");

const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

const baseUrl = "https://newsapi.org/v2";
const apiKey = `&apiKey=${process.env.NEWS_API_KEY}`;

const newsA = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
const newsB = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${process.env.NEWS_API_KEY}`
const newsC = `https://newsapi.org/v2/top-headlines?sources=health&apiKey=${process.env.NEWS_API_KEY}`
const newsD = `https://newsapi.org/v2/everything?q=health&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`


async function dataRequest(url){
    try{
        const response = await fetch(baseUrl + url + apiKey);
        const json = response.json();
        return json;

    } catch(error){
        console.log(error);

    }

}

function urlRequest(url){
    dataRequest(url).then(data => {
        data.articles.forEach(item => {
            cards.innerHTML += ` <div class="card">
                                    <div class="image">
                                        <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="">
                                    </div>
                                    <div class="information">
                                        <div>
                                            <p class="title">${item.title}</p>
                                            <p class="description">${item.description}</p>
                                            <p class="time">
                                                <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                                                <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                                            </p>
                                        </div>
                                        <div class="other">
                                            <span class="source">${item.source.name}</span>
                                            <a class="url" href="${item.url}"  target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>`;
        });
    });
    

}

category.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove("active"))
        event.target.classList.add("active");
    }
})

urlRequest("/top-headlines?country=us")
