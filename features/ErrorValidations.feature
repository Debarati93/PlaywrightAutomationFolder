Feature:Ecommerce validations
@Validations
Scenario Outline: Placing the order
 Given login to Ecommerce2 application with "<username>" and "<password>"
 Then Verify error message is displayed

Examples:
  | username | password |
  | rahulshetty    | Learning@830$3mK2     |
  | deban    | 12345    |