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

        database.child('quizes/').push(quizDetails);
        var key = database.child('quizes/').push(quizDetails).key;
        quizDetail.innerHTML = '';
        addQuestions(quizDetails, key);
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
function addQuestions(quizDetails, key) {
    var countQuestions = 0;
        console.log('sds');
        let addQuees = `
        <div class="col-lg-4 col-md-4">
        <div class="form-group">
            <h3 >Questions: <span id='countQuestions'> 0</span></h3>
            <label>Add Question</label>
            <input class="form-control" id = 'question'  />
            <div class="radio">
            <label><input type="radio" name="optradio" id='a'><input type='text' id= 'option1'></label>
          </div>
          <div class="radio">
            <label><input type="radio" name="optradio" id='b'><input type='text' id= 'option2'></label>
          </div>
          <div class="radio">
            <label><input type="radio" name="optradio" checked id = 'c'><input type='text' id= 'option3'></label>
          </div>
          <div class="input-group">
          <button class="btn-success form-control" id='questionSubmitBtn'>Submit</button>
         </div>
          <div class="input-group">
          <button class="btn-success form-control" id='finishBtn'>Finish</button>
          </div>
        </div>
    </div>
        `
        quizDetail.innerHTML = addQuees;

var countQuestionsSpan = document.getElementById('countQuestions');
var questionSubmitBtn = document.getElementById('questionSubmitBtn'); // created after
    questionSubmitBtn.onclick = function () {
        countQuestions++;
        countQuestionsSpan.innerHTML = countQuestions;
        let correct = 'option1';
        var radio1 = document.getElementById('a')
        var radio2 = document.getElementById('b')
        var radio3 = document.getElementById('c')

        if (radio2.checked) {
            correct = 'option2'
        }
        else if (radio3.checked) {
            correct = 'option3'
        }

        var question = document.getElementById('question')
        var opt1 = document.getElementById('option1');
        var opt2 = document.getElementById('option2');
        var opt3 = document.getElementById('option3');
        let questObj = {
            ques: question.value,
            option1: opt1.value,
            option2: opt2.value,
            option3: opt3.value,
            corrct: correct
        }
        database.child('quizes/'+key+'/questions/').push(questObj);
        console.log(questObj)
        question.value = '';
        opt1.value = '';
        opt2.value = '';
        opt3.value = '';
    }

    var finishBtn = document.getElementById('finishBtn');
    finishBtn.onclick = function () {
        location = 'ui.html'

    }
}