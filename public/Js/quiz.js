



var quizname = localStorage.getItem('startQuizName');

var quizzes = localStorage.getItem('quizzes');
quizzes = JSON.parse(quizzes);

var questionNo=0;
var index;
    for(var i=0; i<quizzes.length;i++){
        if(quizzes[i].name===quizname){
            index=i;
            }
    }
var obtMarks=0;
var totalCorrect=0;

var totalmarks= quizzes[index].marks;
totalmarks = Number(totalmarks);
var time= quizzes[index].time; //timer ka kaam rehta ha start() mai hi hoga
time = Number(time);
var totalQues = quizzes[index].questionQuan;
totalQues = Number(totalQues);
var instructions = quizzes[index].instructions;
var syllabus = quizzes[index].syllabus;
var passing = quizzes[index].passing;

function overview(){
    var parent = document.getElementById('quizdiv');

    var quiznameElement = document.createElement('p');
    var nameTxt = document.createTextNode("Quiz Name: "+quizname);
    quiznameElement.appendChild(nameTxt);

    var instElement = document.createElement('p');
    var instTxt = document.createTextNode("Instructions: "+instructions);
    instElement.appendChild(instTxt);

    var marksElement = document.createElement('p');
    var marksTxt = document.createTextNode("Marks: "+totalmarks+" marks");
    marksElement.appendChild(marksTxt);

    var timeElement = document.createElement('p');
    var timeTxt = document.createTextNode("Time Duration: "+time+" minutes");
    timeElement.appendChild(timeTxt);

    var totalquesElement = document.createElement('p');
    var totalquesTxt = document.createTextNode("Total Questions: "+totalQues+" questions");
    totalquesElement.appendChild(totalquesTxt);

    var syElement = document.createElement('p');
    var syTxt = document.createTextNode("Syllabus: "+syllabus);
    syElement.appendChild(syTxt);

    var passElement = document.createElement('p');
    var passTxt = document.createTextNode("Passing percentage: "+passing+"%");
    passElement.appendChild(passTxt);

    var stQuizElement = document.createElement('button');
    stQuizElement.setAttribute('id','startButton');
    var stQuizTxt = document.createTextNode('Start Quiz');
    stQuizElement.setAttribute('onclick','start()');
    stQuizElement.appendChild(stQuizTxt);

    parent.appendChild(quiznameElement);
    parent.appendChild(instElement);
    parent.appendChild(marksElement);
    parent.appendChild(timeElement);
    parent.appendChild(totalquesElement);
    parent.appendChild(syElement);
    parent.appendChild(passElement);
    parent.appendChild(stQuizElement);
}

function start(){
    // var questions = quizzes[index].questions;
    var questions = quizzes[1];
    console.log(questions)

    console.log(questions)
    getTimer();
    showQues(questions); 
}

function scoringRadio(questions){
    var userSelect;
    var marks=questions[questionNo].marks;
    marks=Number(marks);

    if(document.getElementById('option1').checked){
        userSelect=document.getElementById('option1').value;
        userSelect = (userSelect === 'true');
        if(userSelect){obtMarks=obtMarks+marks;totalCorrect++;}
    }
    if(document.getElementById('option2').checked){
        userSelect=document.getElementById('option2').value;
        userSelect = (userSelect === 'true');
        if(userSelect){obtMarks=obtMarks+marks;totalCorrect++;}
    }
    if(document.getElementById('option3').checked){
        userSelect=document.getElementById('option3').value;
        userSelect = (userSelect === 'true');
        if(userSelect){obtMarks=obtMarks+marks;totalCorrect++;}
    }
    if(document.getElementById('option4').checked){
        userSelect=document.getElementById('option4').value;
        userSelect = (userSelect === 'true');
        if(userSelect){obtMarks=obtMarks+marks;totalCorrect++;}
    }
    questionNo++;
}

