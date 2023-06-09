# frozen_string_literal: true

module Api
  module Auth
    class JsonWebToken
      class << self
        def encode(payload, exp = 5.minutes.from_now)
          payload[:exp] = exp.to_i
          JWT.encode(payload, Rails.application.secrets.secret_key_base)
        end

        def decode(token)
          body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
          HashWithIndifferentAccess.new body
        rescue JWT::IncorrectAlgorithm, JWT::ExpiredSignature
          nil
        end
      end
    end
  end
end
