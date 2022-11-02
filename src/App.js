import './App.css';
import React from 'react';

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                             // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);             // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                       // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

async function generateHash(data, vanity) {
  let finalHash = '';
  let nonce = 0;
  let dataHash = await digestMessage(data).then((digestHex) => { return digestHex; });
  finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
  while (finalHash.substring(0, vanity.length) !== vanity) {
    nonce += 1;
    finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
  }

  return {hash: finalHash, data, dataHash, nonce, sha256input: dataHash + nonce};
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };

    this.computeHash = this.computeHash.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async computeHash() {
    let hashObject = await generateHash(this.state.data, '21e8');
    alert(
      `Hash: ${hashObject.hash}\n\n` +
      `Data: ${hashObject.data}\n\n` +
      `Data Hash: ${hashObject.dataHash}\n\n` +
      `Nonce: ${hashObject.nonce}\n\n` +
      `SHA-256 input string: ${hashObject.sha256input}`
    );
  }

  onChange(e) {
    let data = e.target.value;
    this.setState({ data: data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hash Miner</h1>
          <input type="text" onChange={this.onChange} />
          <button onClick={this.computeHash}>Compute</button>
        </header>
      </div>
    );
  }
}
export default App;
