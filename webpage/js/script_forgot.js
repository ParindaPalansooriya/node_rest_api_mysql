//forgot
var forgot_send_btn = document.getElementById("forgot_send_btn");
var forgot_submit_btn = document.getElementById("forgot_submit_btn");
var forgot_resend_btn = document.getElementById("forgot_resend_btn");
var forgot_change_pass_btn = document.getElementById("forgot_change_pass_btn");

var forgot_email = document.getElementById("forgot_email");
var forgot_code = document.getElementById("forgot_code");
var forgot_new_pass = document.getElementById("forgot_new_pass");
var forgot_con_new_pass = document.getElementById("forgot_con_new_pass");

var forgot_email_error = document.getElementById("forgot_email_error");
var forgot_code_error = document.getElementById("forgot_code_error");
var forgot_pass_error = document.getElementById("forgot_pass_error");

var mainCode,mainID;

forgot_send_btn.addEventListener("click", function(){
    console.log("dataSet");
    if(forgot_email.value != "" || forgot_email.value != null){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgot_email.value)){ // chech image is in correct order
            forgot_email_error.innerHTML="Email is sending. Please waite!";
            forgot_email_error.style.color = "#099915";
            var get_request = new XMLHttpRequest();
            var qur = "http://localhost:4000/apiserver/forgotcode?email="+forgot_email.value;
            get_request.open("GET",qur);
            get_request.onload = function(){
                var dataSet = JSON.parse(get_request.responseText);
                if(get_request.status >= 200 && get_request.status <= 400){
                    mainCode = dataSet.massage;
                    mainID = dataSet.id;
                    forgot_email_error.innerHTML="Email is send. Please cleck in the SPAM section";
                    forgot_email_error.style.color = "#929b10";
                    document.getElementById("forgot_email_form").style.display = "none";
                    document.getElementById("forgot_code_form").style.display = "block";
                }else if(get_request.status == 421){
                    forgot_email_error.innerHTML="Email is not exist. Please try with anotherone";
                    forgot_email_error.style.color = "#8f332c";
                }else if(get_request.status == 411){
                    forgot_email_error.innerHTML="Email sending error. Please check your connection and email.";
                    forgot_email_error.style.color = "#8f332c";
                }else{
                    forgot_email_error.innerHTML="Some Error. Please Try Again Later!";
                    forgot_email_error.style.color = "#8f332c";
                }
            };
            get_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            get_request.onerror = function(){
            forgot_email_error.innerHTML="Some Error have withh connection. Please Try Again";
            forgot_email_error.style.color = "#8f332c";
            };
            get_request.send();
        }else{
            forgot_email_error.innerHTML="Email is not in Correct Order";
            forgot_email_error.style.color = "#8f332c";
        }
    }else{
        forgot_email_error.innerHTML="Please Fill Email";
        forgot_email_error.style.color = "#8f332c";
    }           
});

forgot_resend_btn.addEventListener("click", function(){
    document.getElementById("forgot_email_form").style.display = "block";
    document.getElementById("forgot_code_form").style.display = "none";
});

forgot_submit_btn.addEventListener("click", function(){
    if(mainCode == forgot_code.value){
        document.getElementById("forgot_pass_form").style.display = "block";
        document.getElementById("forgot_code_form").style.display = "none";
    }else{
        forgot_code_error.innerHTML="Increct CODE. Please check and try again";
    }
});

forgot_change_pass_btn.addEventListener("click",function(){
    if(forgot_new_pass.value != "" || forgot_new_pass.value != null){
        if(forgot_con_new_pass.value != "" || forgot_con_new_pass.value != null){
            if(forgot_new_pass.value == forgot_con_new_pass.value){
                var put_request = new XMLHttpRequest();
                var qur = "http://localhost:4000/apiserver/userupdate?id="+mainID;
                var dataset2 = {
                    'password' : forgot_new_pass.value
                 };
                 var dataset = JSON.stringify(dataset2);
                 put_request.onreadystatechange = function(){
                    if(put_request.status >= 200 && put_request.status <= 400){
                        window.location.href = "http://localhost:4000/index.html";
                    }else if(put_request.status == 411){
                        forgot_pass_error.innerHTML="Id information incirrect. Refresh nad try again";
                        forgot_pass_error.style.color = "#8f332c";
                    }else if(put_request.status == 412){
                        forgot_pass_error.innerHTML="That is your old password. Please enter a deferent password";
                        forgot_pass_error.style.color = "#929b10";
                    }else{
                        forgot_pass_error.innerHTML="Some Error. Please Try Again Later!";
                        forgot_pass_error.style.color = "#8f332c";
                    }
                 };
                 put_request.open("PUT",qur, true);
                 put_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                 put_request.send(dataset);
            }else{
                forgot_pass_error.innerHTML = "Password are not matched";
                forgot_pass_error.style.color = "#8f332c";
            }
        }else{
            forgot_pass_error.innerHTML = "Please conform your new password";
            forgot_pass_error.style.color = "#8f332c";
        }
    }else{
        forgot_pass_error.innerHTML = "Please enter your new password";
        forgot_pass_error.style.color = "#8f332c";
    }
});