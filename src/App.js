import './App.css';
import React from 'react';
import HashFormContainer from './components/HashFormContainer';
import HashTable from './components/HashTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashes: {}
    }

    this.addHash = this.addHash.bind(this);
  }

  // Add a new hash to the 'hashes' state variable
  addHash(dataHash, vanity, nonce, newHashArray) {
    this.setState((prevState) => {
      let hashes = {...prevState.hashes};

      // Check if the data has been hashes previously
      if (hashes[dataHash]) { 
        // Check if the vanity has been used previously
        if (hashes[dataHash][vanity]) {
          let prevNonce = hashes[dataHash][vanity]['prevNonce']
          let newNonce = prevNonce < nonce ? nonce : prevNonce;
          let newObj = {...hashes[dataHash], [vanity]: {
              'prevNonce': newNonce, 
              'hashes': [...hashes[dataHash][vanity]['hashes'], newHashArray] 
            } 
          };

          hashes[dataHash] = newObj;
        }
        else {
          hashes[dataHash][vanity] = { 'prevNonce': nonce, 'hashes': [newHashArray] };
        }
      }
      else {
        hashes[dataHash] = { [vanity]: { 'prevNonce': nonce, 'hashes': [newHashArray] } };
      }

      return { hashes: hashes };
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hash Miner</h1>
          <HashFormContainer 
            handleChange={this.handleChange}
            addHash={this.addHash}
          />
          <HashTable hashes={this.state.hashes} />
        </header>
      </div>
    );
  }
}
export default App;
