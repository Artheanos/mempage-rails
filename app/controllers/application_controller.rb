# frozen_string_literal: true

class ApplicationController < ActionController::API
  include ::ResultRenderer
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :not_authorized
  rescue_from ::ValidationError, with: :validation_error

  def current_user
    @current_user ||= Api::Auth::AuthenticateUser.new(request.headers).call
  end

  def validate_params(contract)
    permitted_params = params.permit(contract.params.rules.keys).to_h
    contract_result = contract.new.call permitted_params
    errors = contract_result.errors.to_h
    raise(::ValidationError, errors) if errors.present?

    contract_result.values.data
  end

  private

  def not_authorized
    render json: {}, status: :unauthorized
  end

  def validation_error(error)
    render json: { errors: error.errors }, status: :bad_request
  end
end
