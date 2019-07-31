class UsersController < ApplicationController

    def index 
        @users = User.all 
        render json: @users, include: :citylikes
    end 

    def show 
        temp = params[:id]
        @user = User.find(temp)
        render json: @user, include: :citylikes
    end 

    def create 
      user = User.find_or_create_by(username: user_params[:username])
      render json: user
    end

    private

    def user_params
      params.require(:user).permit(:id, :username)
    end 
end
