var passingPer = document.getElementById('passingPer');
var totalQues = document.getElementById('totalQues');
var time = document.getElementById('time');
var score = document.getElementById('score');
var instructions = document.getElementById('instructions');
var subject = document.getElementById('subject');
var quiz = document.getElementById('quiz');
var quizDetail = document.getElementById('quizDetails');
var database = firebase.database().ref('/');
var quizQuestions = document.getElementById('quizQuestions');
var questionArray = [];
var quizDetailsArray = [];
//if validated then add to firebase
function validateThenAddDataToFirebase() {
    if (validate()) {
        var quizDetails = {
            name: quiz.value,
            marks: score.value,
            time: time.value,
            instructions: instructions.value,
            syllabus: subject.value,
            questQuantity: totalQues.value,
            passing: passingPer.value
        };
        
        //var key = database.child('quizes/').push(quizDetails).key;
        //database.child('quizes/'+key).set(quizDetails);
        quizDetailsArray.push(quizDetails);
        quizDetail.innerHTML = '';
        addQuestions(quizDetails);
    }
}

// validate all the entries
function validate() {
    if ((!(quiz.value === "")) && (!(subject.value === "")) && (!(instructions.value === ""))
        && (!(score.value === "")) && (!(time.value === "")) && (!(totalQues.value === ""))
        && (!(passingPer.value === ""))) {
        return true;
    }
    else {
        alert('Some Fields are empty !!')
        return false;
    }
}


// Now add questions to the quiz
function addQuestions(quizDetails) {
    var countQuestions = 0;
        let addQuees = `
        <div class="col-lg-10 col-md-10">
        <div class="form-group">
            <h3 >Questions: <span id='countQuestions'> 0</span></h3>
            <label>Add Question</label>
            <input class="form-control" id = 'question' placeholder='Enter question here !'  />
            <div class="radio">
            <label><input type="radio" name="optradio" id='a'><input type='text' id= 'option1'  placeholder='option1'></label>
          </div>
          <div class="radio">
            <label><input type="radio" name="optradio" id='b'><input type='text' id= 'option2' placeholder='option2'></label>
          </div>
          <div class="radio">
            <label><input type="radio" name="optradio" checked id = 'c'><input type='text' id= 'option3' placeholder='option3'></label>
          </div>
          <div class="input-group">
          <button class="btn-success form-control" id='questionSubmitBtn'>NextQuestion</button>
         </div>
          <div class="input-group">
          <button class="btn-success form-control" id='finishBtn'>FinishQuiz</button>
          </div>
        </div>
    </div>
        `
        quizDetail.innerHTML = addQuees;

var countQuestionsSpan = document.getElementById('countQuestions');
var questionSubmitBtn = document.getElementById('questionSubmitBtn'); // created after
    
questionSubmitBtn.onclick = function () {
    var question = document.getElementById('question')
    var opt1 = document.getElementById('option1');
    var opt2 = document.getElementById('option2');
    var opt3 = document.getElementById('option3');

    if(question.value === '' || opt1.value === '' || opt2.value === '' || opt3.value === ''){
        alert('Fill all the fields.');
    }
    else{
        countQuestions++;
        countQuestionsSpan.innerHTML = countQuestions;
        let option1Bool = false;
        let option2Bool = false;
        let option3Bool = false;
        let radio1 = document.getElementById('a')
        let radio2 = document.getElementById('b')
        let radio3 = document.getElementById('c')
        if (radio1.checked) {
            option1Bool = true;
        }
        else if (radio2.checked) {
            option2Bool = true;
        }
        else if (radio3.checked) {
            option2Bool = true;        
        }
        let questObj = {
            question : question.value,
            options: [
                {
                    option1 : opt1.value,
                    correct: option1Bool
                },
                {
                    option2 : opt2.value,
                    correct: option2Bool
                },
                {
                    option3 : opt3.value,
                    correct: option3Bool
                }
            ]
        }
        questionArray.push(questObj);
        //database.child('quizes/'+key+'/questions/').push(questObj);
        question.value = '';
        opt1.value = '';
        opt2.value = '';
        opt3.value = '';
    }
}

    var finishBtn = document.getElementById('finishBtn');
    finishBtn.onclick = function () {
        quizDetailsArray.push(questionArray)
        database.child('quizes/').push(quizDetailsArray);
        if(question.value === '' || opt1.value === '' || opt2.value === '' || opt3.value === ''){}
        location = 'ui.html'

    }
}