// Global object
window.taskManager = {

};

window.userManager = {
	id: 0, //auto
	name: "",
	users : [],
	initialize: function(user){
		if(user.length != 0){
			for(i=0; i <= user.length; i++){
				User = {'id': user[i].id, 'name' : user[i].name};
				var tmpl;
				//$.get('js/templates/user.html',function(d){tmpl = d});
				tmpl = '<ul><li>{{name}}</li><li><button class="edituser" value="{{id}}">Edit User</button></li><li><button class="deluser" value="{{id}}" >Delete User</button></li></ul>';
				//tmpl = $("#userlst").innerHTML; 
				var renderedPage = Mustache.render( tmpl, User );
				$(".users_list").append(renderedPage);
			}
		}else{
			$(".users_list").append("NO USERS");
		}
		
	},
	deleteUser: function(){
		// if(this.id != 0 && this.id != ""){
		// 	//delte user
		// }
	},
	editUser: function(userid){
		// LLAMADO AJAX A LA DB PARA TRAER EL USUARIO JSON
		var User = {
			'id': userid,
		    'name' : 'mendez'
			};
		var edituser;
		//edituser = '<form action="#" class="edit_form">';
		edituser = '<div class="edit_form">';
		edituser += 'Name: <input type="name" value="'+User.name+'" />';
		edituser += '<input type="hidden" class="user_id" value="'+User.id+'" />';
		edituser += '<button class="save_user">Save</button>';
		edituser += '</div>';
		//edituser += '</form>';


		$(document.createElement("form"))
			.attr("class","edit_form")
			.submit(function(e){ 
					e.preventDefault();
					alert("click"); 
				})
			.appendTo("div.view_user");

		$(document.createElement("input"))
			.attr({class:"edit_form",type:"edit_form"})
			.appendTo("form.edit_form");

		// var divedit = document.createElement('div');
		// divedit.setAttribute("class", "edit_form"); 
		
		// var buttomedit = document.createElement('button');
		// buttomedit.setAttribute("value", "send"); 
		// buttomedit.setAttribute("class", "save_user"); 
		// var t=document.createTextNode("CLICK ME");
		// buttomedit.appendChild(t);

		// divedit.appendChild(buttomedit);
		// document.getElementById("view_user").appendChild(divedit);
		//$(document.body).append('<div class="mie">asd</div>');
		$(document.createElement("button")).attr("class","save_user").text("Test Link 2").click(function(){ alert("click"); }).appendTo("div.view_user");
	},
	saveEditUser: function(userid){
		// LLAMADO AJAX A LA DB PARA GUARDAR LOS DATOS
		$(".view_user").html('USER '+userid+' SAVE');
	}
};

var User = [{
	'id': 0,
    'name' : 'oscar'
	},{
	'id': 1,
    'name' : 'Javier'
	},{
	'id': 2,
    'name' : 'mendez'
	}
];

userManager.initialize(User);



