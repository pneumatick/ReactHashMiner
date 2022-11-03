import React from 'react';
import HashForm from './HashForm';
import generateHash from '../scripts/computeHash';

class HashFormContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        vanity: '21e8',
        difficulty: 0,
        data: ''
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
      this.props.addHash([hashObject.hash, hashObject.sha256input]);
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
        <HashForm 
          handleChange={this.handleChange}
          computeHash={this.computeHash}
        />
      );
    }
}

export default HashFormContainer;