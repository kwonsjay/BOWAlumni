Bowalum.Models.Location = Backbone.Model.extend({
	urlRoot: function() {
	  return "/locations/" + this.get("id");
	}
});