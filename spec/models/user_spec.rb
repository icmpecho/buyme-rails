require 'rails_helper'

RSpec.describe User, :type => :model do
  it 'has username' do
    @fai = User.create( email: 'fai@abctech-thailand.com', password: '12345678', password_confirmation: '12345678' )
    expect( @fai.name ).to eq 'fai'
  end
end
