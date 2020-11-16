
let menu = document.querySelector(".menu")
let menuDropdown = document.querySelector(".mobile-dropdown")
menu.addEventListener("click", function(){
  menuDropdown.classList.toggle("close")
})
let data = {}
    
    
        fetch(`/api/github`)
        .then(res => res.json())
        .then(dae => data = {...dae})
        .then(dat => data ? createHtml(data) : console.log("wisdom"));  

        
        
        
function createHtml(data) {
  console.log(data)
  let {login, bio, websiteUrl, avatarUrl, twitterUsername} = data.data.repositoryOwner
  let totalCountTStarredRepo = data.data.repositoryOwner.starredRepositories.totalCount
  let following = data.data.repositoryOwner.following.totalCount
  let followers = data.data.repositoryOwner.followers.totalCount
  let organizations = data.data.repositoryOwner.organizations.nodes
  let repositories = data.data.repositoryOwner.repositories.nodes
  console.log(login, bio, websiteUrl, twitterUsername, avatarUrl, totalCountTStarredRepo)
  let container = document.querySelector(".repos")
  console.log(following, followers, organizations, repositories)
  repositories.forEach(repo => {
                let starred = repo.viewerHasStarred ? `<button class="repo-search-btn new-repo repo-star">
                <svg class="octicon octicon-star-fill mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
                <p>unstar</p>
                </button>`: `<button class="repo-search-btn new-repo repo-star">
                <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                <p>star</p>
                </button>`
                let starCount = repo.stargazerCount ? `<div class="options">
                <div class="options-symbol"><svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg></div>
                <p>${repo.stargazerCount}</p>
                </div>` : "";
                let fork = repo.parent ? `<p class="fork">forked from: ${repo.parent.nameWithOwner}` : ""
                let description = repo.description ? `<p class="description">${repo.description}</p>` : ""
                let languages = repo.primaryLanguage  ? repo.primaryLanguage.name ? `<div class="options">
                <div class="options-symbol languages" style="background-color: ${repo.primaryLanguage.color}; width:14px; border-radius: 50%; height:14px">
              
                </div>
                <p>${repo.primaryLanguage.name}</p>
                </div>` : "" : ""
                let forkCount = repo.parent ? `<div class="options">
                <div class="options-symbol"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg></div>
                <p class="fork-count">${repo.parent.forkCount}</p>
                </div>` : "";
                var allholder = document.createElement("div");
                allholder.className ="ally"
                allholder.innerHTML = `
                <div class="repository">
                <div class="repository-left">
                    <a href=${repo.url}><h3>${repo.name}</h3></a>
                    ${fork}
                    ${description}
                    <div class="repo-options-div">
                        ${languages}
                        ${forkCount}
                        ${starCount}
                        <div class="options">
                            <div class="options-symbol"></div>
                            <p>Updated on jul 19</p>
                        </div>
                    </div>
                </div>
                <div class="repository-right">
                    ${starred}
                </div>
            </div>
            `

            container.appendChild(allholder)
  })
}







