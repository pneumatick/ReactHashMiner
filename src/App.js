import './App.css';
import React from 'react';
import HashFormContainer from './components/HashFormContainer';
import HashTable from './components/HashTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashes: []
    }

    this.addHash = this.addHash.bind(this);
  }

  addHash(newHash) {
    this.setState((prevState) => {
       return { hashes: [...prevState.hashes, newHash] };
    });
  }

  // Is this necessary?
  componentDidUpdate() {
    // console.log(this.state.hashes);
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
