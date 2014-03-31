class SessionsController < Devise::SessionsController
  
  def new
    redirect_to root_url
  end
  
  def create
    resource = warden.authenticate!(
    :scope => resource_name,
    :recall => "#{controller_path}#failure"
    )
    sign_in_and_redirect(resource_name, resource)
  end
  
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render :json => {
      'csrfParam' => request_forgery_protection_token,
      'csrfToken' => form_authenticity_token
    }
  end
  
  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    render :json => {
      :success => true,
      :user => current_user,
      :csrfParam => request_forgery_protection_token,
      :csrfToken => form_authenticity_token
    }
  end
  
  def failure
    render :json => {:success => false, :errors => ["Login failed."]}
  end
  
end