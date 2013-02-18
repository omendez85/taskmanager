// Global object
window.taskManager = {

};

window.userManager = {
	id: 0, //auto
	name: "",
	users : [],
	initialize: function(user){
		if(user.length != 0){
			for(i=0; i < user.length; i++){
				userManager.addUser(user[i]);
			}
		}else{
			$(".users_list").append("NO USERS");
		}
		$(".add_user").click( function(){
            userManager.newUser();
        });
	},
	newUser: function(){
		var tmpl;

		$.get("js/templates/newuser.html", function(data) {
		  	var renderedPage = Mustache.render(data);
			$(".view_user").html(renderedPage);
			
			$(".new_form").submit( function(e){
				e.preventDefault();
				var new_user = $(".new_form .name").val();
				id = userManager.users.length + 1;

				var user = {'id': id,'name' : new_user};
				userManager.users.push(user);

				$(".view_user").html("USER " + new_user + " ADDED");
				renderuser = userManager.listUsers(user);
				$(".users_list").append(renderuser);
			});
		});	
	},
	addUser: function(user){
		userManager.users.push(user);
		var tmpl;

		$.get("js/templates/user.html", function(data) {
		  	var renderedPage = Mustache.render(data,user);
			$(".users_list").append(renderedPage);

			$(".edituser").click( function(){
	            var userid = $(this).val();
	            userManager.editUser(userid);
	        });
	        
	        $(".deluser").click( function(){
	            var userid = $(this).val();
	            userManager.deleteUser(userid);
	        });
		});        
	},
	listUsers: function(user){
		$.get("js/templates/user.html", function(data) {
		  	var renderedPage = Mustache.render(data,user);
			$(".users_list").append(renderedPage);
			
			$(".edituser").click( function(){
	            var userid = $(this).val();
	            userManager.editUser(userid);
	        });
	        
	        $(".deluser").click( function(){
	            var userid = $(this).val();
	            userManager.deleteUser(userid);
	        });
		});
	},
	updateUser: function(user){
		$.get("js/templates/updateuser.html", function(data) {
		  	var renderedPage = Mustache.render(data,user);
			$(".users_list .user_"+user.id+"").html(renderedPage);
			
			$(".edituser").click( function(){
	            var userid = $(this).val();
	            userManager.editUser(userid);
	        });
	        
	        $(".deluser").click( function(){
	            var userid = $(this).val();
	            userManager.deleteUser(userid);
	        });
		});
	},	
	deleteUser: function(userid){
		if(userManager.users.length != 0){
			for(i=0; i < userManager.users.length; i++){
				if(userManager.users[i].id == userid){
					var tmpl, arraypos, user;
					user = userManager.users[i];
					arraypos = i;
					$.get("js/templates/deluser.html", function(data) {
					  	var renderedPage = Mustache.render(data,user);
						$(".view_user").html(renderedPage);
						
						$(".del_cancel_user").click( function(e){
							e.preventDefault();
							$(".view_user").html("");
						});

						$(".del_form").submit( function(e){
							e.preventDefault();
							$(".view_user").html("USER " +userManager.users[arraypos].name + " DELETED");
							userManager.users.splice(arraypos,1);
							$(".users_list .user_"+arraypos+"").remove();
						});
					});
				}
			}
		}
	},
	editUser: function(userid){
		$(".view_user").html("");
		if(userManager.users.length != 0){
			for(i=0; i < userManager.users.length; i++){
				if(userManager.users[i].id == userid){
					user = userManager.users[i];
					var tmpl, arraypos;
					arraypos = i;

					$.get("js/templates/edituser.html", function(data) {
					  	var renderedPage = Mustache.render( data, user );
						$(".view_user").html(renderedPage);
						$(".edit_form").submit( function(e){
							e.preventDefault();
							var edit_user = $(".edit_form .name").val();
							userManager.users[arraypos].name = edit_user;
							$(".view_user").html("User " + userManager.users[arraypos].name + " saved");
							userManager.updateUser(userManager.users[arraypos]);
						});
					});
				}
			}
		}else{
			$(".view_user").html("NO USERS");
		}		
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



