const buttonSignup= document.querySelector(".signup");
 const inputEmail= document.querySelector("#form3Example3c");
 const inputName= document.querySelector("#form3Example1c")
 const inputPassword = document.querySelector('#form3Example4c');
 const form = document.querySelector('.form');

/**----------------------------- */

/** NAME INPUT
 * Adds an event listener for the Input Name box. REAL TIME ERROR MESSAGE
 * If the name input value is not empty, the valid style will be added to the input box 
 * If the name input value is empty, the not-valid style will be added and a hint will be displayed telling the user what to do
 */
 inputName.addEventListener('keyup', (e)=>{
    nameValidation(e);
 })
function nameValidation(e){
    const hint =inputName.parentElement.lastElementChild;
    let nameValue = inputName.value;
    let nameTest= "";
    if(nameValue!=''){
        nameTest= true;
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
}
/**----------------------------- */
/**EMAIL INPUT
 * An event listener is added to the Input Email Box. REAL TIME ERROR MESSAGE
 * If the Email input is empty, a hint will be displayed. CONDITIONAL ERROR MESSAGE
 * If the email value is equal to the email regex, the valid style will be added to the input box 
 * If the email value is not equal to the email regex, the not-valid style will be added to the input box  and a different hint will be displayed
 */
 inputEmail.addEventListener('keyup', (e)=>{
    emailValidation(e);
 })
 function emailValidation(e){
    const hint = inputEmail.parentElement.lastElementChild;
    let emailValue = inputEmail.value;
    const emailRegex = /\w+@[a-z]+(.com)+/ig;
    const valid = emailRegex.test(emailValue);

    if(!emailValue){
        hint.style.display= "block";
        inputEmail.parentNode.classList.add('not-valid');
        hint.innerHTML = "Email cannot be empty";
        e.preventDefault()
    }else{
        if(valid){
            inputEmail.parentNode.classList.remove('not-valid');
            inputEmail.parentNode.classList.add('valid');
            hint.style.display= "none";
        }else{
            inputEmail.parentNode.classList.remove('valid');
            hint.innerHTML = "Email must be formatted correctly";
            inputEmail.parentNode.classList.add('not-valid');
            hint.style.display= "block";
            e.preventDefault()
         }
    }
}


form.addEventListener('submit', (e)=>{
    if(nameValidation(e) || emailValidation(e)){
        nameValidation(e);  
        emailValidation(e);
    }else{
        e.preventDefault()
    }
 })

/**BACKEND
 */
 buttonSignup.addEventListener("click", (e)=>{
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    const nameValue = inputName.value;

    let errorMessage = "";
    console.log(emailValue);
    console.log(passwordValue);
    console.log(nameValue);
    const payload = {
        username: nameValue,
        email: emailValue,
        password: passwordValue,
    }
     axios.post("http://localhost:8080/registerUser", payload)
     .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          errorMessage = "Success";
          window.location.replace("../app/app2.html");
        } else {
          errormessage = "Error" ;
          e.preventDefault()
        }
      })
      // error in case email already exists in database
      .catch((error) => {
        if (error.response.status === 400) {
          errorMessage=  "Wrong email";
          console.log(errorMessage);
          e.preventDefault()
        } else {
            errorMessage=  "Error";
            console.log(errorMessage);
            e.preventDefault()
        }
      });
     });
