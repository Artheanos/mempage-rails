# frozen_string_literal: true

require 'dry/monads/result'
require 'dry/matcher/result_matcher'

class ApplicationService
  include Dry::Monads::Result::Mixin

  def self.call(...)
    new(...).call
  end

  def call(&block)
    block ? Dry::Matcher::ResultMatcher.call(sub_call, &block) : sub_call
  end

  def sub_call
    valid? ? wrap_in_result(execute) : Failure(errors: errors, status: :bad_request)
  end

  def wrap_in_result(value)
    value.is_a?(Dry::Monads::Result) ? value : Success(value)
  end

  def execute
    raise NotImplementedError
  end

  def valid?
    errors.empty?
  end

  def validate_params(contract, params)
    contract_result = contract.new.call(params)
    errors.merge!(contract_result.errors.to_h)
    contract_result.values.data
  end

  def errors
    @errors ||= {}
  end
end
