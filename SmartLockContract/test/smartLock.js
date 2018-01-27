var SmartLock = artifacts.require("./SmartLock.sol");

contract('SmartLock', function(accounts){
	it("landlord should register successfully with his or her lock address and rent money", function(){
		var smartLock;
		var landlord = accounts[0];
		var lockAddress = "lock_address";
		var rentMoneyPerDay = web3.toWei(100,'ether');

		return SmartLock.new().then(function(instance){
			smartLock = instance;
			return smartLock.registerLandlord(lockAddress, rentMoneyPerDay, {from: landlord});
		}).then(function(){
			return smartLock.isLandlord(landlord);
		}).then(function(res){
			assert.equal(res.valueOf(), true, "if landlord has registered successfully.");
		}).then(function(){
			return smartLock.isLockAvaliable();
		}).then(function(res){
			assert.equal(res.valueOf(), true, "if lock has been registered and avaliable.");
		}).then(function(){
			return smartLock.getRentMoneyPerDay();
		}).then(function(res){
			assert.equal(res.valueOf(), rentMoneyPerDay, "if rent money has been set.")
		});
	});
});