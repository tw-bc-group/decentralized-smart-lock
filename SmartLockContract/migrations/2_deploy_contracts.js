var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Decode = artifacts.require("./Decode.sol");
var SmartLock = artifacts.require("./SmartLock.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  deployer.deploy(Decode);
  deployer.link(Decode, SmartLock);
  deployer.deploy(SmartLock);
};
