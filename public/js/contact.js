const messageName = document.getElementById("name");
const message = document.getElementById("message");
const email = document.getElementById("email");



const form = document.getElementById("form");

form.addEventListener("submit", afterSubmitAction);

function afterSubmitAction(event) {
  event.preventDefault();

  let obj = {
    name: messageName.value,
    email: email.value,
    message: message.value,
  };

  
  axios
    .post("/insertContact", obj)
    .then((response) => {
      const pop = document.getElementById("pop");
      if ((response.statusText = "Created")) {
        pop.innerHTML = `<h2 style="color:bisque;text-align:center;margin-bottom: 2%;">Message Successfully Sent</h2>`;
        setTimeout(() => {
          pop.innerHTML = "";
          messageName.value="";
          message.value="";
          email.value="";
        }, 3000);
      } 
    })
    .catch((error) => {
      console.log(error);
    });
}
