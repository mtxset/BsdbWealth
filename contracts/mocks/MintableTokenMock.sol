pragma solidity 0.4.15;

import "../../contracts/BSDB.sol";

contract MintableTokenMock is MintableToken
{
    function MintableTokenMock(address initialAddr, uint256 initialBalance)
    {
        balances[initialAddr] = initialBalance;
        totalSupply = initialBalance;
    }
}
