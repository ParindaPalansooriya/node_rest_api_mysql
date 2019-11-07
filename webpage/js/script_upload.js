
var dataSet_ID = "NO";
dataSet_ID = localStorage['999588parinda19960120_ID'];
if(dataSet_ID == "NO" || typeof dataSet_ID == 'undefined'){
    window.location.href = "http://localhost:4000/index.html";
}else{

var upload_File = document.getElementById("upload_form");
var upload_error = document.getElementById("upload_error");
var upload_btn = document.getElementById("upload_btn");
var upload_head = document.getElementById("upload_head");

var upload_reupload_btn = document.getElementById("upload_reupload_btn");
var upload_back_pro_btn = document.getElementById("upload_back_pro_btn");

upload_btn.addEventListener("click", function(){
    
     var dataset = new FormData(upload_File);
     var post_request = new XMLHttpRequest();
     post_request.onreadystatechange = function(){
        if(post_request.status >= 200 && post_request.status <= 400){
            upload_head.innerHTML = "Uploading Finish";
            document.getElementById("thank_upload_form").style.display = "block";
            document.getElementById("upload_form").style.display = "none";
        }else if(post_request.status == 422){
            upload_error.innerHTML="db name uploading error";
            upload_error.style.color = "#8f332c";
        }else{
            upload_error.innerHTML="Some Error. Please Try Again Later!";
            upload_error.style.color = "#8f332c";
        }
     };
     post_request.open("POST","http://localhost:4000/apiserver/uploadfile?id="+dataSet_ID, true);
     //post_request.setRequestHeader("Content-Type", "multipart/form-data");
     post_request.send(dataset);
});


upload_back_pro_btn.addEventListener("click", function(){
    window.location.href = "http://localhost:4000/profile.html";
});

upload_reupload_btn.addEventListener("click",function(){
    window.location.href = "http://localhost:4000/upload.html";
});

}
