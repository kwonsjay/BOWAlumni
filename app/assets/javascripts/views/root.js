Bowalum.Views.RootView = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(Bowalum.currentUser, "change", this.render);
  },
  
  template: JST["global/root"],
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    // this._gMap();
    return this;
  },
  
  _gMap: function() {
    var calCenter = new google.maps.LatLng(37.872, -122.273);
    var mapOptions = {
      zoom: 11,
      center: calCenter
    };
    
    map = new google.maps.Map(
      this.$el.find('#map-canvas').get(0), mapOptions
    );
    
    var marker = new google.maps.Marker({
      position: calCenter,
      map: map,
      title: "Berkeley",
      animation: google.maps.Animation.DROP
    });
    
  }
  
})