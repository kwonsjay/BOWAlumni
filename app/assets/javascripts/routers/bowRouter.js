Bowalum.Routers.BowRouter = Backbone.Router.extend({
  initialize: function($content) {
    this.$content = $content
  },
  
  routes: {
    "": "root",
    "sign_in": "loginView",
    "explore": "exploreView",
    "add": "addView",
    "alumni/:id": "editView"
  },
  
  root: function() {
    var newRootView = new Bowalum.Views.RootView();
    this._switchView(newRootView, function() {
      // google.maps.event.trigger(map, "resize");
      newRootView._gMap.bind(newRootView)();
    });
  },
  
  loginView: function() {
    if (Bowalum.currentUser.get('id')) {
      Backbone.history.navigate("/explore", {trigger: true})
    }
    else {
      var newLoginView = new Bowalum.Views.LoginView();
      this._switchView(newLoginView, function() {
        window.$("input")[0].focus();
      });
    }
  },
  
  exploreView: function() {
    var newExploreView = new Bowalum.Views.ExploreView({
      collection: Bowalum.locations
    });
    this._switchView(newExploreView, function() {
      newExploreView._gMap.bind(newExploreView)();
    });
  },
  
  addView: function() {
    var newAddView = new Bowalum.Views.AddView();
    this._switchView(newAddView, function() {
      window.$("input")[0].focus();
    });
  },
  
  editView: function(id) {
    var newEditView = new Bowalum.Views.EditView({
      model: Bowalum.locations.get(id)
    });
    this._switchView(newEditView, function() {
      window.$("input")[0].focus();
    });
  },
  
  _switchView: function(newView, callback) {
    var that = this;
    if (this._prevView) {
      this._prevView.$el.fadeOut(200, function() {
        that._prevView.remove();
        that._prevView = newView;
        that.$content.html(newView.render().$el.fadeIn(200, function() {
          if (callback) {callback();}
        }));
      });
    }
    else {
      this._prevView = newView;
      this.$content.html(newView.render().$el.fadeIn(200, function() {
        if (callback) {callback();}
      }));
    }
  }
  
  // _switchView: function(newView) {
  //   if (this._prevView) {
  //     this._prevView.remove();
  //   }
  //   this._prevView = newView;
  //   this.$content.html(newView.render().$el);
  // }
  
})