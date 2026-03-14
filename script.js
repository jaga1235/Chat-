// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAXqO23ggcNB_btxIEMJDPHOSM1OGdG4oc",
  authDomain: "big-winner-91782.firebaseapp.com",
  databaseURL: "https://big-winner-91782-default-rtdb.firebaseio.com",
  projectId: "big-winner-91782",
  storageBucket: "big-winner-91782.firebasestorage.app",
  messagingSenderId: "1088925682784",
  appId: "1:1088925682784:web:69462cd6a702422ebb0705",
  measurementId: "G-L5Z6VY870S"
};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let currentUser = "";
let selectedUser = "";


// LOGIN FUNCTION
window.login = function(){

let pass = document.getElementById("password").value;

if(pass === "845600"){

document.getElementById("loginPage").style.display="none";
document.getElementById("agentPanel").style.display="block";

loadUsers();

}
else{

currentUser = pass;

document.getElementById("loginPage").style.display="none";
document.getElementById("userPanel").style.display="block";

loadUserChat();

}

}


// USER SEND MESSAGE
window.sendUserMessage = function(){

let msg = document.getElementById("userMessage").value;

push(ref(db,"chats/"+currentUser),{

sender:"user",
text:msg,
time:Date.now()

});

document.getElementById("userMessage").value="";

}


// LOAD USER CHAT
function loadUserChat(){

onValue(ref(db,"chats/"+currentUser),(snapshot)=>{

let box = document.getElementById("userChatBox");

box.innerHTML="";

snapshot.forEach((data)=>{

let m=data.val();

let div=document.createElement("div");

div.innerText=m.text;

box.appendChild(div);

});

});

}


// LOAD USERS LIST (AGENT)
function loadUsers(){

onValue(ref(db,"chats"),(snapshot)=>{

let list=document.getElementById("users");

list.innerHTML="";

snapshot.forEach((user)=>{

let li=document.createElement("li");

li.innerText=user.key;

li.onclick=()=>openChat(user.key);

list.appendChild(li);

});

});

}


// OPEN USER CHAT
function openChat(user){

selectedUser=user;

document.getElementById("chatUser").innerText=user;

onValue(ref(db,"chats/"+user),(snapshot)=>{

let box=document.getElementById("agentChatBox");

box.innerHTML="";

snapshot.forEach((data)=>{

let m=data.val();

let div=document.createElement("div");

div.innerText=m.sender+" : "+m.text;

box.appendChild(div);

});

});

}


// AGENT SEND MESSAGE
window.sendAgentMessage=function(){

let msg=document.getElementById("agentMessage").value;

push(ref(db,"chats/"+selectedUser),{

sender:"agent",
text:msg,
time:Date.now()

});

document.getElementById("agentMessage").value="";

}
