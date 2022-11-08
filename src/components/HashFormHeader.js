import React from 'react';

const HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const HASH_LENGTH = 64;

class HashFormHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            fakeHex: '', 
            interval: '' 
        };
    }

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

    render() {
        let diffRep = '0'.repeat(this.props.difficulty);
        let computing = this.props.computing
        let showWhenComputing = {display: this.props.computing ? 'block' : 'none'};
        let hexColor = '#' + this.state.fakeHex.substring(0, 6);

        return (
            <div className='Hash-form-header'>
                <p>Target: {this.props.vanity}{diffRep}...</p>
                <p style={showWhenComputing}>{computing} hash{computing !== 1 ? 'es' : ''} in progress:</p>
                <p style={showWhenComputing}>
                    <span style={{ color: hexColor }}>{this.state.fakeHex}</span>
                </p>
            </div>
        );
    }
}

export default HashFormHeader;