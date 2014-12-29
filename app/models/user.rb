class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.find_for_google_oauth2(access_token, signed_in_resource=nil)
    data = access_token.info
    user = User.where(:email => data["email"].downcase).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
        pass = Devise.friendly_token[0,20]
        user = User.create(
           email: data["email"].downcase,
           password: pass,
           password_confirmation: pass
        )
    end
    user
  end

  def name
    email.sub /@(.*)$/, ''
  end

end