function scoringCheck(questions){
    var correctCount=0;
    var userCount=0;
    var val;
    var marks=questions[questionNo].marks;
    marks=Number(marks);

    for(var i=0;i<questions[questionNo].options.length;i++){
        if(questions[questionNo].options[i].correct==="true"){
            correctCount++;
        }
    }
    if(document.getElementById('option1').checked){
        val=document.getElementById('option1').value;
        if(val==='true'){userCount++;}
    }
    if(document.getElementById('option2').checked){
            val=document.getElementById('option2').value;
            if(val==='true'){userCount++;}
    }
    if(document.getElementById('option3').checked){
            val=document.getElementById('option3').value;
            if(val==='true'){userCount++;}
    }
    if(document.getElementById('option4').checked){
            val=document.getElementById('option4').value;
            if(val==='true'){userCount++;}
    }

    if(correctCount===userCount){
        obtMarks=obtMarks+marks;
        totalCorrect++;
    }
    
    questionNo++;
}

function nextQues(param){
if((document.getElementById('option1').checked===false)&&
(document.getElementById('option2').checked===false)&&
(document.getElementById('option3').checked===false)&&
(document.getElementById('option4').checked===false)){
    alert('Please select any option!');
}
else{
        var questions = quizzes[index].questions;
        if(param==="radio"){
            scoringRadio(questions);
        }
        else if(param==="checkbox"){
            scoringCheck(questions);
        }
        //alert("Obt marks is "+obtMarks);
        if(questionNo<totalQues){
            showQues(questions);
        }
        else{
            finish();
        }
}

}

