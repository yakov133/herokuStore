

let element = document.getElementById("tbody");
let sum = 0
let num = document.getElementById("cartItems");

num.style.color = "black";


function makeCart(){
    axios
    .get("/getCart/61903a03c4163ab1b03e925d")
    .then((response) => {
      num.innerText = response.data.proudcts.length;
      let arr = response.data.proudcts;
      helperTogettheproducts(arr);
    })
    .catch((err) => {
      console.log(err);
    });
}


function helperTogettheproducts(arr) {
  axios
    .get("/getSpecificProducts",{ params: { arr }})
    .then((response) => {
      showCart(response.data);  
    })
    .catch((err) => console.log(err));
}

function showCart(data) {
  for (const iterator of data) {
    console.log(iterator);
    sum += iterator.price;
    element.innerHTML += `<tr id=${iterator.key} onclick = deleteFromDom('${iterator._id}','${iterator.key}','${iterator.price}')>
            <th scope="row">${iterator.id}</th>
            <td>${iterator.name}</td>
            <td>${iterator.price}$</td>
            <td>${iterator.category}</td>
            <td><img src="${iterator.pic[0]}" width="10%" height="20%" alt="${iterator.info}"></td>
            </tr>`;
  }
  changeTotal(sum)
}

makeCart();


const deleteFromDom = function(id,key,price){
    let del = document.getElementById(key);
    del.parentNode.removeChild(del);
    deleteFromData(price)
    const documentID = {id,key}
    deleteCartItem(documentID);
}
const deleteCartItem = documentID=>{
  
    axios
    .patch("deleteFromCart/61903a03c4163ab1b03e925d",{...documentID})
    .then((response) => {
        console.log("got successfuly deleted");
    })
    .catch((error) => console.log(error));
}

const deleteFromData = (price)=>{
    sum -= price;
    changeTotal(sum)
}

 function changeTotal(sum){
    let total = document.getElementById("total");
    total.innerText = ""
    if(sum != 0){
        total.innerText =`total cost ${sum}$`
    }
}
