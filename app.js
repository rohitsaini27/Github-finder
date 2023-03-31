const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main")
const search = document.getElementById("search")
const form = document.getElementById("form")


getUser(url = APIURL + "rohitsaini27")

async function getUser(user){
    const resp = await fetch(user)
    const respData = await resp.json()

    console.log(respData)
    createUserCard(respData)
    getRepo(user)
}

function createUserCard(user){

    const cardInfo = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos">
                
                </div>
            </div>
        </div>
    `;

    main.innerHTML = cardInfo
}

async function getRepo (url) {
    const newResponse = await fetch(url + "/repos");
    const newData = await newResponse.json();
    console.log(newData);

    addRepo(newData);
}

function addRepo(repos){
    console.log(repos)
    const reposEl = document.querySelector("#repos")

    repos.forEach(repo => {
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')

        repoEl.href = repo.html_url
        repoEl.target = "_blank"
        repoEl.innerHTML = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener("submit" , function(e) {
    e.preventDefault()

    const user = search.value

    if(user && user !== " ") {
        getUser(APIURL + user)

        search.value = ""
    }else{
        window.location.reload()
    }
})

