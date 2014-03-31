class LocationsController < ApplicationController
  def index
    @locations = Location.all
    render :json => @locations
  end
  
  def create
    @location = current_user.locations.build(params[:location])
    if @location.save
      render :json => @location
    end
  end
  
  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(params[:location])
      render :json => @location
    else
      render @location.errors.full_messages, :status => 422
    end
  end
  
end
