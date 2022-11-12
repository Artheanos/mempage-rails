# frozen_string_literal: true

require 'dry/monads/result'
require 'dry/matcher/result_matcher'

class ApplicationService
  include Dry::Monads::Result::Mixin

  def self.call(...)
    new(...).call
  end

  def call(&block)
    block ? Dry::Matcher::ResultMatcher.call(prepare_result, &block) : prepare_result
  end

  def execute
    raise NotImplementedError
  end

  private

  def prepare_result
    result = execute
    result.is_a?(Dry::Monads::Result) ? result : Success(result)
  end
end
