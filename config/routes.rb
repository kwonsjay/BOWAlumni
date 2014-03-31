Bowalum::Application.routes.draw do
  
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  resources :locations
  root :to => "static#root"
  
end
