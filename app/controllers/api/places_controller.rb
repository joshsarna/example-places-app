class Api::PlacesController < ApplicationController
  def index
    @places = Place.all
    render "index.json.jbuilder"
  end

  def create
    parameters = {
      name: params[:name],
      address: params[:address]
    }
    @place = Place.new(parameters)
    if @place.save
      render "show.json.jbuilder"
    else
      render json: {errors: @place.errors.full_messages, status: :bad_request}
    end
  end
end
