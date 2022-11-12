# frozen_string_literal: true

module ResultRenderer
  def render_result(result)
    result.success { |data| render_success data }
    result.failure { |data| render_failure data }
  end

  def render_success(success)
    if success.is_a?(Hash) && success.key?(:json)
      render json: success[:json], status: success[:status] || :ok
    else
      render json: {}, status: :ok
    end
  end

  def render_failure(failure)
    errors = failure[:errors] || {}
    status = failure[:status] || :bad_request
    render json: { errors: errors }, status: status
  end
end
