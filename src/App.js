import './App.css';
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
      currentID: ''
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
          <SwitchButton currentNetwork={Number(this.state.currentID)}
            requiredNetwork={100}
            onWeb3Fallback={false}
            chainParams = {CHAIN_PARAMS}
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
