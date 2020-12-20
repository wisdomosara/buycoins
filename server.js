//the only reason why this server is used is to hide my github API key using the environment variables which i added on heroku
//the api can't be hidden with client javascript
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("views"));

//sends the file for the page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "index.html");
});

//listen to a get reqest from the client javascript on this route for requests to the graphql server
app.get("/api/github", function(req, res) {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.ACCESS_TOKEN}`
    }, //authorize the request with my github access token api key
    body: JSON.stringify({
      //graphql query for the details i need
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
                  repositories(privacy: PUBLIC, first: 20,orderBy: {field: UPDATED_AT, direction: DESC}) {
                    nodes{
                      name
                      url
                      isPrivate
                      updatedAt
                      stargazerCount
                      isFork
                      viewerHasStarred
                      primaryLanguage{
                          name
                          color
                      }
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
                      
                    }
                  }
                }
              }
            }`
    })
  };
  //make the request here and send back the data gotten back to the client side javascript for further processing
  fetch(`https://api.github.com/graphql`, options)
    .then(redey => redey.json())
    .then(data => res.json(data));
});

//listen to the port on heroku or 3000 if on local machine
app.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
