import React from 'react';

class HashForm extends React.Component {
    render() {
        return (
            <div>
                <label>Vanity</label>
                <input 
                    type="text" 
                    id="vanity" 
                    placeholder="Default: 21e8" 
                    onChange={this.props.handleChange} 
                />
                <label for="difficulty">Difficulty</label>
                <input 
                    type="text" 
                    id="difficulty" 
                    placeholder="Default: 0" 
                    onChange={this.props.handleChange} 
                />
                <label for="data">Data</label>
                <input 
                    type="text" 
                    id="data" 
                    placeholder="Enter data here..." 
                    onChange={this.props.handleChange} 
                />
                <button onClick={this.props.computeHash} disabled={this.props.computing}>Compute</button>
            </div>
        );
    }
}

export default HashForm;