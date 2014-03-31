Bowalum.Views.ExploreView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add change remove reset", this.render);
  },
  
  template: JST["global/explore"],
  
  events: {
    "click .edit": "editView"
  },
  
  editView: function(event) {
    var path = "/alumni/" + $(event.currentTarget).data('id');
    Backbone.history.navigate(path, {trigger: true});
  },
  
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
    // var USCenter = new google.maps.LatLng(37, -97);
    var worldCenter = new google.maps.LatLng(30, 0);
    // var calCenter = new google.maps.LatLng(37.872, -122.273);
    var mapOptions = {
      // zoom: 11,
      // center: calCenter
      zoom: 3,
      center: worldCenter,
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
      
      if (Bowalum.currentUser.get('id')) {
        var header = '<h4 class="name">' + loc.get('name') + '</h4>';
        var year = '<span class="info btm">Class of ' + loc.get('year') + '</span>';
        var job = '<span class="info">Occupation: ' + loc.get('job') + '</span>';
        var major = '<span class="info">Major: ' + loc.get('major') + '</span>';
        var city = '<span class="info">City: ' + loc.get('city') + '</span>';
        var description = '<span class="info btm">Description: ' + loc.get('description') + '</span>';
        var email;
        if (loc.get('privacy')) {
          email = '<span class="info">Email: Private</span>';
        }
        else {
          email = '<span class="info">Email: ' + loc.get('email') + '</span>';
        }
        var link = '<div class="ctr"><button type="button" data-id="' + loc.get('id') + '" class="btn btn-default edit">Edit</button></div>'
      
        var contentString = header + year + job + major + city + description + email + link;
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
    
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      }
      else {
        google.maps.event.addListener(marker, 'click', function() {
          window.$("#noticeModal").modal('show');
        });
      }
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