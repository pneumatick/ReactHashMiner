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
    this.checkHash = this.checkHash.bind(this);
    this.loadHashFile = this.loadHashFile.bind(this);
  }

  // Add a new hash to the 'hashes' state variable
  addHash(dataHash, vanity, nonce, newHashArray) {
    this.setState((prevState) => {
      let hashes = {...prevState.hashes};

      // Check if the data has been hashed previously
      if (hashes[dataHash]) { 
        // Check if the vanity has been used previously
        if (hashes[dataHash][vanity]) {
          let prevNonce = hashes[dataHash][vanity]['prevNonce'];
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

  // Check if data has been hashes with a given vanity previously.
  // Return the previous nonce if it has, otherwise return 0.
  checkHash(dataHash, vanity) {
    let nonce = 0;

    try {
      nonce = this.state.hashes[dataHash][vanity]['prevNonce'];
    }
    catch (e) {
      console.log('New data or vanity: Starting computation from nonce 0');
    }

    return nonce;
  }

  // Load a hash object from a json file
  loadHashFile(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = e => {
      this.setState({ hashes: JSON.parse(e.target.result) });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hash Miner</h1>
          <HashFormContainer 
            handleChange={this.handleChange}
            addHash={this.addHash}
            checkHash={this.checkHash}
          />
          <HashTable 
            hashes={this.state.hashes}
            loadHashFile={this.loadHashFile}
          />
        </header>
      </div>
    );
  }
}
export default App;
