Feature: Router
  As a user
  I want to manage my router via an api
  In order to save some mental energy when doing them

  Scenario: Accessing the router with no credentials
    Given I have a router with no credentials
    When I supply it with the router URL 
    Then the url should be an instance of URI::HTTP
    And it should respond with OK
