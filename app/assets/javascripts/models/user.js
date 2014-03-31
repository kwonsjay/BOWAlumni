Bowalum.Models.User = Backbone.Model.extend({
	urlRoot: function() {
	  return "/users/" + this.get("id");
	},
	
	validate: function() {
		var errors = [];
		
		if (!this.get('user').email || this.get('user').email.length == 0) {
			errors.push("Email can't be blank!");
		}
		if (!this.get('user').password || this.get('user').password.length == 0) {
			errors.push("Password can't be blank!");
		}
		
		return errors.length == 0 ?  undefined : errors;
	}
});