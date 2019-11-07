//login
var login_btn = document.getElementById("login_btn");
var login_create_acc_btn = document.getElementById("login_create_acc_btn");
var login_forgot_btn = document.getElementById("login_forgot_btn");

var login_email = document.getElementById("login_email");
var login_pass = document.getElementById("login_pass");

//registation
var reg_btn = document.getElementById("reg_btn");
var reg_back_login_btn = document.getElementById("reg_back_login_btn");

var reg_name = document.getElementById("reg_name");
var reg_email = document.getElementById("reg_email");
var reg_pass = document.getElementById("reg_pass");
var reg_con_pass = document.getElementById("reg_con_pass");

//error massage tags
var login_error = document.getElementById("login_error");
var reg_error = document.getElementById("reg_error");


login_btn.addEventListener('click', function() {
   if(login_email.value == "" || login_email.value == null){
      login_error.innerHTML="Please Fill Email";
      login_error.style.color = "#8f332c";
   }else{
      if(login_pass.value == "" || login_pass.value == null){
         login_error.innerHTML="Please Fill Password";
         login_error.style.color = "#8f332c";
      }else{

         var get_request = new XMLHttpRequest();
         var url = "http://localhost:4000/apiserver/userlogin?email="+login_email.value;
         get_request.open("GET",url);
         get_request.onload = function(){
            var dataSet = JSON.parse(get_request.responseText);
            if(get_request.status >= 200 && get_request.status <= 400){       //if our received data have any error, status will be in > 400 
               if(dataSet.length == 1){ // check dataset array size. if it have morethan 1, its mean that email have 2 rows
                  if(login_pass.value == dataSet[0].password){ // check db password same as user entered password
                     console.log(dataSet[0]);
                     localStorage.setItem('999588parinda19960120_ID',dataSet[0].id);
                     //localStorage.setItem('999588parinda19960120_PASS',dataSet[0].password);
                     window.location.href = "http://localhost:4000/profile.html"; // going to profile page
                  }else{
                     login_error.innerHTML="Wrong Password or Email. Try againe";
                     login_error.style.color = "#8f332c";
                  }
               }else if(dataSet.length > 1){
                  login_error.innerHTML="Sorry, That email have more accounts therefore we closed it. You can create account againe";
                  login_error.style.color = "#8f332c";
                  console.log("that email have more accounts");
               }else{
                  login_error.innerHTML="Sorry, That email have not exist. Try with another or create an account";
                  login_error.style.color = "#8f332c";
                  console.log("that email have more accounts");
               }
            }else{
               login_error.innerHTML="Some Error. Please Try Again Later!";
               login_error.style.color = "#8f332c";
               console.log(dataSet[0]);
            }
         };
         get_request.onerror = function(){ // check request errors
            login_error.innerHTML="Some Error have withh connection. Please Try Again";
            login_error.style.color = "#8f332c";
            console.log("connection error");
         };
         get_request.send(); // send request
      }
   }
}); 

login_create_acc_btn.addEventListener("click", function(){
   document.getElementById("login_form").style.display = "none";
   document.getElementById("reg_form").style.display = "block";
});

reg_back_login_btn.addEventListener("click", function(){
   document.getElementById("login_form").style.display = "block";
   document.getElementById("reg_form").style.display = "none";
});

login_forgot_btn.addEventListener("click", function(){
   window.location.href = "http://localhost:4000/forgot.html";
});

reg_btn.addEventListener("click", function(){
   if(reg_name.value == "" || reg_name.value == null){
      reg_error.innerHTML="Please Fill Name";
      reg_error.style.color = "#8f332c";
   }else{
      if(reg_email.value == "" || reg_email.value == null){
         reg_error.innerHTML="Please Fill Email";
         reg_error.style.color = "#8f332c";
      }else{
         if(reg_pass.value == "" || reg_pass.value == null){
            reg_error.innerHTML="Please Fill Password";
            reg_error.style.color = "#8f332c";
         }else{
            if(reg_con_pass.value == "" || reg_con_pass.value == null){
               reg_error.innerHTML="Please Conform Password";
               reg_error.style.color = "#8f332c";
            }else{
               if(reg_con_pass.value != reg_pass.value){
                  reg_error.innerHTML="Passwords are not same. Try again";
                  reg_error.style.color = "#8f332c";
               }else{
                  var dataset1 = { // make json data set
                     'name' : reg_name.value,
                     'email' : reg_email.value,
                     'password' : reg_con_pass.value
                  };
                  var dataset = JSON.stringify(dataset1); // json data set convert to sending data line
                  var post_request = new XMLHttpRequest();
                  post_request.onreadystatechange = function(){
                     if(post_request.status >= 200 && post_request.status <= 400){
                        document.getElementById("login_form").style.display = "block";
                        document.getElementById("reg_form").style.display = "none";
                     }else if(post_request.status == 421){
                        reg_error.innerHTML="Email is exist. Please try with anotherone";
                        reg_error.style.color = "#8f332c";
                     }else{
                        reg_error.innerHTML="Some Error. Please Try Again Later!";
                        reg_error.style.color = "#8f332c";
                     }
                  };
                  post_request.open("POST","http://localhost:4000/apiserver/createuser", true);
                  post_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                  post_request.send(dataset);
               }
            }
         }
      }
   }
});