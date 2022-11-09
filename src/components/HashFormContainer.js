import React from 'react';
import HashFormHeader from './HashFormHeader';
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
        computing: 0,
        iterations: 1,
        disableVanity: false,
        disableDifficulty: false,
        disableData: false,
        disableRepeat: false
      };
  
      this.computeHash = this.computeHash.bind(this);   // Unnecessary?
      this.computeHashWrapper = this.computeHashWrapper.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    // Check for duplicate data hashes (not the final vanity hashes).
    // For "1 hash per data" option.
    // Return true if the hash is a duplicate, false otherwise.
    duplicateCheck(dataHash) {
      let duplicate = false;

      if (this.props.checkHash(dataHash)) {
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
  
    // Compute the vanity hash
    async computeHash(vanity, difficulty, data) {
      let dataHash = await digestMessage(data).then((digestHex) => { return digestHex; });

      // Optional feature to avoid hashing the same data multiple times.
      //
      // STATUS: DISABLED AND UNTOGGLEABLE
      if (this.state.avoidDups && this.duplicateCheck(dataHash)) {
        alert("Duplicate data detected! This data has already been hashed");
        this.setState(prevState => { return { computing: prevState.computing - 1 } });
        return;
      }
      // Ensure the vanity is valid to avoid infinite computation
      else if (this.invalidHexCheck(vanity)) {
        alert("Invalid vanity detected! Enter hex-compatible characters.")
        this.setState(prevState => { return { computing: prevState.computing - 1 } });
        return;
      }

      let hashObject = await generateHash(
        dataHash, 
        vanity, 
        difficulty,
        this.props.checkHash(dataHash, vanity) + 1  // Returns prevNonce if it exists
      );
      /*// For testing; leave just in case you want it later
      alert(
        `Hash: ${hashObject.hash}\n\n` +
        `Difficulty: ${hashObject.difficulty}\n\n` +
        `Data Hash: ${hashObject.dataHash}\n\n` +
        `Nonce: ${hashObject.nonce}\n\n` +
        `SHA-256 input string: ${hashObject.sha256input}`
      );*/
      this.props.addHash(hashObject.dataHash, vanity, hashObject.nonce, [hashObject.hash, hashObject.sha256input]);
      this.setState(prevState => { return { computing: prevState.computing - 1 } });
    }

    async computeHashWrapper() {
      let vanity = this.state.vanity;
      let difficulty = this.state.difficulty;
      let data = this.state.data;
      let iterations = this.state.iterations >= 1 ? this.state.iterations : 0;
      this.setState(prevState => { return { computing: iterations } });
      for (let i = 0; i < iterations; i += 1) {
        await this.computeHash(vanity, difficulty, data);
      }
    }

    // This could be broken up into two functions.
    // One for text inputs, the other for checkbox inputs.
    handleChange(e) {
        let value = e.target.value;
        
        switch (e.target.id) {
          case 'vanity':
            value = value.trim();
            if (this.invalidHexCheck(value)) {
              e.target.value = this.state.vanity;
            }
            else {
              this.setState({ vanity: value !== '' ? value : '21e8' });
            }
            break;
          case 'difficulty':
            this.setState({ difficulty: value });
            break;
          case 'data':
            this.setState({ data: value });
            break;
          case 'repeat':
            this.setState({ iterations: Number(value) + 1 });
            break;
          case 'disableVanity':
            this.setState({ 
              disableVanity: !this.state.disableVanity, 
              vanity: !this.state.disableVanity ? '' : document.getElementById('vanity').value || '21e8'
            });
            break;
          case 'disableDifficulty':
            this.setState({ 
              disableDifficulty: !this.state.disableDifficulty, 
              difficulty: !this.state.disableDifficulty ? '' : document.getElementById('difficulty').value || 0
            });
            break;
          case 'disableData':
            this.setState({ 
              disableData: !this.state.disableData, 
              data: !this.state.disableData ? '' : document.getElementById('data').value || ''
            });
            break;
          case 'disableRepeat':
            this.setState({ 
              disableRepeat: !this.state.disableRepeat, 
              iterations: !this.state.disableRepeat ? 1 : Number(document.getElementById('repeat').value) + 1 || 1
            });
            break;
          default:
            console.log(`Unexpected element: ${e.target}`);
        }
    }
  
    render() {
      return (
        <div className='Hash-form-container'>
          <HashFormHeader
          vanity={this.state.vanity}
          difficulty={this.state.difficulty}
          data={this.state.data}
          computing={this.state.computing}
          />
          <HashForm 
            handleChange={this.handleChange}
            computeHash={this.computeHashWrapper}
            computing={this.state.computing}
            disableVanity={this.state.disableVanity}
            disableDifficulty={this.state.disableDifficulty}
            disableData={this.state.disableData}
            disableRepeat={this.state.disableRepeat}
          />
        </div>
      );
    }
}

export default HashFormContainer;