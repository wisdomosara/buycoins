let id = "f07f000cfcc1b8dd68ba220e727566be48f159f4"
let data = {}
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${id}`
        },
        body: JSON.stringify({
            query: `query { 
                        repositoryOwner(login: "wisdomosara") {
                          login
                          ... on User {
                            bio
                            websiteUrl
                            avatarUrl
                            twitterUsername
                            starredRepositories {
                              totalCount
                            }
                            followers(first: 10) {
                                totalCount
                              }
                            following(first: 10) {
                                totalCount
                              }
                            organizations(first: 3) {
                              nodes{
                                url
                                avatarUrl
                              }
                            }
                            repositories(first: 20) {
                              nodes{
                                name
                                url
                                isPrivate
                                updatedAt
                                stargazerCount
                                isFork
                                viewerHasStarred
                                forkCount
                                languages(first: 2) {
                                    nodes {
                                      name
                                    }
                                  }
                              }
                            }
                          }
                        }
                      }`
              })
        };
    
        fetch(`https://api.github.com/graphql`, options)
        .then(res => res.json())
        .then(resp => data = {...resp})
        .then(dat => data ? createHtml(data) : console.log("wisdom"));  
        
        
function createHtml(data) {
  console.log(data.data.repositoryOwner)
  let {login, bio, websiteUrl, avatarUrl, twitterUsername} = data.data.repositoryOwner
  let totalCountTStarredRepo = data.data.repositoryOwner.starredRepositories.totalCount
  let following = data.data.repositoryOwner.following.totalCount
  let followers = data.data.repositoryOwner.followers.totalCount
  let organizations = data.data.repositoryOwner.organizations.nodes
  let repositories = data.data.repositoryOwner.repositories.nodes
  console.log(login, bio, websiteUrl, twitterUsername, avatarUrl, totalCountTStarredRepo)
  let container = document.querySelector(".main")
  console.log(following, followers, organizations, repositories)
  repositories.forEach(repo => {
                let starred = repo.viewerHasStarred ? "unstar" : "star"
                var allholder = document.createElement("div");
                allholder.className ="ally"
                allholder.innerHTML = `
                    <div class="repo-body">
                        <div class="repo-body-left">
                            <a href=${repo.url}><h4>${repo.name}</h4></a>
                            <h5>${repo.languages[1]}</h5>
                            
                        </div>
                        <div class="repo-body-right">
                            <button>${starred}</button>
                        </div>
                    </div>
            `

            container.appendChild(allholder)
  })
}