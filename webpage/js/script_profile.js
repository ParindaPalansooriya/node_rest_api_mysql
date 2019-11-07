var profile_signout_btn = document.getElementById("profile_signout_btn");
var profile_remove_btn = document.getElementById("profile_remove_btn");
var profile_upload_btn = document.getElementById("profile_upload_btn");
var profile_download_btn = document.getElementById("profile_download_btn");

var dataSet_ID = "NO"/*,dataSet_PASS="NO"*/;
dataSet_ID = localStorage['999588parinda19960120_ID'];
//dataSet_PASS = localStorage['999588parinda19960120_PASS'];

if(dataSet_ID == "NO" || typeof dataSet_ID == 'undefined'){
    window.location.href = "http://localhost:4000/index.html";
}else{
    var get_request = new XMLHttpRequest();
    var url = "http://localhost:4000/apiserver/userprofile?id="+dataSet_ID;
    get_request.open("GET",url);
    get_request.onload = function(){
        var dataSet = JSON.parse(get_request.responseText);
        if(get_request.status >= 200 && get_request.status <= 400){       //if our received data have any error, status will be in > 400 
            document.getElementById("profile_name").innerHTML = dataSet[0].name;
            document.getElementById("profile_email").innerHTML = dataSet[0].email;
            profile_signout_btn.addEventListener("click", function(){
                localStorage.removeItem('999588parinda19960120_ID');
                localStorage.removeItem('999588parinda19960120_PASS');
                window.location.href = "http://localhost:4000/index.html";
            });
                
            profile_upload_btn.addEventListener("click", function(){
                window.location.href = "http://localhost:4000/upload.html";
            });

            profile_download_btn.addEventListener("click", function(){
                window.location.href = "http://localhost:4000/download.html";
            });
                
            profile_remove_btn.addEventListener("click", function(){
                var delete_request = new XMLHttpRequest();
                delete_request.onreadystatechange = function(){
                    if(delete_request.status >= 200 && delete_request.status <= 400){
                        localStorage.removeItem('999588parinda19960120_ID');
                        localStorage.removeItem('999588parinda19960120_PASS');
                        window.location.href = "http://localhost:4000/index.html";
                    }else{
                        document.getElementById("profile_error").innerHTML="Some Error. Please Try Again Later!";
                        document.getElementById("profile_error").style.color = "#8f332c";
                        document.getElementById("profile_error").style.display = "block";
                    }
                };
                var qur = "http://localhost:4000/apiserver/userdelete?id="+dataSet_ID;
                delete_request.open("DELETE",qur);
                delete_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                delete_request.send();
            });
        }else{
            document.getElementById("profile_error").innerHTML="Some Error. Please Try Again Later!";
            document.getElementById("profile_error").style.color = "#8f332c";
            console.log(dataSet[0]);
        }
    };
    get_request.onerror = function(){ // check request errors
        document.getElementById("profile_error").innerHTML="Some Error have withh connection. Please Try Again";
        document.getElementById("profile_error").style.color = "#8f332c";
        console.log("connection error");
    };
    get_request.send(); // send request
}
