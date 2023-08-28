///*****GLOBAL STYLES********//
//Overview Div- Profile information//
const overviewDiv = document.querySelector(".overview");
//Display of Repos//
const repoDisplay = document.querySelector(".repo-list");
//gitHub username//
const username = "KatherineMarlo";

const githubInfo = async function () {
    const profileInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    console.log(data);
    displayUserInfo(data);
};

githubInfo();

//use the data.(Whatevervalue) to target the data variable and the json info then the info that you are trying to target//
const displayUserInfo = function (data) {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
  `;
  overviewDiv.append(userDiv);
  fetchRepo();
};

const fetchRepo = async function() {
  const repoSite = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoSite.json();
  displayRepo(repoData);
};

const displayRepo = function (repos) {
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoDisplay.append(listItem);
  }
};

