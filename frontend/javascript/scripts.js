
/**Variables used for validation */
const inputEmail = document.querySelector('#form3Example3c');
const form = document.querySelector('form');
const inputName = document.querySelector('#form3Example1c');
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



