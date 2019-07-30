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
end
