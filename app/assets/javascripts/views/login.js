Bowalum.Views.LoginView = Backbone.View.extend({
  template: JST["global/login"],
  
  events: {
    "submit form": "submitUser"
  },
  
  submitUser: function(event) {
    event.preventDefault();
    var that = this;
    var token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-CSRF-Token', token);
      },
      type: "POST",
      url: "/users/sign_in.json",
      data: {
        user: {
          email: this.$("input[name=email]").val(),
          password: this.$("input[name=password]").val(),
          remember_me: this.$("input[name=remember]").is(":checked")
        }
      },
      success: function(data) {
        Bowalum.currentUser.set(data.user);
        Backbone.history.navigate("/explore", {trigger: true});
        $('meta[name="csrf-token"]').attr('content', data.csrfToken);
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  }
  
})