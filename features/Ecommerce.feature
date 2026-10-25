Feature:Ecommerce validations
@Regression @foo
Scenario: Placing the order
 Given a login to Ecommerce application with "<username>" and "<password>"
 When Add "ZARA COAT 3" to cart
 Then Verify "ZARA COAT 3" is displayed in the cart
 When Enter valid detailsand place the order
 Then Verify the order is present in the Order HIstory


@Validations
Scenario Outline: Placing the order
 Given login to Ecommerce2 application with "<username>" and "<password>"
 Then Verify error message is displayed

Examples:
  | username | password |
  | rahulshetty    | Learning@830$3mK2     |
  | deban    | 12345    |
