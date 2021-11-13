let items = document.getElementById("items");

function getAllMessages() {
  fetch("getContants")
    .then((response) => response.json())
    .then((data) => {
      showOnDom(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
getAllMessages();

function showOnDom(data) {
  for (let index = 0; index < data.length; index++) {
    if(index%2){
        items.innerHTML += `<div style="background-color: blanchedalmond;">
            <p>Name: ${data[index].name}</p>
            <p>Email: ${data[index].email}</p>
            <p>Message: ${data[index].message}</p>
            <hr>
            </div>
            <br>
            `;    
    }             
    else{
        items.innerHTML += `<div style="background-color:darkgrey">
            <p>Name: ${data[index].name}</p>
            <p>Email: ${data[index].email}</p>
            <p>Message: ${data[index].message}</p>
            <hr>
            </div>
            <br>
            `;    
    } 
}
}
