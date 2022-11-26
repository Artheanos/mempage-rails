# frozen_string_literal: true

class ApplicationContract < Dry::Validation::Contract
  option :current_user

  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  register_macro(:email_format) do
    key.failure('not a valid email format') unless EMAIL_REGEX.match?(value)
  end

  register_macro(:password_format) do
    key.failure('too short') if value.length <= 3
  end

  register_macro(:exists) do |macro:|
    model = macro.args[0] || keys[0].to_s.gsub(/_id$/, '').camelcase.constantize
    key.failure('not found') unless model.exists?(id: value)
  end
end
