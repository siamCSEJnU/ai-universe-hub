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
    <p >${tool.published_in}</p></div><p><i class="fa-solid fa-arrow-right text-secondary fs-3" onclick="toolDetails('${tool.id}')" data-bs-toggle="modal" data-bs-target="#loadToolDetails" ></i></p>
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
  modalBody.innerHTML = `<div class="col-sm-6 mb-3 mb-sm-0 ">
                  <div class="card">
                  <div class="card-body" style="background: rgba(235, 87, 87, 0.05);">
                    
                    <p class="card-text fw-bold">
                    ${tool.description}
                    </p>
                    <div class="d-flex justify-content-between gap-2 my-3 text-warning-emphasis">
                     <div class="bg-white  p-2 rounded-4">
                      <p class="text-center">${tool.pricing[0].price}</p><p class="text-center">${tool.pricing[0].plan}</p></div>
                     <div class="bg-white p-2  rounded-4 "><p class="text-center">${tool.pricing[1].price}</p><p class="text-center">${tool.pricing[1].plan}</p></div>
                     <div class="bg-white p-2  rounded-4"><p class="text-center">${tool.pricing[2].price}<p class="text-center">${tool.pricing[2].plan}</p></p></div>
                    </div>
                    <div class="d-flex justify-content-between">
                   <div>
                   <p class="fw-bold">Features</p>
                    <ul class="text-success-emphasis">
                     <li>${tool.features[1].feature_name}</li>
                     <li>${tool.features[2].feature_name}</li>
                     <li>${tool.features[3].feature_name}</li>
                     
                     </ul>
                     </div>
                    <div>
                  <p class="fw-bold">Interogations</p>
                  <ul class="text-success-emphasis">
                  <li>${tool.integrations[0]}</li>
                  <li>${tool.integrations[1]}</li>
                  <li>${tool.integrations[2]}</li>
                  
                    </ul>
                   </div>
                  </div>
                    
                    
                  </div>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="card">
                  <div class="card-body">
                  <img src="${tool.image_link[0]}" class="card-img-top " alt="..."  />
                    <p class="card-text fw-bold text-center my-4">
                      ${tool.input_output_examples[0].input}
                    </p>
                    <p class="card-text  text-center my-5">
                      ${tool.input_output_examples[0].output}
                    </p>
                    
                   
                  </div>
                </div>
              </div>`;
};
