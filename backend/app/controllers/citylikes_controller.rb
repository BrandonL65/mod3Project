class CitylikesController < ApplicationController

    def index 
        @all = Citylike.all 
        render json: @all 
    end

    def create 
        @another = Citylike.new(city: params[:city], user_id: params[:user_id]);
        @another.save

        render json: @another

    end 

    def destroy 
        @found = Citylike.find(params[:id])
        @x = @found
        @found.destroy

        render json: @x
    end 

end
