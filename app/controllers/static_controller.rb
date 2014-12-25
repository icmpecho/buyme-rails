class StaticController < ApplicationController
    def index
        render :file => 'public/login.html', :layout => false
    end

    def app
        render :file => 'public/app.html', :layout => false
    end

end

