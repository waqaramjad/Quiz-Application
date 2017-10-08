var database = firebase.database().ref("/");

database.child('users/').on("child_added", function (snapshot) {
    var obj = snapshot.val();
          console.log(obj)
        //   console.log(  JSON.stringify(obj))
          
        //  var a= JSON.stringify(obj);
        //   localStorage.setItem('quizzes',a);
          
  })

function checkRecord(){

    var userLogin=localStorage.getItem('userLogin');
    userLogin=JSON.parse(userLogin);
    userLogin=userLogin.name;
     //console.log("Current User",userLogin);

    var users= localStorage.getItem('users');
    users=JSON.parse(users);

    var index;

    for(var i=0;i<users.length;i++){
        if(userLogin=== users[i].name){
            index=i;
        }
    }
        //console.log("Index",index);

    if(!("record" in users[index])){
            users[index].record = [];
            alert('No test records found for this user!!'); 
    }
    else if("record" in users[index]){
        var records=users[index].record;
        //console.log("Records",records);
        if(records.length===0){
            alert('No test records found for this user!!'); 
        }
        else{
            var recordArrayName=[];
            var recordArrayPercentage=[];

    for(var i=0;i<records.length;i++){
        recordArrayName.push(records[i].name);
        recordArrayPercentage.push(records[i].percentage);
    }

    var tableElement=document.createElement('table');
    var titleRow=document.createElement('tr');
    var quizElement=document.createElement('th');
    var scoreElement=document.createElement('th');
    var quizTxt=document.createTextNode('Quiz Name');
    var scoreTxt=document.createTextNode('Score');
    quizElement.appendChild(quizTxt);
    scoreElement.appendChild(scoreTxt);
    titleRow.appendChild(quizElement);
    titleRow.appendChild(scoreElement);
    tableElement.appendChild(titleRow);

    for(var i=0;i<recordArrayName.length;i++){
        var newRow=document.createElement('tr');
        var nameElement=document.createElement('td');
        var percenElement=document.createElement('td');
        var nameTxt=document.createTextNode(recordArrayName[i]);
        var percenTxt=document.createTextNode(recordArrayPercentage[i]+"%");
        nameElement.appendChild(nameTxt);
        percenElement.appendChild(percenTxt);
        newRow.appendChild(nameElement);
        newRow.appendChild(percenElement);
        tableElement.appendChild(newRow);
    }

    var parent = document.getElementById('maindiv');
    parent.innerHTML="";
    var headElement=document.createElement('h3');
    headElement.style.color = 'white'
    headElement.setAttribute('id','heading2');
    var headTxt=document.createTextNode('Your attempted quizzes record');

    headElement.appendChild(headTxt);
    parent.appendChild(headElement);
    parent.appendChild(tableElement);

        }
    }

    

}