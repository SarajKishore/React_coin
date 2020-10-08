import React from 'react';
import sha256 from 'crypto-js/sha256';

class Block extends React.Component{
    state={
       index: this.props.index,
       timestamp: this.props.timestamp,
       data: this.props.data,
       hash:"",
       nounce:0,
       prevhash:this.props.prevhash,
       totalValue:[],
    };
    componentWillReceiveProps(){
        this.setState({
            hash : sha256(this.state.index+this.state.timestamp+this.state.nounce+this.state.prevhash+ JSON.stringify(this.data)).toString(),
        })
        // setTimeout(()=>{
            this.setState({
                totalValue : {
                    index: this.state.index,
                    timestamp: this.state.timestamp,
                    data : this.state.data,
                    hash: this.state.hash,
                    nounce: this.state.nounce,
                    prevhash: this.state.prevhash,
                }
            })
        // },500)
        //console.log(this.state.totalValue)
    }
    proofOfWork(difficulty) {
        while (
          this.state.hash.substring(0, this.props.difficulty) !== Array(this.props.difficulty + 1).join("0")
        ) {
            this.setState({
                nounce : this.state.nounce+1,
                hash : sha256(this.state.index+this.state.timestamp+this.state.nounce+this.state.prevhash+ JSON.stringify(this.data)).toString(),
            })
        }
      }
    render(){
        return(
            <div>
                <button onClick={() => this.props.update(this.state.totalValue)}>
                    Mine
                 </button>
            </div>
        )
    }

}

export default class BlockChain extends React.Component{
   constructor(props){
       super(props);
       this.state={
            blockchain : [
                {
                    
                    index: 0,
                    timestamp: "10/02/1999",
                    data:"Initial Value",
                    prevhash:"0",
                    nounce: 0,
                    hash:"",
                }
            ],
            totalValue: [],
            mark : false,
            blength: 0, //Its value is one less than the length of blockchain array
            difficulty : 4,
        }
        this.updateState = this.updateState.bind(this);
   } 
    obtainLatestBlock(){
        return this.state.blockchain[0].hash

    }
    
    // addNewBlock(newBlock){
    //     newBlock.precedingHash = this.obtainLatestBlock().hash;
    //     newBlock.hash = newBlock.hashValue();        
    //     this.setState({
    //         blockchain: this.state.blockchain.push(newBlock)
    //     })
    // }


    updateState(newValue){
        setTimeout(()=>{this.setState(
            {
                totalValue : newValue,
                blockchain: this.state.blockchain.concat(this.state.totalValue),
                blength : this.state.blockchain.length,
            }
        )},1000)
    }
    

    render(){
        return(
            <div>
                Testing
                <Block index={1} timestamp={"01/01/2020"} data={"Value1"} prevhash={"0"} difficulty={this.state.difficulty} update={this.updateState}/>
                <Block index={2} timestamp={"02/01/2020"} data={"Value2"} prevhash={"1"} difficulty={this.state.difficulty} update={this.updateState}/>
                <Block index={3} timestamp={"03/01/2020"} data={"Value3"} prevhash={"2"} difficulty={this.state.difficulty} update={this.updateState}/>
                <button onClick={() => this.setState({mark : true, blockchain : this.state.blockchain.concat(this.state.totalValue),blength : this.state.blockchain.length })}> Done </button>
            </div>
        );
    }
}