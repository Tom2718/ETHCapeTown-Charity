import React from "react";
import styles from '../App.module.scss';
import {
  ToastMessage, Loader
} from 'rimble-ui';
import Web3Info from "../components/Web3Info/index.js";
import Wallet from "../components/Wallet/index.js";
import Instructions from "../components/Instructions/index.js";
import AuditorUI from "../components/Auditor/index.js";
import getWeb3, { getGanacheWeb3 } from "../utils/getWeb3";
import { zeppelinSolidityHotLoaderOptions } from '../../config/webpack';
import Auditing from "../../../build/contracts/Auditing.json";

export default class Validate extends React.Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  };

  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="blue" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;

    // let Auditing = {};
    // // let Wallet = {};
    // try {
    //   Auditing = require("../../../contracts/Auditing.sol");
    //   // Wallet = require("../../contracts/Wallet.sol");
    //   console.log("Auditing contract loaded.");
    // } catch (e) {
    //   console.log(e);
    // }
    

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3(); // getWeb3
        let ganacheAccounts = [];
        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]) : web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        let instance = null;
        // let instanceWallet = null;
        let deployedNetwork = null;
        console.log("Auditing");
        console.log(Auditing.networks);
        console.log(networkId.toString());
        if (Auditing.networks) {
          deployedNetwork = Auditing.networks[networkId.toString()];
          
          // deployedNetwork = Auditing.networks["1555770177484"]; // Don't ask

          // deployedNetwork = Auditing.networks[0];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              Auditing.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        // if (Wallet.networks) {
        //   deployedNetwork = Wallet.networks[networkId.toString()];
        //   if (deployedNetwork) {
        //     instanceWallet = new web3.eth.Contract(
        //       Wallet.abi,
        //       deployedNetwork && deployedNetwork.address,
        //     );
        //   }
        // }
        if (instance ) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({
            web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, contract: instance//, wallet: instanceWallet
          });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  createValidator = async (number) => {
    const { accounts, contract, web3 } = this.state;
    await contract.methods.createValidator(number).send({ from: accounts[0], value: number * 1e18 });
    // Update state...
  };

  render() {
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {/* {(!this.state.web3 || !this.state.wallet)
          ? (<ToastMessage message={"Can't connect to the Ethereum network."} />)
          : ( */}
        {/* <div>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <Wallet
                renounce={this.renounceOwnership}
                {...this.state} />
            </div>
            <Instructions
              ganacheAccounts={this.state.ganacheAccounts}
              name="evm" accounts={this.state.accounts} />
          </div> */}
        {/* )} */}
        {console.log("web3")}
        {console.log(this.state.web3)}
        {console.log("contract")}
        {console.log(this.state.contract)}
        {this.state.contract !== null && console.log(this.state.contract.methods)}


        {this.state.web3 && this.state.contract && (
        <div className={styles.contracts}>
          <h1>Validate Charities</h1>
          <p style={{maxWidth: "70%"}}>
            The process of charity involves and incentivises peoples to cooperate and
            complete what they said they would. In this section, you can stake coins on
            a charity doing things correctly or incorrectly. If you are proven to be correct,
            can claim the token of others.
                </p>
          <AuditorUI 
            newValidator={this.createValidator}
            {...this.state} />
          {/* Interface with validator smart contract */}
        </div>)}
      </div>
    );
  }
}
