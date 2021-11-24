import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import { ethers, waffle } from 'hardhat';
import chai from 'chai';
import { Contract } from '@ethersproject/contracts';

chai.use(waffle.solidity);
const { expect } = chai;

describe('TestToken contract', () => {
  let testToken: Contract;
  const NAME = 'Test Token';
  const SYMBOL = 'TST';
  const TOTAL_SUPPLY = ethers.utils.parseEther('1000000000');

  before(async () => {
    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy();
    await testToken.deployed();
    await testToken.initialize(NAME, SYMBOL);
  });

  /**
   * Deployment tests
   */
  describe('token attributes', () => {
    it('has correct name', async () => {
      await expect(await testToken.name()).to.be.equal(NAME);
    });

    it('has correct symbol', async () => {
      await expect(await testToken.symbol()).to.be.equal(SYMBOL);
    });

    it('has correct decimals', async () => {
      await expect(await testToken.decimals()).to.be.equal(18);
    });

    it('has correct total supply', async () => {
      await expect(await testToken.totalSupply()).to.be.equal(TOTAL_SUPPLY);
    });
  });
});
