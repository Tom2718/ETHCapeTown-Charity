import React, { Component } from "react";
import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Wallet from "./components/Wallet/index.js";
import Instructions from "./components/Instructions/index.js";
import {
  Loader, Card, Heading, Text, Button, OutlineButton,
  ToastMessage, Flex, Box, Image
} from 'rimble-ui';

import AMF from "./images/charities/amf.png";
import EA from "./images/ea_logo.png"

import Charity from "./pages/Charity";
import Donate from "./pages/Donate";
import Validate from "./pages/Validate";
import Home from "./pages/Home";
import { Route, Switch } from "react-router-dom";

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';

class App extends Component {
  // state = {
  //   storageValue: 0,
  //   web3: null,
  //   accounts: null,
  //   contract: null,
  //   route: window.location.pathname.replace("/", "")
  // };

  // getGanacheAddresses = async () => {
  //   if (!this.ganacheProvider) {
  //     this.ganacheProvider = getGanacheWeb3();
  //   }
  //   if (this.ganacheProvider) {
  //     return await this.ganacheProvider.eth.getAccounts();
  //   }
  //   return [];
  // }

  // componentDidMount = async () => {
  //   const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
  //   let Counter = {};
  //   let Wallet = {};
  //   try {
  //     Counter = require("../../contracts/Counter.sol");
  //     Wallet = require("../../contracts/Wallet.sol");
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   try {
  //     const isProd = process.env.NODE_ENV === 'production';
  //     if (!isProd) {
  //       // Get network provider and web3 instance.
  //       const web3 = await getWeb3();
  //       let ganacheAccounts = [];
  //       try {
  //         ganacheAccounts = await this.getGanacheAddresses();
  //       } catch (e) {
  //         console.log('Ganache is not running');
  //       }
  //       // Use web3 to get the user's accounts.
  //       const accounts = await web3.eth.getAccounts();
  //       // Get the contract instance.
  //       const networkId = await web3.eth.net.getId();
  //       const networkType = await web3.eth.net.getNetworkType();
  //       const isMetaMask = web3.currentProvider.isMetaMask;
  //       let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]) : web3.utils.toWei('0');
  //       balance = web3.utils.fromWei(balance, 'ether');
  //       let instance = null;
  //       let instanceWallet = null;
  //       let deployedNetwork = null;
  //       if (Counter.networks) {
  //         deployedNetwork = Counter.networks[networkId.toString()];
  //         if (deployedNetwork) {
  //           instance = new web3.eth.Contract(
  //             Counter.abi,
  //             deployedNetwork && deployedNetwork.address,
  //           );
  //         }
  //       }
  //       if (Wallet.networks) {
  //         deployedNetwork = Wallet.networks[networkId.toString()];
  //         if (deployedNetwork) {
  //           instanceWallet = new web3.eth.Contract(
  //             Wallet.abi,
  //             deployedNetwork && deployedNetwork.address,
  //           );
  //         }
  //       }
  //       if (instance || instanceWallet) {
  //         // Set web3, accounts, and contract to the state, and then proceed with an
  //         // example of interacting with the contract's methods.
  //         this.setState({
  //           web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
  //           isMetaMask, contract: instance, wallet: instanceWallet
  //         }, () => {
  //           this.refreshValues(instance, instanceWallet);
  //           setInterval(() => {
  //             this.refreshValues(instance, instanceWallet);
  //           }, 5000);
  //         });
  //       }
  //       else {
  //         this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
  //       }
  //     }
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // componentWillUnmount() {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //   }
  // }

  refreshValues = (instance, instanceWallet) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name={instructionsKey} accounts={this.state.accounts} />
      </div>
    );
  }

  // renderCharity() {
  //   // Route for charities to sign up (dashboard)
  //   const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state;
  //   const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled) ? "upgrade-auto" : "upgrade";
  //   return (
  //     <div className={styles.wrapper}>
  //       {!this.state.web3 && this.renderLoader()}
  //       {/* {this.state.web3 && !this.state.contract && (
  //         this.renderDeployCheck('counter')
  //       )} */}
  //       <div className={styles.contracts}>
  //         <h1>Become a Trustless Charity</h1>
  //         <p>Start with your own dashboard where you can
  //           launch projects and display transparency.
  //         </p>
  //         <Flex width={0.8}>
  //           <Box width={1 / 3} bg="#3C4653">
  //             <Card width={0.9} mx={'auto'}>
  //               <Heading>Register</Heading>
  //               <Text mb={4}>
  //                 Become a trustless charity.
  //               </Text>
  //               <Button mr={3} mx={'auto'}>Donate</Button>
  //             </Card>
  //           </Box>
  //           <Box width={1 / 3} bg="#FFFFFF">
  //             <Image
  //               alt="Against Malaria Foundation"
  //               borderRadius={8}
  //               height="auto"
  //               src={EA}
  //             />
  //           </Box>
  //           <Box width={1 / 3} bg="#3C4653">
  //             <Card width={0.9} mx={'auto'}>
  //               <Heading>Dashboard</Heading>
  //               <Text mb={4}>
  //                 Login to your dashboard here.
  //               </Text>
  //               <Button mr={3} mx={'auto'}>Login</Button>
  //             </Card>
  //           </Box>
  //         </Flex>
  //         {/* <div className={styles.widgets}>
  //             <Web3Info {...this.state} />
  //             <CounterUI
  //               decrease={this.decreaseCount}
  //               increase={this.increaseCount}
  //               {...this.state} />
  //           </div> */}
  //         {this.state.web3 && this.state.contract && (
  //           <div>
  //             {this.state.balance < 0.1 && (
  //               <Instructions
  //                 ganacheAccounts={ganacheAccounts}
  //                 name="metamask"
  //                 accounts={accounts} />
  //             )}
  //             {this.state.balance >= 0.1 && (
  //               <Instructions
  //                 ganacheAccounts={this.state.ganacheAccounts}
  //                 name={updgradeCommand}
  //                 accounts={accounts} />
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }

  // renderFAQ() {
  //   return (
  //     <div className={styles.wrapper}>
  //       <Instructions
  //         ganacheAccounts={this.state.ganacheAccounts}
  //         name="faq" accounts={this.state.accounts} />
  //     </div>
  //   );
  // }

  // renderDonate() {
  //   // Render the donations page with a list of charities
  //   return (
  //     <div className={styles.wrapper}>
  //       {!this.state.web3 && this.renderLoader()}
  //       {(!this.state.web3 || !this.state.wallet)
  //         ? (<ToastMessage message={"Can't connect to the Ethereum network."} />)
  //         : (<div>
  //           <div className={styles.widgets}>
  //             <Web3Info {...this.state} />
  //             <Wallet
  //               renounce={this.renounceOwnership}
  //               {...this.state} />
  //           </div>
  //           <Instructions
  //             ganacheAccounts={this.state.ganacheAccounts}
  //             name="evm" accounts={this.state.accounts} />
  //         </div>)}
  //       <div className={styles.contracts}>
  //         <h1>Give to Charity</h1>
  //         <p>
  //           On this page you can find your charity of choice and look into their
  //           finances and transparency on the blockchain. You can then donate and
  //           watch where your money ends up.
  //         </p>
  //         <Flex width={0.8}>
  //           <Box width={2 / 3} bg="#3C4653">
  //             <Card width={0.9} mx={'auto'}>
  //               <Heading>Against Malaria Foundation</Heading>
  //               <Text mb={4}>
  //                 The Against Malaria Foundation distributes mosquito nets to people in
  //                 high-risk areas.
  //                 <br />
  //                 By donating to the Against Malaria Foundation, you can help save lives.
  //               </Text>
  //               <Button mr={3}>Donate</Button>
  //               <OutlineButton>View Projects</OutlineButton>
  //             </Card>
  //           </Box>
  //           <Box p={3} width={1 / 3} bg="black" color="white">
  //             <Image
  //               alt="Against Malaria Foundation"
  //               borderRadius={8}
  //               height="auto"
  //               src={AMF}
  //             />
  //           </Box>
  //         </Flex>
  //       </div>
  //     </div>
  //   );
  // }

  // renderValidate() {
  //   // Render the donations page with a list of charities
  //   return (
  //     <div className={styles.wrapper}>
  //       {!this.state.web3 && this.renderLoader()}
  //       {(!this.state.web3 || !this.state.wallet)
  //         ? (<ToastMessage message={"Can't connect to the Ethereum network."} />)
  //         : (<div>
  //           <div className={styles.widgets}>
  //             <Web3Info {...this.state} />
  //             <Wallet
  //               renounce={this.renounceOwnership}
  //               {...this.state} />
  //           </div>
  //           <Instructions
  //             ganacheAccounts={this.state.ganacheAccounts}
  //             name="evm" accounts={this.state.accounts} />
  //         </div>)}
  //       <div className={styles.contracts}>
  //         <h1>Validate Charities</h1>
  //         <p>
  //           The process of charity involves and incentivises peoples to cooperate and
  //           complete what they said they would. In this section, you can stake coins on
  //           a charity doing things correctly or incorrectly. If you are proven to be correct,
  //           can claim the token of others.
  //         </p>
  //         <CounterUI />
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/charity" component={Charity} />
          <Route path="/validate" component={Validate} />
          <Route path="/donate" component={Donate} />
        </Switch>
        <Footer />
        {/* {this.state.route === '' && this.renderHome()}
        {/* {this.state.route === 'charity' && this.renderCharity()} */}
        {/* {this.state.route === 'donate' && this.renderDonate()}
        {this.state.route === 'validate' && this.renderValidate()}
        {this.state.route === 'faq' && this.renderFAQ()} */}
      </div>
    );
  }
}

export default App;
