class StaticController < ApplicationController
    def index
        render :file => 'public/user.html', :layout => false
    end

    def app
        render :file => 'public/app.html', :layout => false
    end

end

