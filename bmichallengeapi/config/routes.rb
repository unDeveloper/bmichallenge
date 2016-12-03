Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'save_info' => 'bmi_info#create'
  get 'get_five' => 'bmi_info#get_last_five'
end
