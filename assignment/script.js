function clearMessage(){
document.getElementById("messageBox").innerHTML="";
}
function validateLogin(){
var username=document.getElementById("username").value;
var password=document.getElementById("password").value;
var messageBox=document.getElementById("messageBox");
messageBox.innerHTML="";
if(username===""){
messageBox.innerHTML="Username cannot be empty!";
messageBox.className="message error";
return;
}
if(username.length<3){
messageBox.innerHTML="Username must be at least 3 characters!";
messageBox.className="message error";
return;
}
if(password===""){
messageBox.innerHTML="Password cannot be empty!";
messageBox.className="message error";
return;
}
if(password.length<6){
messageBox.innerHTML="Password must be at least 6 characters!";
messageBox.className="message error";
return;
}
messageBox.innerHTML="Login Successful! Welcome, "+username+".";
messageBox.className="message success";
}