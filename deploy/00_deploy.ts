/* eslint-disable no-console */
import '@nomiclabs/hardhat-ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let owner: SignerWithAddress;
  // eslint-disable-next-line prefer-const
  [owner] = await ethers.getSigners();

  const chainId = await getChainId();
  console.log(`Deploying to chainId ${chainId}`);

  // Deploy TestToken
  const testToken = await deploy('TestToken', {
    from: deployer,
    args: [],
    log: true
  });
  // Initialization of the TestToken smart contract
  const TestToken = await ethers.getContractFactory('TestToken');
  const testTokenContract = await TestToken.attach(testToken.address);
  await testTokenContract.initialize('Test Token', 'TST', { gasLimit: 400000 });
};

func.tags = ['TestToken'];

export default func;
