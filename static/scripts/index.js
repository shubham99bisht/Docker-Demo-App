function getUser(){
  var user = firebase.auth().currentUser;
  var userid = user.uid;
  document.getElementById("uid").value =userid;
  var ref = firebase.database().ref('Users/'+userid);

  ref.on('value', function(snapshot) {
    jsn = snapshot.val();
    document.getElementById("tid").value = String(parseInt(jsn["Prev_Task_ID"])+1);
  });
}

function Fill_Tasks()
{
	var jsn = "";
	var user = firebase.auth().currentUser;
	var userid = user.uid;
	var ref = firebase.database().ref('Data/'+userid);
  // <li>Hit the gym<a onclick="alert(\'Delete me?\');"><span class="close">×</span></a></li>

  getUser();

	ref.on('value', function(snapshot) {
		  jsn = snapshot.val();
			console.log(jsn);
			document.getElementById("myUL").innerHTML = "";

			for (var task_id in jsn)
		  {   console.log(jsn[task_id]);
          var g = document.createElement('li');
          g.id = task_id;
          g.addEventListener("click", Checked);
          if(jsn["status"]==1){
            g.classList.add("checked");
          }
					var task = jsn[task_id]["task"];

		      document.getElementById("myUL").appendChild(g);
		      var abc = task + '<a onclick="alert(\'Delete me?\');"><span class="close">×</span></a>';
		      document.getElementById(g.id).innerHTML=abc;
		   }
	});
}


Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
var list = document.getElementById("myUL");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


function Checked(){
  alert("LUL!");
}


// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // Write inputValue to Firebase
  	var userid = document.getElementById("uid").value;
    var prev = document.getElementById("tid").value;

    firebase.database().ref('Data/'+userid +'/'+ prev).update({
      "status": 0,
      "task": inputValue
    });

    firebase.database().ref('Users/'+userid).update({
      "Prev_Task_ID": prev
    });

    document.getElementById("myInput").value="";
  }
}


