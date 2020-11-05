GIT_URL = 'https://api.github.com/users'
USER_URL = 'https://api.github.com/search/users?q='
const form = document.querySelector("#github-form")
const userList = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')

let user


function gitData(){
    fetch(`${USER_URL} + ${user}`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => renderUser(json))
}

function gitRepos(){
    fetch(`${GIT_URL}/${user}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(json => renderRepos(json))
}

function renderUser(json){
    json['items'].forEach(u => {
        let p = document.createElement('p')
        p.innerHTML = `${u['login']}'s <a id='my-thing' href=${u['html_url']}>Github</a>`

        let img = document.createElement('img')
        img.src = u['avatar_url']
        img.id = u['login']

                
        img.addEventListener('click', event => {   // added event listener to image, but could add to empty <a> tag as well
            user = img.id
            repoList.innerHTML = ''
            gitRepos()
        })
    
        let p2 = document.createElement('p')
        p2.innerText = "Click the image for a list of repos from the API!"
        userList.appendChild(p)
        userList.appendChild(p2)
        userList.appendChild(img)

    })
}

function renderRepos(json){
    json.forEach(repo => {
        const p = document.createElement("p")
        p.innerHTML = `<a href=${repo['html_url']}>${repo["name"]}</a>`
        repoList.appendChild(p)
    })
}

function handleClick(){
    form.addEventListener("submit", event => {
        event.preventDefault()             // prevent refresh
        userList.innerHTML = ''            // clear the userList if someone searches again
        user = event.target[0].value       // set global constant "user" to name searched for

        gitData()

    })
}

function main(){
    handleClick()
}


main()
