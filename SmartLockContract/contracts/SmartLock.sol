pragma solidity ^0.4.15;


contract SmartLock {
	struct SmartLockContract {
		address landlord;
		bytes32 lockAddress;
		uint256 rentMoneyPerDay;
		address renter;
	}
	
	SmartLockContract slContract;

	event RegisterLandlord(address landlord, bytes32 lockAddress, uint256 rentMoneyPerDay);

	function isLandlord(address landlord) constant returns(bool res) {
		return slContract.landlord == landlord;
	}
	
	function isLockAvaliable() constant returns(bool res) {
		return slContract.renter == slContract.landlord;
	}

	function registerLandlord(bytes32 lockAddress, uint256 rentMoneyPerDay) {
		address landlord = msg.sender;
		slContract = SmartLockContract({
				landlord: landlord,
				lockAddress: lockAddress,
				rentMoneyPerDay: rentMoneyPerDay,
				renter: landlord
			});

		RegisterLandlord(landlord, lockAddress, rentMoneyPerDay);
	}

	function getRentMoneyPerDay() constant returns(uint256 rentMoneyPerDay) {
		return slContract.rentMoneyPerDay;
	}
}
