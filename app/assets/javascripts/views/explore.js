Bowalum.Views.ExploreView = Backbone.View.extend({
  initialize: function() {
    // console.log(this.collection);
  },
  
  template: JST["global/explore"],
  
  render: function() {
    var renderedContent = this.template({
      locations: this.collection
    });
    this.$el.html(renderedContent);
    this.$el.find("#map-fullscreen").css({"height":$(window).height()});
    // this._gMap();
    return this;
  },
  
  _gMap: function() {
    var stylesArray = [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}];
    var USCenter = new google.maps.LatLng(37, -97);
    // var calCenter = new google.maps.LatLng(37.872, -122.273);
    var mapOptions = {
      // zoom: 11,
      // center: calCenter
      zoom: 5,
      center: USCenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: stylesArray
    };
    
    var map = new google.maps.Map(
      this.$el.find('#map-fullscreen').get(0), mapOptions
    );
    
    // BOW INTEGRATION
    
    // NORMAL
    
    this.collection.models.forEach(function(loc, idx) {
      var pos = new google.maps.LatLng(loc.get('lat'), loc.get('lng'));
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: loc.get('name'),
        animation: google.maps.Animation.DROP
      });
    });
    
    // HEATMAP
    
    // var points = [];
    // this.collection.models.forEach(function(loc, idx) {
    //   points.push(new google.maps.LatLng(loc.get('lat'), loc.get('lng')));
    // });
    // var pointArray = new google.maps.MVCArray(points);
    // var heatmap = new google.maps.visualization.HeatmapLayer({
    //   data: pointArray
    // });
    // heatmap.setMap(map);
    
    
    // END OF BOW INTEGRATION
    
    // var marker = new google.maps.Marker({
    //   position: calCenter,
    //   map: map,
    //   title: "Berkeley",
    //   draggable: true,
    //   animation: google.maps.Animation.DROP
    // });
    
    
    
  }
})