
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		path = window.location.pathname.split("/")
		path = path[path.length-1]
		if(path=="login" || path==""){window.location.replace("index");}
		if(path=="signup"){first_login()}
		if(path=="index"){Fill_Tasks()}
		}

	else{
		path = window.location.pathname.split("/")
		path = path[path.length-1]
		if(path!="login" && path!="signup"){
		window.location.replace("login");}
	}
});

// <!--===============================================================================================-->

function login_function(){
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	console.log(email, password)

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorMessage = error.message;
		window.alert(errorMessage);
	});

}

// <!--===============================================================================================-->

function logout_function(){
		firebase.auth().signOut()
}

// <!--===============================================================================================-->
function new_account(){

	var email = document.getElementById("email").value;
	var password1 = document.getElementById("password1").value;
	var password2 = document.getElementById("password2").value;

	if (password1 != password2) {
      window.alert("\nPassword did not match: Please try again...")
      return false; }

	firebase.auth().createUserWithEmailAndPassword(email, password1).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  window.alert(errorMessage);
				return false;
			});
}

function first_login(){
	var user = firebase.auth().currentUser;
	var userId = user.uid;
	var email = user.email;
	var name = document.getElementById("username").value;

	firebase.database().ref('Users/' + userId).set({
		Email:email,
		Name:name
  }, function(error) {
    if (error) {
			alert(error);
		} else {
      alert("Hello, "+name+" you're successfully Registered! Please Login to continue.")
			firebase.auth().signOut()
			window.location.replace("login");
    }
  });
}


// <!--===============================================================================================-->


function addTask(vendor, date, amt, category){
  firebase.database().ref('Bills/shadrak/1007').set({
		Amount: amt,
		Category: category,
    Vendor: vendor,
    Date: date
  }, function(error) {
    if (error) {
      alert("The write failed..."+error);
    } else {
      alert("Data saved successfully!");
    }
  });
}


function DeleteTaskByID(id) {
	var user = firebase.auth().currentUser;
	r = confirm("Do you want to delete "+id+"?");
  if(r==1){
		console.log(id);
		firebase.database().ref('Bills/' + user.uid +'/'+ id).remove();
		document.getElementById(id).style.display="none";}
}
// <!--===============================================================================================-->

function dummy(){
	window.alert("I'm called");
}
