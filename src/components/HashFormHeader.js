import React from 'react';

const HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const HASH_LENGTH = 64;

class HashFormHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            fakeHex: 'placeholder', 
            interval: '' 
        };
    }

    // Create a pseudo-hash for aesthetic purposes, as well as
    // to provide feedback to the user relating to hash computation.
    // The hex string doesn't represent real data. All characters are
    // randomly generated, with a new string being generated every interval.
    componentDidUpdate() {
        if (this.props.computing && !this.state.interval) {
            let interval = setInterval(() => {
                let result = [];
                for (let i = 0; i < HASH_LENGTH; i += 1) {
                    let index = Math.floor(Math.random() * HEX_CHARS.length);
                    result.push(HEX_CHARS[index]);
                }
                this.setState({ fakeHex: result.join('') });
            }, 50);
            
            this.setState({ interval: interval });
        }
        else if (!this.props.computing && this.state.interval) {
            clearInterval(this.state.interval);
            this.setState({interval: ''});
        }
    }

    // Ensure the interval is cleared to prevent memory leaks.
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        let diffRep = '0'.repeat(this.props.difficulty >= 0 ? this.props.difficulty : 0);
        let computing = this.props.computing
        let showWhenComputing = {
            visibility: this.props.computing ? 'visible' : 'hidden'
        };
        let hexColor = '#' + this.state.fakeHex.substring(0, 6);

        return (
            <div className='Hash-form-header'>
                <h2>Target: {this.props.vanity}{diffRep}...</h2>
                <p style={showWhenComputing}>
                    <span style={{ color: hexColor }}>{this.state.fakeHex}</span>
                </p>
                <p style={showWhenComputing}>
                    {computing} hash{computing !== 1 ? 'es' : ''} in progress
                </p>
            </div>
        );
    }
}

export default HashFormHeader;