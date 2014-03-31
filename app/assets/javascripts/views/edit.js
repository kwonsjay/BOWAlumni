Bowalum.Views.EditView = Backbone.View.extend({
  
  initialize: function() {
    // console.log(this.model);
  },
  
  template: JST["global/edit"],
  
  events: {
    "submit form": "editAlumnus"
  },
  
  editAlumnus: function(event) {
    event.preventDefault();
    var that = this;
    this.$("button[name=edit]").prop("diabled", true);
    var token = $('meta[name="csrf-token"]').attr('content');
    var address = this.$("input[name=city]").val() + ", " + this.$("input[name=state]").val();
    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({"address": address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.k;
        var lng = results[0].geometry.location.A;
        
        $.ajax({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-Token', token);
          },
          type: "PUT",
          url: "/locations/" + that.model.escape('id') + ".json",
          data: {
            location: {
              year: this.$("input[name=class]").val(),
              name: this.$("input[name=name]").val(),
              major: this.$("input[name=major]").val(),
              email: this.$("input[name=email]").val(),
              city: this.$("input[name=city]").val(),
              state: this.$("input[name=state]").val(),
              country: this.$("input[name=country]").val(),
              job: this.$("input[name=job]").val(),
              description: this.$("textarea[name=description]").val(),
              privacy: this.$("input[name=private]").is(":checked"),
              lat: lat,
              lng: lng
            }
          },
          success: function(data) {
            var newLocation = new Bowalum.Models.Location(data.location);
            // Bowalum.locations.add(newLocation);
            Bowalum.locations.fetch({
              success: function() {
                Backbone.history.navigate("/explore", {trigger: true});
              }
            });
            // Backbone.history.navigate("/explore", {trigger: true});
            $('meta[name="csrf-token"]').attr('content', data.csrfToken);
          }
        });
      }
      else {
        window.$("#noticeModal").modal('show');
      }
    });
    
  },
  
  render: function() {
    var renderedContent = this.template({
      loc: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
})