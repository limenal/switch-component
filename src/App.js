import './index.css';
import React, { Component } from 'react'
import SwitchButton from './components/SwitchButton'
import {ethers} from 'ethers'


// const CHAIN_PARAMS = {
//   chainId: '0x64', // A 0x-prefixed hexadecimal chainId
//   chainName: 'xDAI Chain',
//   nativeCurrency: {
//     name: 'xDAI',
//     symbol: 'xDAI',
//     decimals: 18
//   },
//   rpcUrls: ['https://dai.poa.network'],
//   blockExplorerUrls: ['https://blockscout.com/poa/xdai/']
// } 
const CHAIN_PARAMS = {
  chainId: '0x89', // A 0x-prefixed hexadecimal chainId
  chainName: 'Matic Mainnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
  blockExplorerUrls: ['https://explorer.matic.network/']
}
const mainButtonStyle = 
{
  margin: 'auto',
  position: 'absolute',
  top: '-20px', left: '0', bottom: '0', right: '0',
  width: "200px",
  borderRadius: '13px'
};

// const mainButtonStyle = 
// {
  
//   marginLeft:'auto',
//   marginRight:'auto',
//   position: 'relative',
//   top:'500px',
//   textAlign: 'center',
//   display: 'block',
//   width: "200px",
//   borderRadius: '13px'
// };

const iconStyle = 
{
  margin: 'auto',
  position: 'absolute',
  top: '-20px', left: '10px', bottom: '0', right: '0',
  
};

const COLOR_PARAM = "#ff6b00"

const modalBackgroundStyle = {
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
  top: '0px', left: '0', bottom: '0', right: '0',
  width: "250px",
  borderRadius: '13px'
  
};


const loadingModalStyle = {
  margin: 'auto',
  position: 'absolute',
  top: '0px', left: '0', bottom: '0', right: '0',
  width: "250px",
  size: '150%',
  borderRadius: '13px',
  
  
};

const errorModalStyle ={
  margin: 'auto',
  position: 'absolute',
  top: '-90px', left: '0', bottom: '0', right: '0',
  textAlign: 'center',
  width:'350px',
  height: '50px',
  color: 'red',
  borderRadius: '10px'
}


class App extends Component
{

  async componentDidMount() {
    await this.foo()
    
  }


  foo = async() =>
  {
    const { ethereum } = window;
    let provider
    if (ethereum) {
        provider = new ethers.providers.Web3Provider(ethereum);
        this.setState({isMetaMaskInstalled: true})
        let res = await provider.getNetwork()
        let ID = res.chainId
        
        this.setState({currentID: ID.toString()}, function(){
        })
    }
   

    this.setState({loading: false})
  }
  checkChainChange(){
    const ethereum = window.ethereum
    if (ethereum) {
      ethereum.on('chainChanged', chainId => {
        this.setState({ currentID: chainId.toString() })
      })
    }
  }

  
  constructor(props) {
    super(props)
    this.state = {
      ID: '',
      loading: true,
      currentID: '',
      currentAccount: ''
    }
  }

  render() {
    this.checkChainChange()
    let content
    if(this.loading)
    {
      content = <p>Loading...</p>
    }
    else{
      content = 
      <div>
          <SwitchButton 
            currentNetwork={Number(this.state.currentID)}
            requiredNetwork={Number(CHAIN_PARAMS.chainId)}
            chainParams = {CHAIN_PARAMS}
            mainButtonStyle = {mainButtonStyle}
            modalBackgroundStyle = {modalBackgroundStyle}
            modalStyle = {modalStyle}
            buttonModalStyle = {buttonModalStyle}
            loadingModalStyle = {loadingModalStyle}
            errorModalStyle = {errorModalStyle}
            color = {COLOR_PARAM}
          />
      </div>    
    }
      
    return(

      <div>
        
        {content}
      </div>
      
    )
  }

}

export default App;
