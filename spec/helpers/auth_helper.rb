# frozen_string_literal: true

module AuthHelper
  def http_login(user)
    token = Api::Auth::AssignToken.new(user.email, user.password).call
    request.headers.merge!(Authentication: token)
  end
end