function showQues(questions){
    //question data
    var question=questions[questionNo].question;

    var option1=questions[questionNo].options[0].option1;
    var option1value=questions[questionNo].options[0].correct;
    //option1value = (option1value === 'true');

    var option2=questions[questionNo].options[1].option2;
    var option2value=questions[questionNo].options[1].correct;
    //option2value = (option2value === 'true');

    var option3=questions[questionNo].options[2].option3;
    var option3value=questions[questionNo].options[2].correct;
    //option3value = (option3value === 'true');

    var option4=questions[questionNo].options[3].option4;
    var option4value=questions[questionNo].options[3].correct;
    //option4value = (option4value === 'true');

    var correctCount=0;
    for(var i=0;i<questions[questionNo].options.length;i++){
        if(questions[questionNo].options[i].correct==="true"){
            correctCount++;
        }
    }

    var parent = document.getElementById('quizdiv');
    parent.innerHTML="";

    var heads="Question "+(questionNo+1)+" of "+totalQues;
    var headElement=document.createElement('h4');
    var headTxt=document.createTextNode(heads);
    headElement.appendChild(headTxt);

    var questionElement = document.createElement('p');
    var questionTxt= document.createTextNode(question);
    questionElement.setAttribute('id','question');
    questionElement.appendChild(questionTxt);

    if(correctCount===1){
        var label1 =document.createElement('label');
        label1.setAttribute('class','options');
        var opt1Txt = document.createTextNode(option1);
        label1.appendChild(opt1Txt);
        var option1Element = document.createElement('input');
        option1Element.setAttribute('type','radio');
        option1Element.setAttribute('name','options');
        option1Element.setAttribute('id','option1');
        option1Element.setAttribute('value',option1value);
        

        var label2 =document.createElement('label');
        label2.setAttribute('class','options');
        var opt2Txt = document.createTextNode(option2);
        label2.appendChild(opt2Txt);
        var option2Element = document.createElement('input');
        option2Element.setAttribute('type','radio');
        option2Element.setAttribute('name','options');
        option2Element.setAttribute('id','option2');
        option2Element.setAttribute('value',option2value);
        

        var label3 =document.createElement('label');
        label3.setAttribute('class','options');
        var opt3Txt = document.createTextNode(option3);
        label3.appendChild(opt3Txt);
        var option3Element = document.createElement('input');
        option3Element.setAttribute('type','radio');
        option3Element.setAttribute('name','options');
        option3Element.setAttribute('id','option3');
        option3Element.setAttribute('value',option3value);
        

        var label4 =document.createElement('label');
        label4.setAttribute('class','options');
        var opt4Txt = document.createTextNode(option4);
        label4.appendChild(opt4Txt);
        var option4Element = document.createElement('input');
        option4Element.setAttribute('type','radio');
        option4Element.setAttribute('name','options');
        option4Element.setAttribute('id','option4');
        option4Element.setAttribute('value',option4value);
        

        var sumbitButton = document.createElement('button');
        sumbitButton.setAttribute('id','submit');
        var buttonTxt = document.createTextNode('Submit');
        sumbitButton.setAttribute('onclick',"nextQues('radio')");
         sumbitButton.appendChild(buttonTxt);

        parent.appendChild(headElement);
        parent.appendChild(questionElement);
        parent.appendChild(option1Element);
        parent.appendChild(label1);
        var breakLine1 = document.createElement('br');
        parent.appendChild(breakLine1);
        parent.appendChild(option2Element);
        parent.appendChild(label2);
        var breakLine2 = document.createElement('br');
        parent.appendChild(breakLine2);
        parent.appendChild(option3Element);
        parent.appendChild(label3);
        var breakLine3 = document.createElement('br');
        parent.appendChild(breakLine3);
        parent.appendChild(option4Element);
        parent.appendChild(label4);
        

         var breakLine4 = document.createElement('br');
         parent.appendChild(breakLine4);
         parent.appendChild(sumbitButton); 
    }
    else if(correctCount>1){
        var label1 =document.createElement('label');
        label1.setAttribute('class','options');
        var opt1Txt = document.createTextNode(option1);
        label1.appendChild(opt1Txt);
        var option1Element = document.createElement('input');
        option1Element.setAttribute('type','checkbox');
        option1Element.setAttribute('name','options');
        option1Element.setAttribute('id','option1');
        option1Element.setAttribute('value',option1value);
        

        var label2 =document.createElement('label');
        label2.setAttribute('class','options');
        var opt2Txt = document.createTextNode(option2);
        label2.appendChild(opt2Txt);
        var option2Element = document.createElement('input');
        option2Element.setAttribute('type','checkbox');
        option2Element.setAttribute('name','options');
        option2Element.setAttribute('id','option2');
        option2Element.setAttribute('value',option2value);
        

        var label3 =document.createElement('label');
        label3.setAttribute('class','options');
        var opt3Txt = document.createTextNode(option3);
        label3.appendChild(opt3Txt);
        var option3Element = document.createElement('input');
        option3Element.setAttribute('type','checkbox');
        option3Element.setAttribute('name','options');
        option3Element.setAttribute('id','option3');
        option3Element.setAttribute('value',option3value);
        

        var label4 =document.createElement('label');
        label4.setAttribute('class','options');
        var opt4Txt = document.createTextNode(option4);
        label4.appendChild(opt4Txt);
        var option4Element = document.createElement('input');
        option4Element.setAttribute('type','checkbox');
        option4Element.setAttribute('name','options');
        option4Element.setAttribute('id','option4');
        option4Element.setAttribute('value',option4value);
        

        var sumbitButton = document.createElement('button');
        sumbitButton.setAttribute('id','submit');
        var buttonTxt = document.createTextNode('Submit');
        sumbitButton.setAttribute('onclick',"nextQues('checkbox')");
         sumbitButton.appendChild(buttonTxt);

        parent.appendChild(headElement);
        parent.appendChild(questionElement);
        parent.appendChild(option1Element);
        parent.appendChild(label1);
        var breakLine1 = document.createElement('br');
        parent.appendChild(breakLine1);
        parent.appendChild(option2Element);
        parent.appendChild(label2);
        var breakLine2 = document.createElement('br');
        parent.appendChild(breakLine2);
        parent.appendChild(option3Element);
        parent.appendChild(label3);
        var breakLine3 = document.createElement('br');
        parent.appendChild(breakLine3);
        parent.appendChild(option4Element);
        parent.appendChild(label4);

         var breakLine4 = document.createElement('br');
         parent.appendChild(breakLine4);
         parent.appendChild(sumbitButton); 
    }

}

