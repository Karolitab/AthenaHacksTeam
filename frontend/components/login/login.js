const buttonLogin= document.querySelector(".login");
const inputEmail2 = document.querySelector('#form3Example3c3');
const form = document.querySelector('form');
const inputName = document.querySelector('#form3Example1c');
const inputPassword = document.querySelector('#form3Example4c')


inputEmail2.addEventListener('keyup', (e)=>{
    emailValidation(e);
 })
 function emailValidation(e){
    const hint = inputEmail2.parentElement.lastElementChild;
    let emailValue = inputEmail2.value;
    const emailRegex = /\w+@[a-z]+(.com)+/ig;
    const valid = emailRegex.test(emailValue);

    if(!emailValue){
        hint.style.display= "block";
        inputEmail2.parentNode.classList.add('not-valid');
        hint.innerHTML = "Email cannot be empty";
        e.preventDefault()
    }else{
        if(valid){
            inputEmail2.parentNode.classList.remove('not-valid');
            inputEmail2.parentNode.classList.add('valid');
            hint.style.display= "none";
        }else{
            inputEmail2.parentNode.classList.remove('valid');
            hint.innerHTML = "Email must be formatted correctly";
            inputEmail2.parentNode.classList.add('not-valid');
            hint.style.display= "block";
            e.preventDefault()
         }
    }
}

 const inputEmail= document.querySelector("#form3Example3c3");
form.addEventListener('submit', (e)=>{
    if( emailValidation(e)){
        emailValidation(e);
    }else{
        e.preventDefault()
    }
 })
 
 buttonLogin.addEventListener("click", (e)=>{
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    let errorMessage = "";
    console.log(emailValue);
    console.log(passwordValue);
    const payload = {
        email: emailValue,
        password: passwordValue,
        status: "logging in",
    }
     axios.post("http://localhost:8080/loggingUser", payload)
     .then((response) => {
       console.log(response);
       if (response.status === 200) {
         //successfully logged in
         errorMessage = "Success";
         console.log(response.data);
         localStorage.setItem("subs", JSON.stringify(response.data.subscriptions));
         localStorage.setItem("email",emailValue);
          window.location.replace("../app/app2.html");
       } else {
         console.log("Some error ocurred");
         errorMessage = 'failure';
         
       }
     })
     .catch((error) => {
       console.log(error);
       // backend sends error due to wrong password
       if (error.response.status === 404) {
        errorMessage = "Invalid Credentials"
        console.log(errorMessage);
       }
       //backend sends error due to unregistered email
       
     });
 });

