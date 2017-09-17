const MintableTokenMock = artifacts.require("./MintableTokenMock.sol")
import { expectThrow } from "./helpers/index"
import { expect } from "chai"

let cc = null; //
var king; // will use this as owner
var queen;
var supply = 0;

contract("MintableToken", (accounts) =>
{
    beforeEach(async()=>
    {
        king = accounts[0];
        queen = accounts[1];

        cc = await MintableTokenMock.new(king, supply);
    })

    it("Should start with a totalSupply of 0", async()=>
    {
        expect((await cc.totalSupply()).toNumber(),
            "Total supply does not match")
            .to.equal(supply);
    })

    it("Should return mintingFinished false after construct", async()=>
    {
        expect((await cc.mintingFinished()),
            "mintingFinished is not false")
            .to.equal(false);
    })

    it("Should mint a given amount of tokens to a given address", async()=>
    {
        let amount = 1000;
        let r = await cc.mint(king, amount);

        expect(r.logs[0].event,
            "Event Mint() was not fired")
            .to.equal("Mint");

        expect(r.logs[0].args.to.valueOf(),
            "Event Mint(): to is incorrect")
            .to.equal(king);

        expect(r.logs[0].args.amount.toNumber(),
            "Event Mint(): value is incorrect ")
            .to.deep.equal(+amount);

        expect(r.logs[1].event,
            "Event Transfer() was not fired")
            .to.equal("Transfer");
        
        expect(r.logs[1].args.from.valueOf(),
            "Event Transfer(): from is incorrect ")
            .to.equal("0x0000000000000000000000000000000000000000");

        expect((await cc.balanceOf(king)).toNumber(),
            "Did not mint the amount")
            .to.equal(+amount);

        expect((await cc.totalSupply()).toNumber(),
            "Total Supply")
            .to.equal(+amount);

    })

    it("Should fail to mint after call to finishMinting", async()=>
    {
        await cc.finishMinting();

        expect((await cc.mintingFinished()),
            "mintingFinished is not false")
            .to.equal(true);

        expect(await expectThrow(cc.mint(king, 100)),
        "Expected a throw")
        .to.be.true;
    })
})