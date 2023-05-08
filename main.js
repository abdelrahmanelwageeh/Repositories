// Main Variables

let theInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-repos .get-btn");
let reposDate = document.querySelector(".show-data");

getBtn.onclick = function () {
  GetRepos();
};

// get repos function
function GetRepos() {
  if (theInput.value === "") {
    reposDate.innerHTML = "<span>Please Write GitHub UserName.  </span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((repo) => repo.json())
      .then((data) => {
        reposDate.innerHTML = "";
        data.forEach((repo) => {
          // create the main div
          let MainDiv = document.createElement("div");
          //  creat the repo name text
          let repoName = document.createTextNode(repo.name);
          //   Append the text to main div
          MainDiv.appendChild(repoName);

          //   create repo url anchor
          let theUrl = document.createElement("a");

          let urlText = document.createTextNode("Visit");

          theUrl.appendChild(urlText);

          theUrl.href = `${repo["html_url"]}`;

          //   set atribute blanck
          theUrl.setAttribute("target", "_blank");

          // creat the stars counter
          let starsSpan = document.createElement("span");
          let starText = document.createTextNode(
            `Stars : ${repo.stargazers_count}`
          );

          starsSpan.appendChild(starText);
          let spaceDiv = document.createElement("div");
          spaceDiv.appendChild(starsSpan);
          spaceDiv.appendChild(theUrl);
          MainDiv.appendChild(spaceDiv);
          MainDiv.className = "repo-box";
          // Append the main div to container
          reposDate.appendChild(MainDiv);
        });
      });
  }
}
