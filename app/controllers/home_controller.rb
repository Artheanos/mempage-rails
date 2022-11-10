# frozen_string_literal: true

class HomeController < ActionController::Base
  def index
    render file: "#{Rails.root}/public/dist/index.html", layout: false
  end
end
