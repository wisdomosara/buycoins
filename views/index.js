
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
                let starred = repo.viewerHasStarred ? "unstar" : "star"
                let starCount = repo.stargazerCount ? repo.stargazerCount : ""
                var allholder = document.createElement("div");
                allholder.className ="ally"
                allholder.innerHTML = `
                <div class="repository">
                <div class="repository-left">
                    <a href="#"><h3>${repo.name}</h3></a>
                    <div class="repo-options-div">
                        <div class="options">
                            <div class="options-symbol"><svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg></div>
                            <p>${starCount}</p>
                        </div>
                        <div class="options">
                            <div class="options-symbol"></div>
                            <p>Updated 6 minutes ago</p>
                        </div>
                    </div>
                </div>
                <div class="repository-right">
                    <button class="repo-search-btn new-repo repo-star">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                        <p>${starred}</p>
                    </button>
                </div>
            </div>
            `

            container.appendChild(allholder)
  })
}