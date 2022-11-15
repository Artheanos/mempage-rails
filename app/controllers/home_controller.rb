# frozen_string_literal: true

class HomeController < ActionController::Base
  def index
    html_path = "#{Rails.root}/public/dist/index.html"
    render(file: html_path, layout: false) if File.exist?(html_path)
  end
end
