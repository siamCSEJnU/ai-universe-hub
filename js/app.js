const loadData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayTools(data.data.tools);
};

const displayTools = (tools) => {
  const toolsContainer = document.getElementById("tools-container");
  //   console.log(data);
  tools.forEach((tool) => {
    console.log(tool);
    const toolDiv = document.createElement("div");
    toolDiv.classList.add("col");
    toolDiv.innerHTML = `<div class="card p-4">
    <img src="${tool.image}" class="card-img-top " height="300px" width="437px" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <p class="card-text">
      <ol class="list-group list-group-numbered">
      <li class="list-group-item">Natural language processing </li>
      <li class="list-group-item">Contextual understanding</li>
      <li class="list-group-item">Text generation</li>
    </ol>
      </p>
      <hr class="my-4">
      <h5 class="card-title">${tool.name}</h5>
    <div class="d-flex justify-content-between  my-4  ">
    <div class="d-flex justify-content-start gap-4 " ><p> <i class="fa-solid fa-calendar-days text-secondary"></i></p>
    <p>${tool.published_in}</p></div><p><i class="fa-solid fa-arrow-right text-secondary"></i></p>
    </div>
    </div>
  </div>`;
    toolsContainer.appendChild(toolDiv);
  });
};
