$(document).ready(function($) {
	$("#loginbtn").click(function()
	{
document.getElementById('errorMsg').textContent = "";
		var a=new Object();
		a.username=document.getElementById('loginusername').value;
		a.password=document.getElementById('loginpassword').value;


		$.post('/login',a,function (data) {
console.log(data)
if(data.resp){
	window.location.href = '/';
} else {
	document.getElementById('errorMsg').textContent = data.error;
}

		});
	});
});

