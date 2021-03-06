
// search by text 
let search =document.querySelector("#search");
let template =document.querySelector("#template");
// console.log(search);

search.addEventListener('keyup',(e) => {
    let searchText = e.target.value;
    SearchGitHubProfiles(searchText);
    // console.log(e.target.value);
});

//-----search by Voice ----------//
let SearchByVoice = document.querySelector("#speechIcon");
SearchByVoice.addEventListener("click", (e) => {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.interimResults = true;

  recognition.addEventListener("result", (e) => {
    let transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("")
      .replace(/\s/g, "");

    search.value = transcript;
    let searchText = transcript;
    SearchGitHubProfiles(searchText);
  });

  recognition.start();
});

//------------------ github API-------------------//
function SearchGitHubProfiles(searchText){
    let Client_ID = "a9393e66f654749126f3";
    let Client_Secret = "ddd99f5ce96cb129675ad098fc165e54b4329497";
    let BASE_URL =`https://api.github.com/users/${searchText}?client_id=${Client_ID}&client_secret=${Client_Secret}`;
  
    let REPO_URL = `https://api.github.com/users/${searchText}/repos?client_id=${Client_ID}&client_secret=${Client_Secret}`;
    //github users
    window
    .fetch(BASE_URL)
    .then((data) =>{
     console.log(data);
      data.json().then((users)=>{
     
      if(users.message ==="not found"){
        template.innerHTML = `<h1 style="color: red"> no github profile found</h1>`
      }
      else{
        let output="";
      output +=`
      <section id="ProfileBlock">
      <article >
      <div class="leftBlock">
      <figure>
                     <a href="${users.html_url}" target="_blank"> 
                     <img src="${users.avatar_url}" alt="${users.login}" />
                     </a>
                     </figure>
                     <h4><a href="${users.html_url}" target="_blank">${users.name}</a></h4>
                     <h5>${users.login}</h5>
                     <h5>${users.bio}</h5>
                   
                     <h5>${users.company}</h5>
                     <h5>${users.location}</h5>
                  </div>
      <div class="rightBlock">
      <div id="usersRepo">
        <span>Repositories : <span class="innerSpan">${users.public_repos}</span></span>
        <span>Public gists : <span class="innerSpan">${users.public_gists}</span></span>
        <span>Followers :<span class="innerSpan">${users.followers}</span></span>
        <span>Following : <span class="innerSpan">${users.following}</span></span>
      </div>
      <div id="repoBlock"></div>
    </div>
  </article>
</section>
`;
template.innerHTML = output;
}
})
.catch((err) => console.log(err));
})
.catch((err) => console.log(err));
//Github Public Repository
window
.fetch(REPO_URL)
.then((data) => {
data
.json()
.then((repos) => {
let output_repos = [];
//for of loop
for (let repo of repos) {
console.log(repo);
output_repos += `
<main>
  <h4><a href="${repo.html_url}" target="_blank">
  ${repo.name}</a>
  </h4>
  <p>${repo.description}</p>
  <p>${new Date(repo.created_at).toLocaleDateString()}</p>
</main>
`;
}
document.getElementById("repoBlock").innerHTML = output_repos;
})
.catch((err) => console.log(err));
})
.catch((err) => console.log(err));
//ending Github Public Repository
}