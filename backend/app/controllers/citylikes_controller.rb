class CitylikesController < ApplicationController

    def index 
        @all = Citylike.all 
        render json: @all 
    end
end
