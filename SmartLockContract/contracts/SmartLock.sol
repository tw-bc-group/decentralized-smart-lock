pragma solidity ^0.4.15;

import "./Decode.sol";

contract SmartLock {
	struct SmartLockContract {
		address landlord;
		bytes32 lockAddress;
		uint256 rentMoneyPerDay;
		address renter;
		uint256 totalRentMoneyFromRenter;
		uint256 lastDate;
	}
	
	SmartLockContract slContract;

	event RegisterLandlord(address landlord, bytes32 lockAddress, uint256 rentMoneyPerDay);
	event WantToRent(address renter, uint256 totalRentMoneyFromRenter, uint256 lastDate);
	event TransferRentMoney(address landlord, uint256 totalRentMoneyFromRenter);
	event ClearContract(address operator, uint256 now);

	modifier onlyLockIsAvailable { 
		require(isLockAvailiable());
		_; 
	}

	modifier notLandlord(address validateAddress) { 
		require(!isLandlord(validateAddress));
		_; 
	}

	modifier onlyLandlord(address landlord) { 
		require(isLandlord(landlord));
		_; 
	}

	modifier onlyRenter { 
		require(amIRentedThisRoom());
		_; 
	}

	function isLandlord(address landlord) constant returns(bool res) {
		return slContract.landlord == landlord;
	}
	
	function isLockAvailiable() constant returns(bool res) {
		return slContract.lastDate < now;
	}

	function amIRentedThisRoom() constant returns(bool res) {
		address addressNeedToVerify = msg.sender;
		return addressNeedToVerify == slContract.renter;
	}

	function getRentMoneyPerDay() constant returns(uint256 rentMoneyPerDay) {
		return slContract.rentMoneyPerDay;
	}

	function registerLandlord(bytes32 lockAddress, uint256 rentMoneyPerDay) {
		address landlord = msg.sender;
		slContract = SmartLockContract({
				landlord: landlord,
				lockAddress: lockAddress,
				rentMoneyPerDay: rentMoneyPerDay,
				renter: landlord,
				totalRentMoneyFromRenter: 0,
				lastDate: 0
			});

		RegisterLandlord(landlord, lockAddress, rentMoneyPerDay);
	}

	function() payable {
		wantToRent();
	}

	function wantToRent() onlyLockIsAvailable notLandlord(msg.sender) payable {
		address renter = msg.sender;
		uint256 totalRentMoneyFromRenter = msg.value;

		slContract.renter = renter;
		slContract.totalRentMoneyFromRenter = totalRentMoneyFromRenter;
		slContract.lastDate = now + (totalRentMoneyFromRenter / slContract.rentMoneyPerDay) * 1 days;

		WantToRent(slContract.renter, slContract.totalRentMoneyFromRenter, slContract.lastDate);
	}

	function canIOpenThisDoor(bytes memory sha3Message, bytes memory signedStr) constant returns(bool res) {
		return Decode.decode(sha3Message, signedStr) == slContract.renter && now < slContract.lastDate;
	}
	
	function transferRentMoney() onlyLandlord(msg.sender) onlyLockIsAvailable{
		address landlord = msg.sender;
		landlord.transfer(slContract.totalRentMoneyFromRenter);

		TransferRentMoney(landlord, slContract.totalRentMoneyFromRenter);

		clearContract();
	}
	
	function clearContract() private returns(bool res) {
		slContract.totalRentMoneyFromRenter = 0;
		slContract.renter = msg.sender;
		slContract.lastDate = 0;

		ClearContract(msg.sender, now);
	}
}
