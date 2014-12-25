class StaticController < ApplicationController
    def index
      if user_signed_in?
        render :file => 'public/app.html', :layout => false
      else
        render :file => 'public/user.html', :layout => false
      end
    end
end

