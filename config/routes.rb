Bowalum::Application.routes.draw do
  
  devise_for :users, :controllers => {sessions: 'sessions'}
  resources :location
  root :to => "static#root"
  
end
