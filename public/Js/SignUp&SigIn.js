
var database = firebase.database().ref('/');
var firstName = document.getElementById('firstname')
var LastName = document.getElementById('lastname')
var email = document.getElementById('email')
var password = document.getElementById('passwd')

// loginform

var LogEmail = document.getElementById('login-username')
var logPass = document.getElementById('login-password')

document.getElementById('loginform')
    .addEventListener("submit", function (event) {
        event.preventDefault()
        var user = {
            email: LogEmail.value,
            password: logPass.value
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (res) {
                console.log(res.uid)
                database.child('users/' + res.uid)
                    .once('value', function (snapshot) {
                        var convert = JSON.stringify(snapshot.val())
                        localStorage.setItem('loggedInUser', convert)
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
