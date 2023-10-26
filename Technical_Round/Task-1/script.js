let formElement = document.querySelector("form");
let inputElement = document.getElementById("search-input");
let result = document.querySelector("#cards");
let matchResults = document.getElementById("matches");

let inputData = "";

async function searchResult(){
    inputData = inputElement.value;

    // input field is empty
    if (inputData.trim() === "") {
        defaultCards()
        return;
    }

    try {
        // fetch data from API
        let response = await fetch(`https://api.jikan.moe/v4/characters?page=1&limit=15&q=${inputData}&order_by=favorites&sort=desc`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let respo = await response.json();

        let matches = respo.pagination.items.total
        matchResults.innerHTML = matches

        if(matches == 0){
            noResult()
            return;
        }

        let results = await respo.data;

        result.innerHTML = "";

        results.map((res) => {
            let cardDiv = document.createElement("div")
            cardDiv.classList.add("card")

            let infoDiv = document.createElement("div")
            infoDiv.classList.add("info")

            let imageDiv = document.createElement("div")
            imageDiv.classList.add("image")

            let img = document.createElement("img")
            img.src = res.images.jpg.image_url;
            img.alt = res.name

            let nameDiv = document.createElement("div")
            nameDiv.classList.add("name")

            let namesDiv = document.createElement("div")
            namesDiv.classList.add("names")

            let name = document.createElement("h2")
            name.innerHTML = res.name

            let nickNamesDiv
            if(res.nicknames.length > 0){
                nickNamesDiv = document.createElement("div")
                nickNamesDiv.classList.add("nicknames")
            }

            let nickName1
            if(res.nicknames.length > 0){
                nickName1 = document.createElement("h4")
                nickName1.innerHTML = res.nicknames[0]
            }

            let nickName2
            if(res.nicknames.length > 1){
                nickName2 = document.createElement("h4")
                nickName2.innerHTML = res.nicknames[1]
            }

            let nickName3
            if(res.nicknames.length > 2){
                nickName3 = document.createElement("h4")
                nickName3.innerHTML = res.nicknames[2]
            }

            let fav = document.createElement("p")
            fav.classList.add("fav")

            let favicon = document.createElement("i")
            favicon.classList.add("bx")
            favicon.classList.add("red")
            favicon.classList.add("bxs-heart")

            let favSpan = document.createElement("span")
            favSpan.innerHTML = res.favorites

            let linkDiv = document.createElement("div")
            linkDiv.classList.add("link")

            let link = document.createElement("a")
            link.href = res.url
            link.target = "_blank"

            let linkIcon = document.createElement("i")
            linkIcon.classList.add("bx")
            linkIcon.classList.add("size")
            linkIcon.classList.add("bx-right-arrow-alt")
            linkIcon.classList.add("blue")


            link.appendChild(linkIcon)
            linkDiv.appendChild(link)

            fav.appendChild(favicon)
            fav.appendChild(favSpan)

            if(nickName1){
                nickNamesDiv.appendChild(nickName1)
            }

            if(nickName2){
                nickNamesDiv.appendChild(nickName2)
            }

            if(nickName3){
                nickNamesDiv.appendChild(nickName3)
            }

            namesDiv.appendChild(name)
            
            if(nickNamesDiv){
                namesDiv.appendChild(nickNamesDiv)
            }

            nameDiv.appendChild(namesDiv)
            nameDiv.appendChild(fav)

            imageDiv.appendChild(img)

            infoDiv.appendChild(imageDiv)
            infoDiv.appendChild(nameDiv)

            cardDiv.appendChild(infoDiv)
            cardDiv.appendChild(linkDiv)

            result.appendChild(cardDiv)
        })
    } catch (error){
        console.error("Error fetching data:", error);
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault()
    searchResult()
})

function defaultCards() {
    const resultSection = document.getElementById("result")

    matchResults.innerHTML = 123
    
    let defaultCardHTML = `
        <div id="cards">
            <div class="card">
                <div class="info">
                    <div class="image">
                        <img src="https://cdn.myanimelist.net/images/characters/2/284121.jpg" alt="Naruto Uzumaki">
                    </div>
                    <div class="name">
                        <div class="names">
                            <h2>Naruto Uzumaki</h2>
                            <div class="nicknames">
                                <h4>Nine-Tails Jinchuuriki</h4>
                            </div>
                        </div>
                        <p class="fav"><i class='bx bxs-heart red'></i><span>82986</span></p>
                    </div>
                </div>
                <div class="link">
                    <a href="https://myanimelist.net/character/17/Naruto_Uzumaki" target="_blank"><i class='bx bx-right-arrow-alt blue size'></i></a>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <div class="image">
                        <img src="https://cdn.myanimelist.net/images/characters/15/72546.jpg" alt="Naruto Uzumaki">
                    </div>
                    <div class="name">
                        <div class="names">
                            <h2>Gokuu Son</h2>
                            <div class="nicknames">
                                <h4>Kakarot</h4>
                            </div>
                        </div>
                        <p class="fav"><i class='bx bxs-heart red'></i><span>27014</span></p>
                    </div>
                </div>
                <div class="link">
                    <a href="https://myanimelist.net/character/246/Gokuu_Son" target="_blank"><i class='bx bx-right-arrow-alt blue size'></i></a>
                </div>
            </div>
            <div class="card">
                <div class="info">
                    <div class="image">
                        <img src="https://cdn.myanimelist.net/images/characters/15/422168.jpg" alt="Naruto Uzumaki">
                    </div>
                    <div class="name">
                        <div class="names">
                            <h2>Satoru Gojou</h2>
                            <div class="nicknames">
                                <h4>The Strongest Jujutsu Sorcerer</h4>
                            </div>
                        </div>
                        <p class="fav"><i class='bx bxs-heart red'></i><span>54946</span></p>
                    </div>
                </div>
                <div class="link">
                    <a href="https://myanimelist.net/character/164471/Satoru_Gojou" target="_blank"><i class='bx bx-right-arrow-alt blue size'></i></a>
                </div>
            </div>
        </div>
    `;

    resultSection.innerHTML = defaultCardHTML;
}

function noResult(){
    const resultSection = document.getElementById('result');

    let result = `
        <p class="nores">No Results Found</p>
    `;

    resultSection.innerHTML = result
}