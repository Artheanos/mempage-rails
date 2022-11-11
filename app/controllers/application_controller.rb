# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized

  def current_user
    @current_user ||= Api::Auth::AuthenticateUser.new(request.headers).call
  end

  def not_authorized
    render json: {}, status: :unauthorized
  end

  def render_result(result)
    result.success do |data|
      next render json: {}, status: :ok if data == Dry::Monads::Unit

      status = data[:status] || :ok
      render json: data[:json], status: status
    end

    result.failure do |data|
      errors = data[:errors] || {}
      status = data[:status] || :bad_request
      render json: { errors: errors }, status: status
    end
  end
end
