var database = firebase.database().ref("/");
var tbody = document.getElementById('tbody') // Table Body

var globalCounter = 0;

database.child('quizes/').once("value", function (snapshot) {
    var obj = snapshot.val();
    let key;
    key = obj[Object.keys(obj)[0]];
    console.log(obj[Object.keys(obj)[0]]);
    console.log(key)
   
      renderAllQuizesData(obj, key);
  })

  function renderAllQuizesData(obj, key){
      console.log(key.name)
      console.log(key.marks)
      console.log(key.time)

      globalCounter++;
      let render = `
      <tr>
      <td>${globalCounter}</td>
      <td>${key.name}</td>
      <td>${key.syllabus}</td>
      <td>${key.marks}</td>
      <td>${key.passing}</td>
      <td>${key.time} minutes</td>
  </tr>
      `;

      tbody.innerHTML += render;
  }