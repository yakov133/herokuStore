
function changeCarNum() {
    let num = document.getElementById("cartItems");
    num.style.color = "black";
  
    axios
      .get("/getCart/61903a03c4163ab1b03e925d")
      .then((response) => {
        num.innerText = response.data.proudcts.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  changeCarNum();
  
const input = document.getElementById("stayUpdated");
input.addEventListener("input",()=>{
    input.value = input.value.toUpperCase();    
})
function send(){
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.value.match(regexEmail)){
        alert("your email was updated");
        let value = document.getElementById("email").value;
        Email.send({
            Host : "smtp.mailtrap.io",
            Username : "ac91fc541ef82d",
            Password : "5e818af118d7cb",
            To : 'appleproject133@gmail.com',
            From : `${value}`,
            Subject : "Test email",
            Body : `Add me to your Newsletter ${value}`
        }).then(
        message => alert(message)
        );
        input.value = "";
    }else{
        let p = document.getElementById("wrongEmail");
        p.style="color:blue;font-size:46px;background-color:red;"
        p.innerText = "Email Was Error";
        setTimeout(()=>{
            p.innerText =""
        },3000)
    }
    
}


