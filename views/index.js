//grab all the necessary elements


let menu = document.querySelector(".menu")
let menuDropdown = document.querySelector(".mobile-dropdown")
let languageDropdown = document.querySelector(".repo-languages")
let typeDropdown = document.querySelector(".repo-type")
let ProfileDropdown = document.querySelector(".profile-dropdown")
let Shadow = document.querySelector(".mobile-shadow")
let languageOpen = false
let languageModal = document.querySelector(".repo-dropdown-language")
let typeModal = document.querySelector(".repo-dropdown-type")
let ProfileModal = document.querySelector(".login-dropdown")


//toggle the menu button on mobile view as open and close when clicked
menu.addEventListener("click", function(){
    menuDropdown.classList.toggle("close")
})


//toggle the mmodal class to show and hide the modal
languageDropdown.addEventListener("click", function() {
    if(typeModal.classList.contains("modal")){
        typeModal.classList.remove("modal")
        Shadow.classList.toggle("hide-shadow")
    }
    else{
        languageModal.classList.toggle("modal")
        Shadow.classList.toggle("hide-shadow")
    }
})

ProfileDropdown.addEventListener("click", function() {
    languageOpen = !languageOpen
    ProfileModal.classList.toggle("modal")
    Shadow.classList.toggle("hide-shadow")
})

Shadow.addEventListener("click", function() {
    if(typeModal.classList.contains("modal")) {
        typeModal.classList.toggle("modal")
        Shadow.classList.toggle("hide-shadow")
    }else if(languageModal.classList.contains("modal")){
        languageModal.classList.toggle("modal")
        Shadow.classList.toggle("hide-shadow")
    }
    else if(ProfileModal.classList.contains("modal")){
        ProfileModal.classList.toggle("modal")
        Shadow.classList.toggle("hide-shadow")
    }
})

// When the user scrolls the page, execute repoStick(to make the repo navbar sticky) and loginStick(to make the usernname and profile pic stick when user scrolls past the username)
window.addEventListener("scroll", function() {
    repostick()
    loginStick()
})

// Get the navbar
var navbar = document.querySelector(".repo-nav-div");

var hidden = document.querySelector(".hide")

// Get the offset position of the navbar
var sticky;

if(window.innerWidth < 768) {
    sticky = 400
}else {
    sticky = navbar.offsetTop
}

