# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ::ResultRenderer
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  def current_user
    @current_user ||= Api::Auth::AuthenticateUser.new(request.headers).call
  end

  def not_authorized
    render json: {}, status: :unauthorized
  end
end
