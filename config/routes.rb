Bowalum::Application.routes.draw do
  
  devise_for :users, :controllers => {sessions: 'sessions'}
  resources :locations
  root :to => "static#root"
  
end
