# frozen_string_literal: true

require 'dry/monads/result'
require 'dry/matcher/result_matcher'

class ApplicationService
  include Dry::Monads::Result::Mixin

  def self.call(...)
    new(...).call
  end

  def call(&block)
    block ? Dry::Matcher::ResultMatcher.call(execute, &block) : execute
  end

  def execute
    raise NotImplementedError
  end

  def set_errors(errors, status = :unprocessable_entity)
    @errors.merge(errors)
    @status = status
  end

  def valid?
    @errors.empty?
  end
end
