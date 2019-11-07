var dataSet_ID = "NO"/*,dataSet_PASS="NO"*/;
var dataSet;
var num = 10;
var get_list_btn = document.getElementById("get_list_btn");
dataSet_ID = localStorage['999588parinda19960120_ID'];
//dataSet_PASS = localStorage['999588parinda19960120_PASS'];

if(dataSet_ID == "NO" || typeof dataSet_ID == 'undefined'){
    window.location.href = "http://localhost:4000/index.html";
}else{
    var get_request = new XMLHttpRequest();
    var url = "http://localhost:4000/apiserver/userimageinfo?id="+dataSet_ID;
    get_request.open("GET",url);
    get_request.onload = function(){
        dataSet = JSON.parse(get_request.responseText);
        if(get_request.status >= 200 && get_request.status <= 400){       //if our received data have any error, status will be in > 400 
            if(dataSet.length != 0){
                for(p=(dataSet.length-1); p>=0; p--){
                    document.getElementById(p+"_btn").style.display = "block";
                    document.getElementById(p+"_btn").innerHTML = dataSet[p].file_name;
                }
                document.getElementById("get_list_btn").style.display = "block";
                document.getElementById("download_loading").style.display = "none";
            }else{
                document.getElementById("download_loading").innerHTML = "No Files To Download!"
            }
        }else{
            document.getElementById("download_error").innerHTML="Some Error. Please Try Again Later!";
            document.getElementById("download_error").style.color = "#8f332c";
        }
    };
    get_request.onerror = function(){ // check request errors
        document.getElementById("download_error").innerHTML="Some Error have withh connection. Please Try Again";
        document.getElementById("download_error").style.color = "#8f332c";
        console.log("connection error");
    };
    get_request.send(); // send request
}

for(i=0; i<100; i++){
    if(i%2 == 0){
         document.write('<button onclick="btnClick('+i+')" style="display: none; margin-top: 10px" id="'+i+'_btn" class="btn3" >Loading..</button>');
     }else{
         document.write('<button onclick="btnClick('+i+')" style="display: none; margin-top: 10px" id="'+i+'_btn" class="btn4" >Loading..</button>');
     }
 }

function btnClick (id){
    window.open("http://localhost:4000/"+dataSet[id].file_name);
}