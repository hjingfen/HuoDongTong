Rails.application.routes.draw do

  root 'session#index'

  post '/signin' => 'session#signin'

  get '/signout' => 'session#signout'

  get '/users/new' => 'users#new'

  get '/users/welcome' => 'users#welcome'

  post '/users/create' => 'users#create'

  get '/admin/welcome' => 'admin#welcome'

  get '/admin/new_user' => 'admin#new_user'

  post '/admin/add_user' => 'admin#add_user'

  get '/user/:id/password/change' => 'admin#change_password'

  post '/user/:id/password/save_password' => 'admin#save_password'

  get '/admin/signout' => 'admin#signout'

  delete 'delete_user' => 'admin#delete'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
