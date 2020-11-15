require('dotenv').config()
const express = require("express")
const fetch = require('node-fetch');

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("views"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "index.html")
})

let date = []
app.get("/api/github", function(req, res) {
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.ACCESS_TOKEN}`
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
                      parent{
                        name
                        nameWithOwner
                        forkCount
                      }
                      nameWithOwner
                      licenseInfo{
                        name
                      }
                      isMirror
                      isArchived
                      isDisabled
                      description
                      languages(first: 3) {
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
        .then(redey => redey.json())
        .then(data => res.json(data))
        

    
        
})



app.listen(process.env.PORT || 3000, () => {
    console.log("server started")
})