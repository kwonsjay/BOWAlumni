Bowalum.Views.HeaderView = Backbone.View.extend({
  
  template: JST["global/header"],
  
  events: {
    "click .signout": "logoutUser",
    "click .signin": "loginUser",
    "click .brandtext": "root"
  },
  
  initialize: function() {
    this.listenTo(this.model, "change remove reset", this.render);
  },
  
  loginUser: function() {
    Backbone.history.navigate("/sign_in", {trigger: true});
  },
  
  logoutUser: function() {
    var token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
      type: "DELETE",
      url: "/users/sign_out",
      success: function(data) {
        Cplaplcs.currentUser.clear();
        Backbone.history.navigate("/", {trigger: true});
        $('meta[name="csrf-token"]').attr('content', data.csrfToken);
      },
      error: function(xhr, status, error) {
        alert(xhr.responseText);
      }
    });
  },
  
  root: function() {
    Backbone.history.navigate("/", {trigger: true});
  },
  
  render: function() {
    var renderedContent = this.template({
      model: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
  
})