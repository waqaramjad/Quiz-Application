
var database = firebase.database().ref('/');
var firstName = document.getElementById('firstname')
var LastName = document.getElementById('lastname')
var email = document.getElementById('email')
var password = document.getElementById('passwd')

// loginform

var LogEmail = document.getElementById('login-username')
var logPass = document.getElementById('login-password')

<<<<<<< HEAD
function login()
{
    console.log('wiki')
    if(LogEmail.value==='admin789'&&logPass.value==='quiz987')
    {    window.location = '../Simple Admin Free Website Template - Free-CSS.com/bs-simple-admin/assets/index.html'}
else
    {
    document.getElementById('loginform')
    .addEventListener("submit", function (event) {
=======
// Get points and add them in local storage
database.child('points').once('value', function(snapshot){
    let points = snapshot.val();
    localStorage.setItem('points',JSON.stringify(points));
})
document.getElementById('loginform').addEventListener("submit", function (event) {
>>>>>>> 6738f0f749b3be0546a0f1c20144cf8a1c8be6bb
        event.preventDefault()
        var user = {
            email: LogEmail.value,
            password: logPass.value
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (res) {
                console.log(res.uid)
                database.child('users/' + res.uid).once('value', function (snapshot) {
                        var convert = JSON.stringify(snapshot.val())
                        convert.password = '';
                        localStorage.setItem('loggedInUser', convert)
                        localStorage.setItem('uid', snapshot.key)
                        location = 'Student Quiz/student.html'
                        console.log(convert)
                    })
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });

    })
}
}
//  sign up form
function submit1()
{
  
    var user = {

        fName: firstName.value,
        LName: LastName.value,
        email:email.value,
        pass:password.value
    }
    
    firebase.auth().
    createUserWithEmailAndPassword(user.email,user.pass)
    .then(function (res) {
        console.log(res)
        database.child('users/' + res.uid).set(user)
    })

    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

}
