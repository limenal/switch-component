import React, {Component} from 'react'
import RimbleUtils from '@rimble/utils';
import PropTypes from 'prop-types';
import {ethers} from 'ethers';
import { Box, Flex, Icon, Text, MetaMaskButton, Flash, Button, Loader } from 'rimble-ui';
import './styles.css'


const modalBackgroundlStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)' 
};

const modalStyle = {
  margin: 'auto',
  position: 'absolute',
  top: '0', left: '0', bottom: '0', right: '0',
  width:'350px',
  height: '200px',
  background:'white',
  borderRadius: '10px'
};

const buttonModalStyle = {
  margin: 'auto',
  position: 'absolute',
  top: '80px', left: '0', bottom: '0', right: '0',
  width: "250px",
  borderRadius: '13px'
  
};

const loadingModalStyle = {
  margin: 'auto',
  position: 'absolute',
  top: '80px', left: '0', bottom: '0', right: '0',
  width: "250px",
  size: '150%',
  borderRadius: '13px',
  
  
};

const errorModalStyle ={
  textAlign: 'center',
  margin: 'auto',
  position: 'absolute',
  size: '150%',
  color: 'red',
  top: '500px', left: '0', bottom: '0', right: '0',
}


const ModalBackground = () =>(
  <div style = {modalBackgroundlStyle}>

  </div>
)

const Modal = ({isMetaMaskConnected, isCorrectNetwork}
) => {
  
  return (
    <div style= {modalStyle}>
    </div>
  );
};



const ConnectWallet = ({
}) => {
  return (
    <div>
      { 
        <MetaMaskButton style = {buttonModalStyle}  >Connect MetaMask</MetaMaskButton>
      }
    </div>
  );
};



class ConnectionBanner extends Component {
  
  static propTypes = {
    chainParams: PropTypes.object,
    currentNetwork: PropTypes.number,
    
    requiredNetwork: PropTypes.number,
    onWeb3Fallback: PropTypes.bool,
    children: PropTypes.shape({
      notWeb3CapableBrowserMessage: PropTypes.node,
      noNetworkAvailableMessage: PropTypes.node,
      onWrongNetworkMessage: PropTypes.node,
    }),
  };
  static defaultProps = {
    currentNetwork: null,
    requiredNetwork: null,
    onWeb3Fallback: false,
    children: {
      notWeb3CapableBrowserMessage: null,
      noNetworkAvailableMessage: null,
      onWrongNetworkMessage: null,
    },
  };

  
  state = {
    isCorrectNetwork: false,
    isModal: null,
    isMetaMaskConnected: false,
    isLoading: false,
    isSetup: false,
    currenAccount: '',
    isWalletConnectionError:false
  };
  checkCorrectNetwork = () => {
    const isCorrectNetwork =
      this.props.currentNetwork === this.props.requiredNetwork;
    if (isCorrectNetwork !== this.state.isCorrectNetwork) {
      this.setState({ isCorrectNetwork }, function(){
      });
    }
    
    
  };

  async componentDidMount() {
    this.setState({isSetup:true})
    this.isMetamaskConnected()
  }

  requestAccounts = async() =>
  {
    this.setState({isLoading: true}, function () {
      //console.log(this.state.isLoading);
    });
    try
    {
    if(!this.state.isMetaMaskConnected)
    {
      let accs = await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    this.setState({
      isLoading: false
    });
    this.setState({isLoading: false}, function () {
      //console.log(this.state.isLoading);
    });
    this.isMetamaskConnected()
    }catch(err){
      this.setState({isWalletConnectionError: true}, function () {
      })
    }
    
  }


  switchNetwork = async() =>
  {

    
    this.setState({isLoading: true}, function () {
      //console.log(this.state.isLoading);
    });
    try{
      const res = await window.ethereum.request({ 
          method: 'wallet_addEthereumChain',
          params: [
              this.props.chainParams
            ]
      });
      this.checkCorrectNetwork()
      this.setState({isLoading: false}, function () {
        //console.log(this.state.isLoading);
      });
      this.setState({isModal: false})
      this.checkCorrectNetwork()
    }catch(err){
      this.setState({isWalletConnectionError: true}, function () {
      })
    }
    
  }


  checkAccountChange(){
    const ethereum = window.ethereum
    if (ethereum) {
      ethereum.on('accountsChanged', accounts => {
        this.isMetamaskConnected()
        
      })
    }
  }

  isMetamaskConnected = async() =>
  {

    const { ethereum } = window;
    if (ethereum) {
        var provider = new ethers.providers.Web3Provider(ethereum);
    }

    const isMetaMaskConnected = async () => {
        const accounts = await provider.listAccounts();
        return accounts.length > 0;
    }
    
    await isMetaMaskConnected().then((connected) => {
        if (connected) {
          this.setState({
            isMetaMaskConnected: true,
            
          });
        } else {
          
          this.setState({
            isMetaMaskConnected: false,
            
          });
          
        }
    });
  }
  
  async componentDidUpdate() {
    if (this.props.currentNetwork && this.props.requiredNetwork) {
      this.checkCorrectNetwork();
    }
    
  }

  openModal = () => {
    
    this.setState({
      isModal: true
    });
  };

  closeModal = () => {
    
    this.setState({
      isModal: false
    });
  };

  
  
  render() {
    const { currentNetwork, requiredNetwork, onWeb3Fallback } = this.props;
    this.checkAccountChange()
    let button
    if(!this.state.isSetup)
    {
      button = null
    }
    else if(this.state.isModal)
    {
      if(this.state.isWalletConnectionError)
      {
        button = <div>
          <div onClick={this.closeModal}>
          <ModalBackground ></ModalBackground>
          
        </div>
        
        <Modal 
        >    
        </Modal>
        <p style ={errorModalStyle}> Error connecting</p>
        </div>
      }
      else if(this.state.isLoading)
      {
        button = <div>
          <div onClick={this.closeModal}>
          <ModalBackground ></ModalBackground>
          
        </div>
        
        <Modal 
        >    
        </Modal>

          <Loader style = {loadingModalStyle} color="#ff6b00" size ="40px"></Loader>
        </div>
      }
      else if(this.state.isMetaMaskConnected)
      {
        button = <div>
        <div onClick={this.closeModal}>
          <ModalBackground ></ModalBackground>
          
        </div>
        
        <Modal 
        >    
        </Modal>
        <div>
        <Button onClick={this.switchNetwork} style = {buttonModalStyle} mainColor="#ff6b00">
          Switch to xDAI
        </Button>
        </div>
        
        </div>
      }
      else 
      {
        button = <div>
        <div onClick={this.closeModal}>
          <ModalBackground ></ModalBackground>

        </div>
        
        <Modal 
        >    
        </Modal>
        <div onClick={this.requestAccounts}>
          <ConnectWallet></ConnectWallet>
        </div>
        
      </div>
      }
      
      
    }
    else{
      
      button = 
      <div>
        <Button onClick={this.openModal} style = {buttonModalStyle} mainColor="#ff6b00">Connect to a wallet</Button>
        
      </div>
      
    }
    
    return (

      <div>

          {this.state.isMetaMaskConnected === true && this.state.isCorrectNetwork === true ? (
            <Button variant="success" style = {buttonModalStyle}>Success!</Button>
          ) : button}

      
      </div>


    );
  }
}

export default ConnectionBanner;
