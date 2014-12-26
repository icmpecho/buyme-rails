class StaticController < ApplicationController
    def index
      if user_signed_in?
        render 'static/app', :layout => false
      else
        render 'static/user', :layout => false
      end
    end

    def sign_out
    end
end

