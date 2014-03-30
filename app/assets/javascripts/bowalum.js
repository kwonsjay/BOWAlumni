window.Bowalum = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    var currentUser = JSON.parse($("#bootstrapped_user").html());
    Bowalum.currentUser = new Bowalum.Models.User(currentUser.user);
    Bowalum.locations = new Bowalum.Collections.Locations();
    Bowalum.locations.fetch({
      success: function() {
        new Bowalum.Routers.BowRouter($("#content"));
        Backbone.history.start();
      }
    });
    this._installHeader($("#header"));
  },
  
  _installHeader: function($header) {
    Bowalum.headerView = new Bowalum.Views.HeaderView({
      model: Bowalum.currentUser
    });
    $header.html(Bowalum.headerView.render().$el);
  }
  
};

$(document).ready(function(){
  Bowalum.initialize();
});
