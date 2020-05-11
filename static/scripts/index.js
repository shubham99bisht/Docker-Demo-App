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


  // <div class="alert alert-secondary checked" style="font-size: 18px;">
  //   <a onclick="Checked(id)"> You should check in on some of those fields below.</a>
  //   <button type="button" class="close"  onclick="alert(id)">
  //     <span aria-hidden="true">&times;</span>
  //   </button>
  // </div>

  getUser();

	ref.on('value', function(snapshot) {
		  jsn = snapshot.val();
			console.log(jsn);
			document.getElementById("myUL").innerHTML = "";

      var color = "alert-primary"

			for (var task_id in jsn)
		  {   console.log(jsn[task_id]);

          if(jsn[task_id]["delete"]==1){
            delete_task(task_id);
          }
          else{
            if(color=="alert-secondary"){color="alert-primary"}
            else{color="alert-secondary"}

            var g = document.createElement('div');
            g.classList.add("alert");
            g.classList.add(color);
            g.classList.add("alert-dismissible");
            if(jsn[task_id]["status"]==1){g.classList.add("checked");}
            g.id = task_id;

            var a1 = '<a onclick="Checked(' + task_id+ "," + jsn[task_id]["status"] + ')">' + jsn[task_id]["task"] + '</a>'
            var a2 = '<button type="button" class="close"  onclick="delete_task(' + task_id +')"><span aria-hidden="true">&times;</span></button>'

  		      document.getElementById("myUL").appendChild(g);
  		      var abc = a1 + a2;
  		      document.getElementById(g.id).innerHTML=abc;
          }
		   }
	});
}


function Checked(tid, status){
    userid = document.getElementById("uid").value;
    if(status==1){status=0;}
    else{status=1;}

    firebase.database().ref('Data/'+userid +'/'+ tid).update({
      "status": status
    });
}


function delete_task(id) {
	var user = firebase.auth().currentUser;
	var r = confirm("Do you want to delete Task Id: "+id+"?");
  if(r){
		console.log(id);
		firebase.database().ref('Data/' + user.uid +'/'+ id).remove();
		// document.getElementById(id).style.display="none";
  }
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


