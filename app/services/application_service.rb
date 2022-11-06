# frozen_string_literal: true

require 'dry/monads/result'
require 'dry/matcher/result_matcher'

class ApplicationService
  include Dry::Monads::Result::Mixin
  # include Dry::Matcher.for(:call, with: Dry::Matcher::ResultMatcher)

  # def self.call(*args, &block)
  #   new(*args, &block).call
  # end

  def set_errors(errors, status = :unprocessable_entity)
    @errors.merge(errors)
    @status = status
  end

  def valid?
    @errors.empty?
  end
end