function finish(){
    var percen = (obtMarks*100)/totalmarks;

    var userLogin=localStorage.getItem('userLogin');
    userLogin=JSON.parse(userLogin);
    userLogin=userLogin.name;
    var quiz = localStorage.getItem('startQuizName');
    var users= localStorage.getItem('users');
    users=JSON.parse(users);
    var userlog=localStorage.getItem('userLogin');
    userlog=JSON.parse(userlog);

    var index;

    for(var i=0;i<users.length;i++){
        if(userLogin=== users[i].name){
            index=i;
        }
    }

    if(!("record" in users[index])){
        users[index].record=[];
    }
    if(!("record" in userlog)){
        userlog.record=[];
    }
    var rec ={
        name:quiz,
        percentage:percen
    }
    users[index].record.push(rec);
    users=JSON.stringify(users);
    localStorage.setItem('users',users);
    userlog.record.push(rec);
    userlog=JSON.stringify(userlog);
    localStorage.setItem('userLogin',userlog);
    

    var parent = document.getElementById('quizdiv');
    document.getElementById('timer').innerHTML="";
    document.getElementById('timer').style.display="none";
    parent.innerHTML="";
     if(percen<passing){
        var messageElement=document.createElement('h2');
        var stuName = localStorage.getItem('userLogin');
        stuName=JSON.parse(stuName);
        stuName=stuName.name;
        var messageTxt=document.createTextNode('Sorry '+stuName+',you are failed because of '+percen+'%');
        messageElement.appendChild(messageTxt);

        var totalElement=document.createElement('h4');
        var totalTxt=document.createTextNode('Total questions: '+totalQues);
        totalElement.appendChild(totalTxt);

        var attemptElement=document.createElement('h4');
        var attemptTxt=document.createTextNode('Correct questions: '+totalCorrect);
        attemptElement.appendChild(attemptTxt);

        var mybutton = document.createElement('button');
        var mybuttonTxt = document.createTextNode('Back to Quizzes');
        mybutton.setAttribute('onclick',"window.location='quizzes.html';localStorage.removeItem('startQuizName');");
        mybutton.setAttribute('id','back');
        mybutton.appendChild(mybuttonTxt);

        parent.appendChild(messageElement);
        parent.appendChild(totalElement);
        parent.appendChild(attemptElement);
        parent.appendChild(mybutton);
 
     }
     else if(percen>=passing){
        var messageElement=document.createElement('h2');
        var stuName = localStorage.getItem('userLogin');
        stuName=JSON.parse(stuName);
        stuName=stuName.name;
        var messageTxt=document.createTextNode('Congratulations '+stuName+',you have passed with '+percen+'%');
        messageElement.appendChild(messageTxt);

        var totalElement=document.createElement('h4');
        var totalTxt=document.createTextNode('Total questions: '+totalQues);
        totalElement.appendChild(totalTxt);

        var attemptElement=document.createElement('h4');
        var attemptTxt=document.createTextNode('Correct questions: '+totalCorrect);
        attemptElement.appendChild(attemptTxt);

        var mybutton = document.createElement('button');
        var mybuttonTxt = document.createTextNode('Back to Quizzes');
        mybutton.setAttribute('onclick',"window.location='quizzes.html';localStorage.removeItem('startQuizName');");
        mybutton.setAttribute('id','back');
        mybutton.appendChild(mybuttonTxt);

        parent.appendChild(messageElement);
        parent.appendChild(totalElement);
        parent.appendChild(attemptElement);
        parent.appendChild(mybutton);
     }

}

function getTimer(){
    var myVar = setInterval(myTimer , 1000);
    var min = time-1;
    var sec= 60;    
    function myTimer(){   
         sec--;
         if(sec == 0){
             if(min > 0){
             min--;
             sec = 60;
             }
             else{
                 clearInterval(myVar);
                 alert("Time's Up!");
                 finish();

             }
         }
         document.getElementById("timer").innerHTML ="Time Remaining: " + min + ":" + sec;
         
     }  
}  

