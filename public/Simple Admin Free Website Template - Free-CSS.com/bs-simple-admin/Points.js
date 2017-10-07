var database = firebase.database().ref('/');
var descriptionInput = document.getElementById('descriptionInput');
var description = document.getElementById('description');
var descriptionBtn = document.getElementById('descriptionBtn');
var notifyUser = document.getElementById('notifyUser');
//for points and referal
var pointsInput = document.getElementById('pointsInput');
var refralInput = document.getElementById('refralInput');
var pointsBtn = document.getElementById('pointsBtn');
var referalBtn = document.getElementById('referalBtn');

database.child('description').once('value',function(snapshot){
    let databaseDescription = snapshot.val();
     if(databaseDescription){
         description.innerHTML = databaseDescription;
     }
})

// Description Button event Listner
descriptionBtn.addEventListener('click', function(){
    if(WordsLengthGreaterThan50()){
        notifyUser.innerHTML = 'Description Updated !';
        notifyUser.style.color = 'green';
        database.child('description/').set(descriptionInput.value);
        descriptionInput.value = '';
    }
})

// Point Button event Listner
pointsBtn.addEventListener('click', function(){
    if(pointsInRange()){
        notifyUser.innerHTML = '';
        database.child('points/loginPoints').set(pointsInput.value)
        pointsInput.value = '';

    }
})

//Referal button event listner
referalBtn.addEventListener('click', function(){
    if(referalInRange()){
        notifyUser.innerHTML = '';
        database.child('points/refralPoints').set(refralInput.value)
        refralInput.value = '';

    }
})





function referalInRange(){
    if(isNaN(refralInput.value)){
        notifyUser.innerHTML = 'Enter Numbers Only !';
     return false;
 }
 if(refralInput.value > 1000 || refralInput.value < 1)
    {
        notifyUser.innerHTML = 'Undefined Value !';
        return false;
    }
    return true;
}

function pointsInRange(){
 if(isNaN(pointsInput.value)){
        notifyUser.innerHTML = 'Enter Numbers Only !';
     return false;
 }
 if(pointsInput.value > 1000 || pointsInput.value < 1)
    {
        notifyUser.innerHTML = 'Undefined Value !';
        return false;
    }
    return true;
}

function WordsLengthGreaterThan50(){
    if(descriptionInput.value === ''){
        descriptionInput.placeholder = 'Write description that is 50 words long atleast.'
        return false;
    }
    if(descriptionInput.value.length < 100){
        if(notifyUser.innerHTML === ''){
            notifyUser.appendChild(document.createTextNode('Write description that is 50 words long atleast.'));
            notifyUser.style.color = "red";
            return false;
        }
    }
    return true;
    
}


