var database = firebase.database().ref("/");
var userDetailsMainDiv = document.getElementById('mainDiv')
var tbody = document.getElementById('tbody');
var hiddenDiv = document.getElementById('hidden');

database.child('users/').on("child_added", function (snapshot) {
    var obj = snapshot.val();
    console.log(obj)
          renderUserDetails(obj, snapshot.key);
  })

function renderUserDetails(obj, key){
hiddenDiv.style.visibility = 'visible'
tbody.innerHTML += `
<tr class="info">
<td>${key}</td>
<td>${obj.fName}</td>
<td>${obj.LName}</td>
<td>${obj.email}</td>
</tr>
`

}