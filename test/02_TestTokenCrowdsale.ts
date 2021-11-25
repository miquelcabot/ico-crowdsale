import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import { ethers, waffle } from 'hardhat';
import chai from 'chai';
import { Contract } from '@ethersproject/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

chai.use(waffle.solidity);
const { expect } = chai;

describe('TestTokenCrowdsale contract', () => {
  let testToken: Contract;
  let testTokenCrowdSale: Contract;
  let owner: SignerWithAddress;
  const NAME = 'Test Token';
  const SYMBOL = 'TST';
  const TOTAL_SUPPLY = ethers.utils.parseEther('1000000000');
  const RATE = 500; // how many tokens can I get for 1 ether

  before(async () => {
    [owner] = await ethers.getSigners();

    // deploy TestToken
    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy();
    await testToken.deployed();
    await testToken.initialize(NAME, SYMBOL);

    // deploy TestTokenCrowdsale
    const TestTokenCrowdsale = await ethers.getContractFactory("TestTokenCrowdsale");
    testTokenCrowdSale = await TestTokenCrowdsale.deploy(RATE, owner.address, testToken.address);
    await testTokenCrowdSale.deployed();
  });

  /**
   * Deployment tests
   */
  describe('crowdsale attributes', () => {
    it('has correct rate', async () => {
      await expect(await testTokenCrowdSale.rate()).to.be.equal(RATE);
    });

    it('has correct wallet', async () => {
      await expect(await testTokenCrowdSale.wallet()).to.be.equal(owner.address);
    });

    it('has correct token', async () => {
      await expect(await testTokenCrowdSale.token()).to.be.equal(testToken.address);
    });
  });
});
