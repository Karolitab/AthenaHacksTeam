const buttonSignup= document.querySelector(".signup");
 const inputEmail= document.querySelector("#form3Example3c");
 const inputName= document.querySelector("#form3Example1c")
 const inputPassword = document.querySelector('#form3Example4c');

 /**inputName.addEventListener('keyup', (e)=>{
    inputName(e);
 })
 function nameValidation(e){ 
    const hint =inputName.parentElement.lastElementChild;
      console.log(hint);
    let nameValue = inputName.value;
    let nameTest= "";
    if(nameValue!=''){
        nameTest= true;
        inputName.parentNode.classList.remove('not-valid');
        inputName.parentNode.classList.add('valid');
        hint.style.display= "none";
        
    }else{
        inputName.parentNode.classList.remove('valid');
        inputName.parentNode.classList.add('not-valid');
        hint.style.display= "block";
        e.preventDefault();
        nameTest=false;
    }
    if(nameTest===false){
        e.preventDefault()
    }
  **//* 
  form.addEventListener('submit', (e)=>{
    if( inputName(e)){ 
        inputName(e);
    }else{
        e.preventDefault()
    }
 })
  }
  **/

 console.log(buttonSignup);
 buttonSignup.addEventListener("click", ()=>{
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const nameValue = inputName.value;

    let errorMessage = "";
    console.log(emailValue);
    console.log(passwordValue);
    console.log(nameValue);
    const payload = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
    }
     axios.post("http://localhost:8080/registerUser", payload)
     .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          errorMessage = "Success";
        } else {
          errormessage = "Error" ;
        }
      })
      // error in case email already exists in database
      .catch((error) => {
        if (error.response.status === 400) {
          errorMessage=  "Wrong email";
          console.log(errorMessage);
        } else {
            errorMessage=  "Error";
            console.log(errorMessage);
        }
      });
     });
