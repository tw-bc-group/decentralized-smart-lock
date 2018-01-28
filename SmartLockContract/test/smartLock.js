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
			return smartLock.isLockAvailiable();
		}).then(function(res){
			assert.equal(res.valueOf(), true, "if lock has been registered and availiable.");
		}).then(function(){
			return smartLock.getRentMoneyPerDay();
		}).then(function(res){
			assert.equal(res.valueOf(), rentMoneyPerDay, "if rent money has been set.")
		});
	});

	it("renter can rent room by send money", function(){
		var smartLock;
		var landlord = accounts[0];
		var lockAddress = "lock_address";
		var rentMoneyPerDay = web3.toWei(1, 'ether');
		var renter = accounts[1];
		var totalRentMoney = web3.toWei(2, 'ether');

		return SmartLock.new().then(function(instance){
			smartLock = instance;
			return smartLock.registerLandlord(lockAddress, rentMoneyPerDay, {from: landlord});
		}).then(function(){
			return smartLock.isLockAvailiable();
		}).then(function(res){
			assert.equal(res.valueOf(), true, "the room is availiable.");
		}).then(function(){
			return smartLock.getRentMoneyPerDay();
		}).then(function(res){
			assert.equal(res.valueOf(), rentMoneyPerDay, "get rent money.");
		}).then(function(){
			web3.eth.sendTransaction({from: renter, to: smartLock.address, value: totalRentMoney});
		}).then(function(){
			return smartLock.amIRentedThisRoom({from: renter});
		}).then(function(res){
			assert.equal(res.valueOf(), true, "renter rented this room successfully.");
		});
	});

	it("renter can open the door if he or she has paid for it.", function(){
		var smartLock;
		var landlord = accounts[0];
		var lockAddress = "lock_address";
		var rentMoneyPerDay = web3.toWei(1, 'ether');
		var renter = accounts[1];
		var totalRentMoney = web3.toWei(2, 'ether');
		var sha3Msg = web3.sha3("abc");
		// console.log(web3.version.api,'  231232131231231')
		var signedStr = web3.eth.sign(renter, sha3Msg);

		return SmartLock.new().then(function(instance){
			smartLock = instance;
			return smartLock.registerLandlord(lockAddress, rentMoneyPerDay, {from: landlord});
		}).then(function(){
			return smartLock.isLockAvailiable();
		}).then(function(res){
			assert.equal(res.valueOf(), true, "the room is availiable.");
		}).then(function(){
			return smartLock.getRentMoneyPerDay();
		}).then(function(res){
			assert.equal(res.valueOf(), rentMoneyPerDay, "get rent money.");
		}).then(function(){
			smartLock.wantToRent({from: renter, value: totalRentMoney});
		}).then(function(){
			return smartLock.amIRentedThisRoom({from: renter});
		}).then(function(res){
			assert.equal(res.valueOf(), true, "renter rented this room successfully.");
		}).then(function(){
			return smartLock.canIOpenThisDoor(sha3Msg, signedStr);
		}).then(function(res){
			assert.equal(res.valueOf(), true, "");
		});
	});
});