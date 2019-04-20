var Auditing = artifacts.require("./Auditing.sol");

module.exports = function(deployer){
    deployer.deploy(Auditing);
}