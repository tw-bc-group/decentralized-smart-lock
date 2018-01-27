pragma solidity ^0.4.15;

import "./Decode.sol";

contract SmartLock {
	struct SmartLockContract {
		address landlord;
		bytes32 lockAddress;
		uint256 rentMoneyPerDay;
		address renter;
		uint256 totalRentMoneyFromRenter;
	}
	
	SmartLockContract slContract;

	event RegisterLandlord(address landlord, bytes32 lockAddress, uint256 rentMoneyPerDay);

	modifier onlyLockIsAvailable { 
		require(isLockAvailiable());
		_; 
	}

	modifier notLandlord(address validateAddress) { 
		require(!isLandlord(validateAddress));
		_; 
	}
	
	

	function isLandlord(address landlord) constant returns(bool res) {
		return slContract.landlord == landlord;
	}
	
	function isLockAvailiable() constant returns(bool res) {
		return slContract.renter == slContract.landlord;
	}

	function registerLandlord(bytes32 lockAddress, uint256 rentMoneyPerDay) {
		address landlord = msg.sender;
		slContract = SmartLockContract({
				landlord: landlord,
				lockAddress: lockAddress,
				rentMoneyPerDay: rentMoneyPerDay,
				renter: landlord,
				totalRentMoneyFromRenter: 0
			});

		RegisterLandlord(landlord, lockAddress, rentMoneyPerDay);
	}

	function getRentMoneyPerDay() constant returns(uint256 rentMoneyPerDay) {
		return slContract.rentMoneyPerDay;
	}

	function wantToRent() onlyLockIsAvailable notLandlord(msg.sender) payable {
		address renter = msg.sender;
		uint256 totalRentMoneyFromRenter = msg.value;

		slContract.renter = renter;
		slContract.totalRentMoneyFromRenter = totalRentMoneyFromRenter;
	}

	function() payable {
		wantToRent();
	}

	function amIRentedThisRoom() constant returns(bool res) {
		address addressNeedToVerify = msg.sender;
		return addressNeedToVerify == slContract.renter;
	}

	function canIOpenThisDoor() constant returns(bool res) {
		// address testAddress = 0x60320b8a71bc314404ef7d194ad8cac0bee1e331;
		// return Decode.decode(0xf4128988cbe7df8315440adde412a8955f7f5ff9a5468a791433727f82717a6753bd71882079522207060b681fbd3f5623ee7ed66e33fc8e581f442acbcf6ab800);
		return true;
	}
	
}
