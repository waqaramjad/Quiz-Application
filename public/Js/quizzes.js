var database = firebase.database().ref("/");
var coins = localStorage.getItem('coins');
var totalCoins = document.getElementById('totalCoins');
totalCoins.innerHTML += coins;

var tbody = document.getElementById('tbody')
var username = document.getElementById("username");
var userData = localStorage.getItem('loggedInUser');
userData = JSON.parse(userData);

setUserName();
function setUserName (){
    username.innerHTML = 'Welcome '+userData.fName;
}

var keynObj = {};
database.child('quizes/').on("child_added", function (snapshot) {
    var obj = snapshot.val();
    var key = snapshot.key;
    console.log(obj);
    // keynObj[`${key}`] = obj;
    if(obj){
    renderAllQuizes(obj, key);
    }
  })

  let globalCounter = 1;
  function renderAllQuizes(obj, key) {
      let btn = key;
    let render = `
    <tr>
    <td>${globalCounter}</td>
    <td>${obj[0].name}</td>
    <td>${obj[0].syllabus}</td>
    <td>${obj[0].marks}</td>
    <td>${obj[0].passing}</td>
    <td>${obj[0].time} minutes</td>
    <td> <button id="${key}" class="btn-success form-control" onclick="attemptQuiz('${btn}','${obj[0].name}','${obj[0].instructions}')">AttempQuiz</button></td>
</tr>
    `;
    tbody.innerHTML += render;
    globalCounter++;
  }

  function attemptQuiz(key, name, instructions){
      console.log(name);
      localStorage.setItem('key', key)
      localStorage.setItem('quizName', name)
      localStorage.setItem('instructions', instructions)
      location = 'quiz.html';
}
  
// var quizzes = localStorage.getItem('quizzes');
// quizzes = JSON.parse(quizzes);
// console.log(quizzes);

// else{
//     var quizNames=[];
// for(var i=0;i<quizzes.length;i++){
//     quizNames.push(quizzes[i].name);
// }

// if(quizNames.length===0){
//     document.getElementById('none').innerHTML="No quizzes available right now";
// }
// else if(quizNames.length>0){
//     var identity="quiz";
//     var click;
//     for(var i=0;i<quizNames.length;i++){
//         var parent=document.getElementById('maindiv');
//         // var chuildUL=document.getElementById('listitem');
//         var breakline=document.createElement('br');        
//         // var list=document.createElement('li');
//         // list.setAttribute('class','list-group-item')
//         var anker=document.createElement('a');
//         anker.setAttribute('class','list-group-item')
//         identity=identity+(i+1);
//         click="startQuiz('"+identity+"')";
//         anker.setAttribute('id',identity);
//         anker.setAttribute('class','links');
//         anker.setAttribute('href','javascript:void(0)');
//         anker.setAttribute('onclick',click);
//         var ankerTxt=document.createTextNode(quizNames[i]);
//         anker.appendChild(ankerTxt);
//         // list.appendChild(anker)
//         // chuildUL.appendChild(list)
//         parent.appendChild(breakline);
//         parent.appendChild(anker);
//     }
// }

// }

// function startQuiz(param){
//     var auth=true;
//     var quizname=document.getElementById(param).innerHTML;
//     var userLogin=localStorage.getItem('userLogin');
//     userLogin=JSON.parse(userLogin);

//     //console.log(userLogin.record[0].name,userLogin.record.length);
//     if("record" in userLogin){
//         for(var i=0;i<userLogin.record.length;i++){
//         if(userLogin.record[i].name===quizname){
//             auth=false;
//         } 
//     }
// }

//    if(auth){
//     localStorage.setItem('startQuizName',quizname);
//     window.location='quiz.html';
// }
// else{
//     alert('You already attempted this quiz before,quiz cant be attempted more than once!');
//     var ele=document.getElementById(param);
//     ele.style.color="white";
// }
// }
