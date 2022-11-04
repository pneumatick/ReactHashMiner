import React from 'react';
import HashForm from './HashForm';
import { digestMessage, generateHash } from '../scripts/computeHash';

class HashFormContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vanity: '21e8',
        difficulty: 0,
        data: '',
        avoidDups: false,
        prevDataHashes: {},   // Redundant, remove later
        computing: false
      };
  
      this.computeHash = this.computeHash.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    // Check for duplicate data hashes (not the final vanity hashes).
    // For "1 hash per data" option.
    // Return true if the hash is a duplicate, false otherwise.
    duplicateCheck(dataHash) {
      let duplicate = false;

      if (Object.hasOwn(this.state.prevDataHashes, dataHash)) {
        duplicate = true;
      }
      else {
        this.setState((prevState) => {
          return { prevDataHashes: { ...prevState.prevDataHashes, [dataHash]: 1 } };
        });
      }

      return duplicate;
    }

    // Check for a valid vanity target.
    // Return true if the vanity target is invalid, false otherwise.
    invalidHexCheck(vanity) {
      let invalid = false;
      if (vanity) { Number('0x' + vanity) ? invalid = false : invalid = true; }
      return invalid;
    }
  
    // NOTE TO SELF: The 'computing' state variable might have to be dealt
    // with in a more sophisticated manner if/when you allow multiple computations
    // at the same time.
    //
    // 
    async computeHash() {
      let vanity = this.state.vanity;
      let difficulty = this.state.difficulty;
      let data = this.state.data;

      this.setState({ computing: true });
      let dataHash = await digestMessage(data).then((digestHex) => { return digestHex; });

      // Optional feature to avoid hashing the same data multiple times.
      //
      // STATUS: DEFAULT DISABLED AND UNTOGGLEABLE
      //      
      // 
      if (this.state.avoidDups && this.duplicateCheck(dataHash)) {
        alert("Duplicate data detected! This data has already been hashed");
        this.setState({ computing: false });
        return;
      }
      else if (this.invalidHexCheck(vanity)) {
        alert("Invalid vanity detected! Enter hex-compatible characters.")
        this.setState({ computing: false });
        return;
      }

      let hashObject = await generateHash(
        dataHash, 
        vanity, 
        difficulty
      );
      alert(
        `Hash: ${hashObject.hash}\n\n` +
        `Difficulty: ${hashObject.difficulty}\n\n` +
        `Data Hash: ${hashObject.dataHash}\n\n` +
        `Nonce: ${hashObject.nonce}\n\n` +
        `SHA-256 input string: ${hashObject.sha256input}`
      );
      this.props.addHash(hashObject.dataHash, vanity, hashObject.nonce, [hashObject.hash, hashObject.sha256input]);
      this.setState({ computing: false });
    }

    handleChange(e) {
        let value = e.target.value;
        
        switch (e.target.id) {
        case 'vanity':
            this.setState({ vanity: value.trim() });
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
        <HashForm 
          handleChange={this.handleChange}
          computeHash={this.computeHash}
          computing={this.state.computing}
        />
      );
    }
}

export default HashFormContainer;