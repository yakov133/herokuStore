function change() {
    let num = document.getElementById("cartItems");
    num.style.color = "coral";
  
    axios
      .get("/getCart/61903a03c4163ab1b03e925d")
      .then((response) => {
        num.innerText = response.data.proudcts.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  change();
  
  function add(id) {
    console.log(id);
    axios
      .patch("addToCart/61903a03c4163ab1b03e925d", { producId: id })
      .then((response) => {
        if (response.statusText == "Created") {
          change();
        }
      })
      .catch((err) => console.log(err));
  }
  
  function deleteProduct(id){

    axios.delete(`deleteFromProducts/${id}`)
    .then((response)=>{
      console.log("Product was deleted");
      console.log(response);
    })
    .catch(error=>console.log(error))
  }

  const items = document.getElementById("items");
  let data;
  axios
    .get("/getProducts/ipad")
    .then((response) => {
      data = response.data;
  
      for (let index = 0; index < data.length; index++) {
        let tempId = data[index]._id;
  
        items.innerHTML += `<div class="col-3 card-space ">
        <i class="fas fa-times" style="color:red !important;" onclick="deleteProduct('${tempId}')"></i>    
        <div class="card h-100  ">
                <div id="carousel${index}" class="carousel slide" data-ride="false" data-interval="false"    >
                    <ol class="carousel-indicators">
                        <li data-target="#carousel${index}" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel${index}" data-slide-to="1"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${data[index].pic[0]}" class="card-img-top" width="20%" height="25%" alt="Error">
                        </div>
                        <div class="carousel-item">
                            <img src="${data[index].pic[1]}" class="card-img-top" width="20%" height="25%" alt="Error">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carousel${index}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${index}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
        
                <div class="card-body">
                    <h5 class="card-title">${data[index].name}</h5>
                    <p class="card-text">COST: ${data[index].price}$</p>
                    <button type="button" onclick="add('${tempId}')" class="btn btn-outline-secondary">Add To Cart</button>
                    <br><br>
                    <button type="button" onclick="deleteProduct('${tempId}')" class="btn btn-outline-danger">delete Product</button>
                </div>
            </div>
          </div>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  