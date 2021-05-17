import './index.css';
import React, { Component } from 'react'
import SwitchButton from './components/SwitchButton'
import {ethers} from 'ethers'


const CHAIN_PARAMS = {
  chainId: '0x64', // A 0x-prefixed hexadecimal chainId
  chainName: 'xDAI Chain',
  nativeCurrency: {
    name: 'xDAI',
    symbol: 'xDAI',
    decimals: 18
  },
  rpcUrls: ['https://dai.poa.network'],
  blockExplorerUrls: ['https://blockscout.com/poa/xdai/']
} 
const mainButtonStyle = 
{
  margin: 'auto',
  position: 'absolute',
  top: '-20px', left: '0', bottom: '0', right: '0',
  width: "200px",
  borderRadius: '13px'
};

const iconStyle = 
{
  margin: 'auto',
  position: 'absolute',
  top: '-20px', left: '140px', bottom: '0', right: '0',
  
};

const COLOR_PARAM = "#ff6b00"

class App extends Component
{

  async componentDidMount() {
    await this.foo()
    
  }


  foo = async() =>
  {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let res = await provider.getNetwork()
    let ID = res.chainId
    
    this.setState({currentID: ID.toString()}, function(){
    })

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
      <div className = "wrapper">
          <SwitchButton currentNetwork={Number(this.state.currentID)}
            requiredNetwork={100}
            onWeb3Fallback={false}
            iconStyle = {iconStyle}
            chainParams = {CHAIN_PARAMS}
            mainButtonStyle = {mainButtonStyle}
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
