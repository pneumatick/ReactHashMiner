import './App.css';
import React from 'react';

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                             // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);             // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                       // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

async function generateHash(data, vanity, difficulty) {
  let finalHash = '';
  let nonce = 0;
  let target = vanity + '0'.repeat(difficulty);
  let dataHash = await digestMessage(data).then((digestHex) => { return digestHex; });

  finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
  while (finalHash.substring(0, target.length) !== target) {
    nonce += 1;
    finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
  }

  return {hash: finalHash, difficulty, data, dataHash, nonce, sha256input: dataHash + nonce};
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      vanity: '21e8',
      difficulty: 0
    };

    this.computeHash = this.computeHash.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async computeHash() {
    let hashObject = await generateHash(
      this.state.data, 
      this.state.vanity, 
      this.state.difficulty
    );
    alert(
      `Hash: ${hashObject.hash}\n\n` +
      `Difficulty: ${hashObject.difficulty}\n\n` +
      `Data: ${hashObject.data}\n\n` +
      `Data Hash: ${hashObject.dataHash}\n\n` +
      `Nonce: ${hashObject.nonce}\n\n` +
      `SHA-256 input string: ${hashObject.sha256input}`
    );
  }
  handleChange(e) {
    let value = e.target.value;
    
    switch (e.target.id) {
      case 'vanity':
        this.setState({ vanity: value });
        break;
      case 'difficulty':
        this.setState({ difficulty: value });
        break;
      case 'data':
        this.setState({ data: value });
        break;
      default:
        console.log(`Unknown element: ${e.target}`);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hash Miner</h1>
          <label>Vanity</label>
          <input 
            type="text" 
            id="vanity" 
            placeholder="Default: 21e8" 
            onChange={this.handleChange} 
          />
          <label for="difficulty">Difficulty</label>
          <input 
            type="text" 
            id="difficulty" 
            placeholder="Default: 0" 
            onChange={this.handleChange} 
          />
          <label for="data">Data</label>
          <input 
            type="text" 
            id="data" 
            placeholder="Enter data here..." 
            onChange={this.handleChange} 
          />
          <button onClick={this.computeHash}>Compute</button>
        </header>
      </div>
    );
  }
}
export default App;
