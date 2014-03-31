Bowalum.Views.RootView = Backbone.View.extend({
  
  initialize: function() {
    this.listenTo(Bowalum.currentUser, "change", this.render);
  },
  
  template: JST["global/root"],
  
  events: {
    "click .network": "redirectExplore"
  },
  
  redirectExplore: function() {
    Backbone.history.navigate("/explore", {trigger: true});
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    // this._gMap();
    return this;
  },
  
  _gMap: function() {
    var stylesArray = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];
    var calCenter = new google.maps.LatLng(36, -79);
    var mapOptions = {
      zoom: 11,
      center: calCenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: stylesArray
    };
    
    map = new google.maps.Map(
      this.$el.find('#map-canvas').get(0), mapOptions
    );
    
    var marker = new google.maps.Marker({
      position: calCenter,
      map: map,
      title: "Duke University",
      animation: google.maps.Animation.DROP
    });
    
    var contentString = '<h4>Duke University</h4>'
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
    
  }
  
})