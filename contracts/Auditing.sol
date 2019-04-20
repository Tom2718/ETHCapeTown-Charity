pragma solidity ^0.5.0;

contract Auditing{
    uint public validatorCount = 0;

   struct Validator{
       uint id;
       uint stake;
       bool valid;
   }
   
   mapping(uint => Validator) public validators;
   
   constructor() public{
       createValidator(10);
   }
   
   function createValidator(uint _stake) public{
       validatorCount++;
       validators[validatorCount] = Validator(validatorCount, _stake, false);
       //Trigger event
   } 
}