var stickyy = 400

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function repostick() {
  if (window.pageYOffset >= sticky) {
    
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

function loginStick() {
    if (window.pageYOffset >= stickyy) {
       
      hidden.classList.add("stickyy")
    } else {
      hidden.classList.remove("stickyy");
    }
}

//initialize an empty data obkect, when the data comes from backend, we copy it into the data
let data = {}

//grab all the elements we wish to fill with the data from the github server
let Login = document.querySelectorAll(".login")
let Bio = document.querySelector(".bio")
let Followers = document.querySelector(".followersCount")
let Following = document.querySelector(".followingCount")
let Website = document.querySelector(".website")
let Twitter = document.querySelector(".twitter")
let ProfilePic = document.querySelectorAll(".profilePic")
let Organizations = document.querySelector(".organizations")
let ProlifeStars = document.querySelector(".profileStars")


//make a get request to my server which then makes a graphql request to the github server
//i used the backend server because i have to hide my API key which isn't possible with only frontend javascript
fetch(`/api/github`)
.then(res => res.json())
.then(dae => data = {...dae})
.then(dat => data ? createHtml(data) : console.log("wisdom"));  

        
//function that creates the component for each repository while mapping the data from the server into their respective places 
function createHtml(data) {

  //destructure the data objects to get the needed bits of data and to ensure code readability

  let {login, bio, websiteUrl, avatarUrl, twitterUsername} = data.data.repositoryOwner
  let totalCountTStarredRepo = data.data.repositoryOwner.starredRepositories.totalCount
  let following = data.data.repositoryOwner.following.totalCount
  let followers = data.data.repositoryOwner.followers.totalCount
  let organizations = data.data.repositoryOwner.organizations.nodes

  //map the username to the html elements that requires it
  Login.forEach(log => log.textContent = login)

  //set the bio
  Bio.textContent = bio

  //set the followers count
  Followers.innerHTML = `<svg class="octicon octicon-people text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>${followers} followers`

  //set the following count
  Following.textContent = `${following} following`

  //set the profile stars
  ProlifeStars.innerHTML = `<svg class="octicon octicon-star text-gray-light" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>${totalCountTStarredRepo}`

  //set the website url
  Website.innerHTML = `<svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg><a href="https://${websiteUrl}"> ${websiteUrl}</a>`

  //set the twitter username and iink to the profile page
  Twitter.innerHTML = `<i class="fab fa-twitter"></i><a href="https://twitter.com/${twitterUsername}"> @${twitterUsername}</a>`

  //set the profile picture
  ProfilePic.forEach(pic => pic.src = avatarUrl)

  //set the organizatiions with data from the server
  organizations.forEach(organization => {
      let organizationdiv = document.createElement("div")
      organizationdiv.innerHTML = `<a href=${organization.url}>
      <img src=${organization.avatarUrl} alt="" class="github-img organizationImg">
      </a>`

      Organizations.appendChild(organizationdiv)
  })


//get the data for the first 20 repositories using object destructuring
let repositories = data.data.repositoryOwner.repositories.nodes

//grab the container elements where the repositories should be appended to
let container = document.querySelector(".repos")

//loop through the list of repositories and create a repository object for each of the repos
repositories.forEach(repo => {

            //formatting the date string gotten from the server and making it readable
            let apidate = new Date(repo.updatedAt)
            let localDateString = apidate.toLocaleDateString(undefined, {  
                day : 'numeric',
                month : 'short',
                year : 'numeric'
            })
            let splited = localDateString.split(" ")
            let date = splited.filter(splits => splits != "2020")
            let unformatted = date.join(" ")
            let realDate = unformatted[unformatted.length - 1] == "," ? unformatted.replace(",", "") : unformatted

            //component for a starred repository, if it has been starred return this component else return an empty div
            let starred = repo.viewerHasStarred ? `<button class="repo-search-btn new-repo repo-star starred">
            <svg class="octicon octicon-star-fill mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
            <p>Unstar</p>
            </button>`: `<button class="repo-search-btn new-repo repo-star unstarred">
            <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
            <p>star</p>
            </button>`

            //component for a starred repository, if it has been starred return this component else return an empty div
            let starCount = repo.stargazerCount ? `<div class="options">
            <div class="options-symbol"><svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg></div>
            <p class="star-count">${repo.stargazerCount}</p>
            </div>` : "";

            //paragragh that states where a repo is forked from, it first checks if the repo is actually a fork
            let fork = repo.parent ? `<p class="fork">forked from: ${repo.parent.nameWithOwner}` : ""

            //paragragh that states the description of a repo, it first checks if the repo has any description
            let description = repo.description ? `<p class="description">${repo.description}</p>` : ""

            //paragrapgh that states the name of the primary language used in the repo
            let languages = repo.primaryLanguage  ? repo.primaryLanguage.name ? `<div class="options">
            <div class="options-symbol languages" style="background-color: ${repo.primaryLanguage.color}; width:14px; border-radius: 50%; height:14px"></div>
            <p>${repo.primaryLanguage.name}</p>
            </div>` : "" : ""

            let forkCount = repo.parent ? `<div class="options">
            <div class="options-symbol"><svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg></div>
            <p class="fork-count">${repo.parent.forkCount}</p>
            </div>` : "";

            let licenseInfo = repo.licenseInfo ? `<div class="options">
            <div class="options-symbol"><svg class="octicon octicon-law mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg></div>
            <p>${repo.licenseInfo.name}</p>
            </div>` : "";

            //create the repository div
            var allholder = document.createElement("div");

            //add the component structure html into the new repository div created above
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
                                <div class="options-symbol date"></div>
                                <p>Updated on ${realDate}</p>
                            </div>
                        </div>
                    </div>
                    <div class="repository-right">
                        ${starred}
                    </div>
                </div>`
        //appended the new repository component to the repos div on the main page
        container.appendChild(allholder)

        //add all the elements with class of repo star to an array
        //loop through all and add an even listener to them to change the star of the button when clicked
        let customStar = document.querySelectorAll(".repo-star")
        
        if(customStar.length == 20) {
            customStar.forEach(star => {
                
                star.addEventListener("click", function() {
                    
                    if(star.classList.contains("starred")) {
                       
                        star.innerHTML = `<svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                        <p>star</p>`
                        star.classList.remove("starred")
                        star.classList.add("unstarred")
                    }
                    else {
                        
                        star.innerHTML = `<svg class="octicon octicon-star-fill mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path></svg>
                        <p>Unstar</p>`
                        star.classList.add("starred")
                        star.classList.remove("unstarred")
                    }
                })
            })
        }
    
    })
    
}

