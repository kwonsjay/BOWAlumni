Bowalum::Application.routes.draw do
  
  resources :location
  root :to => "static#root"
  
end
