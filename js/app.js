//loading first 6 data
const loadData = async () => {
  const seeMore = document.getElementById("see-more");
  seeMore.classList.remove("d-none");
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.data.tools[0]);
  displayTools(data.data.tools.slice(0, 6));
};

//displaying the tools
const displayTools = (tools) => {
  const toolsContainer = document.getElementById("tools-container");
  toolsContainer.innerHTML = "";

  tools.forEach((tool) => {
    // console.log(tool);
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
    <div class="d-flex justify-content-start gap-4 " ><p> <i class="fa-solid fa-calendar-days text-secondary fs-3"></i></p>
    <p class="container-date">${tool.published_in}</p></div><p><i class="fa-solid fa-arrow-right text-secondary fs-3" onclick="toolDetails('${tool.id}')" data-bs-toggle="modal" data-bs-target="#loadToolDetails" ></i></p>
    </div>
    </div>
  </div>`;
    toolsContainer.appendChild(toolDiv);
  });
};

//show tool details
const toolDetails = async (toolId) => {
  //   console.log(toolId);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${toolId}`;
  const res = await fetch(url);
  const data = await res.json();
  showToolDetails(data.data);
};
const showToolDetails = (tool) => {
  console.log(tool);

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `<div class="col-sm-6 mb-3g mb-sm-0 ">
                  <div class="card">
                  <div class="card-body" style="background: rgba(235, 87, 87, 0.05);">
                    
                    <p class="card-text fw-bold">
                    ${tool.description}
                    </p>
                    <div class="d-flex justify-content-between gap-2 my-3 text-warning-emphasis">
                     <div class="bg-white  p-2 rounded-4">
                      <p class="text-center">${
                        tool.pricing[0].price
                      }</p><p class="text-center">${
    tool.pricing[0].plan
  }</p></div>
                     <div class="bg-white p-2  rounded-4 "><p class="text-center">${
                       tool.pricing[1].price
                     }</p><p class="text-center">${
    tool.pricing[1].plan
  }</p></div>
                     <div class="bg-white p-2  rounded-4"><p class="text-center">${
                       tool.pricing[2].price
                     }<p class="text-center">${
    tool.pricing[2].plan
  }</p></p></div>
                    </div>
                    <div class="d-flex justify-content-between">
                   <div>
                   <p class="fw-bold">Features</p>
                    <ul class="text-success-emphasis">
                     <li>${
                       tool.features[1].feature_name
                         ? tool.features[1].feature_name
                         : "no data found"
                     }</li>
                     <li>${
                       tool.features[2].feature_name
                         ? tool.features[2].feature_name
                         : "no data found"
                     }</li>
                     <li>${
                       tool.features[3].feature_name
                         ? tool.features[3].feature_name
                         : "no data found"
                     }</li>
                     
                     </ul>
                     </div>
                    <div>
                  <p class="fw-bold">Interogations</p>
                  <ul class="text-success-emphasis">
                  <li>${
                    tool.integrations[0]
                      ? tool.integrations[0]
                      : "not available"
                  }</li>
                  <li>${
                    tool.integrations[1]
                      ? tool.integrations[1]
                      : "not available"
                  }</li>
                  <li>${
                    tool.integrations[2]
                      ? tool.integrations[2]
                      : "not available"
                  }</li>
                  
                    </ul>
                   </div>
                  </div>
                    
                    
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body ">
                  <img src="${
                    tool.image_link[0]
                  }" class="card-img-top " alt="..."  />
                  <p class="position-absolute top-0 start-50 translate-middle bg-danger text-white rounded-2 p-2">${
                    tool.accuracy.score ? tool.accuracy.score : "Unfounded"
                  }<span> accuracy</span></p>

                  
                    <p class="card-text fw-bold text-center mt-5">
                      ${
                        tool.input_output_examples[0].input
                          ? tool.input_output_examples[0].input
                          : "No! Not Yet! Take a break!!!"
                      }
                    </p>
                    <p class="card-text  text-center ms-2 mb-3">
                      ${
                        tool.input_output_examples[0].output
                          ? tool.input_output_examples[0].output
                          : "No! Not Yet! Take a break!!!"
                      }
                    </p>
                    
                   
                  </div>
                </div>
              </div>`;
};

//show all tools
const loadDataAll = async () => {
  const seeMore = document.getElementById("see-more");
  seeMore.classList.add("d-none");
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayTools(data.data.tools);
};

//sorting cards upon date
const sortByDate = async () => {
  const seeMore = document.getElementById("see-more");
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();

  // adding a date property to each tool object
  data.data.tools.forEach((tool) => {
    tool.date = new Date(tool.published_in).getTime();
  });

  // sorting the tools by date in ascending order
  const sortedTools = data.data.tools.sort((a, b) => a.date - b.date);
  displayTools(sortedTools);
  seeMore.classList.add("d-none");

  //   seeMore.addEventListener("click", () => {
  //     // display all sorted tools when seeMore button is clicked
  //     displayTools(sortedTools);
  //     // hide seeMore button
  //     seeMore.style.display = "none";
  //   });
};
