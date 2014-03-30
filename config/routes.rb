Bowalum::Application.routes.draw do
  
  devise_for :users
  resources :location
  root :to => "static#root"
  
end
