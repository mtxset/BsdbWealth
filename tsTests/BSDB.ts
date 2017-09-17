const BSDB = artifacts.require("BSDB")
import { expectThrow } from "./helpers/index"
import { expect } from "chai"


let cc = null;
const decimals = 8;
const ccTotalSupply = 81*10**(6+8); // 9.999 Billions

var king; // will use this as owner
var queen;
var jack;
var ace;
var joker;
var magpie;

// Helper functions
function ReturnEventAndArgs(returnVal)
{
    return { eventName: returnVal.logs[0].event, 
             eventArgs: returnVal.logs[0].args.action,
             raw: returnVal }
}
// -- Helper functions

contract("BSDB", (accounts)=> 
{
    before(async()=>
    {
        king = accounts[0];
        queen = accounts[1];
        jack = accounts[2];
        ace = accounts[3];
        joker = accounts[4];
        magpie = accounts[5];
    })
 
    describe("Initialize", async()=>
    {
        describe("Correct Init", async()=>
        {
            it("It should initialize", async()=>
            {
                cc = await BSDB.new({from: king});

                expect(await cc.owner(), 
                    "Owners should match")
                    .to.equal(king);

                expect((await cc.totalSupply()).toNumber(),
                    "Total supply should match")
                    .to.equal(ccTotalSupply);

                expect((await cc.balanceOf(king)).toNumber(),
                    "Balance should equal to initial supply")
                    .to.equal(ccTotalSupply);
            })
        })
    })

    describe("Function: transferOwnership(address newOwner) ", async()=>
    {
        it("Should correctly transfer ownership", async()=>
        {
            cc = await BSDB.new({from: king});

            // Checking current owner
            expect(await cc.owner(), 
                "Owners should match")
                .to.equal(king);

            await cc.transferOwnership(queen, {from:king});
            
            expect(await cc.owner(), 
                "Owners should match")
                .to.equal(queen);
        })

        it("Should not trasnfer ownership (not owner transfers)", async()=>
        {
            cc = await BSDB.new({from: king});

            expect(await cc.owner(), 
                "Owners should match")
                .to.equal(king);

            expect(await expectThrow(cc.transferOwnership(jack, {from:queen})),
                "Should throw")
                .to.be.true;
        })

        it("Should not transfer ownership (passing 0 address)", async()=>
        {
            cc = await BSDB.new({from: king});

            expect(await cc.owner(), 
                "Owners should match")
                .to.equal(king);

            expect(await expectThrow(cc.transferOwnership(0, {from:king})),
                "Should throw")
                .to.be.true;
        })
    })
})