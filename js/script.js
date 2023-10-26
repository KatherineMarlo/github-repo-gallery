///*****GLOBAL STYLES********//
//Overview Div- Profile information//
const overviewDiv = document.querySelector(".overview");
//Display of Repos List//
const repoDisplay = document.querySelector(".repo-list");
//sectiion of repo//
const sectionRepo = document.querySelector(".repos");
//Individual Repo Data//
const singleRepoData = document.querySelector(".repo-data");
//back to repo button//
const backToRepoButton = document.querySelector(".view-repos");
//Search by name placeholder//
const filterInput = document.querySelector(".filter-repos");
//gitHub username//
const username = "KatherineMarlo";

const githubInfo = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await profileInfo.json();
  console.log(data);
  displayUserInfo(data);
};

githubInfo();

//use the data.(Whatevervalue) to target the data variable and the json info then the info that you are trying to target//
const displayUserInfo = function (data) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-info");
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

const fetchRepo = async function () {
  const repoSite = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoSite.json();
  displayRepo(repoData);
};

//In the first case, the repo.name variable is used to access the name property of the repo object. This object is an array of repository objects that is passed to the displayRepo() function. The name property of the repo object contains the name of the repository.//
const displayRepo = function (repos) {
  for (const repo of repos) {
    const listItem = document.createElement("li");
    listItem.classList.add("repo");
    listItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoDisplay.append(listItem);
  }
  filterInput.classList.remove("hide");
};

repoDisplay.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    //console.log(repoName);
    specificRepo(repoName);
  }
});

//In the second case, the repoName variable is used to store the inner text of the element that was clicked on. The inner text of the element is the name of the repository.
//The reason why we use different ways to target the repository name in these two cases is because the data is stored in different ways. In the first case, the data is stored in an object, and we can access the property that we need using dot notation. In the second case, the data is stored in the inner text of an element, and we need to use the innerText property to access it.//
const specificRepo = async function (repoName) {
  const individualRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await individualRepo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  displaySpecificRepo(repoInfo, languages);
};


const displaySpecificRepo = function (repoInfo, languages) {
  singleRepoData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  console.log(languages);
  singleRepoData.append(div);
  singleRepoData.classList.remove("hide");
  sectionRepo.classList.add("hide");
  backToRepoButton.classList.remove("hide");
};

backToRepoButton.addEventListener("click", function(){
  sectionRepo.classList.remove("hide");
  singleRepoData.classList.add("hide");
  backToRepoButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
  const searchText = e.target.value;
  //console.log(searchText);
  const repos = document.querySelectorAll(".repo");
  const repoName = searchText.toLowerCase();
  for (const repo of repos) {
    const smallText = repo.innerText.toLowerCase();
    if (smallText.includes(repoName)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }


});