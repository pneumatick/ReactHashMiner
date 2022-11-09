import React from 'react';

class HashForm extends React.Component {
    render() {
        return (
            <div className='Hash-form'>
                <div className='Hash-input-row'>
                    <div className='Hash-input-div'>
                        <label>Vanity</label>
                        <input 
                            type="text" 
                            id="vanity" 
                            placeholder="Default: 21e8" 
                            onChange={this.props.handleChange} 
                            disabled={this.props.disableVanity}
                        />
                        <div className='Hash-input-disable'>
                            <input 
                                className="Hash-checkbox" 
                                type="checkbox" 
                                id="disableVanity" 
                                onChange={this.props.handleChange} 
                            />
                            <label>Disable</label>
                        </div>
                    </div>
                    <div className='Hash-input-div'>
                        <label>Difficulty</label>
                        <input 
                            type="number" 
                            id="difficulty" 
                            placeholder="Default: 0" 
                            onChange={this.props.handleChange}
                            disabled={this.props.disableDifficulty} 
                        />
                        <div className='Hash-input-disable'>
                            <input 
                                className="Hash-checkbox" 
                                type="checkbox" 
                                id="disableDifficulty" 
                                onChange={this.props.handleChange} 
                            />
                            <label>Disable</label>
                        </div>
                    </div>
                    <div className='Hash-input-div'>
                        <label>Data</label>
                        <input 
                            type="text" 
                            id="data" 
                            placeholder="Enter data here..." 
                            onChange={this.props.handleChange} 
                            disabled={this.props.disableData}
                        />
                        <div className='Hash-input-disable'>
                            <input 
                                className="Hash-checkbox" 
                                type="checkbox" 
                                id="disableData" 
                                onChange={this.props.handleChange} 
                            />
                            <label>Disable</label>
                        </div>
                    </div>
                    <div className='Hash-input-div'>
                        <label>Repeat</label>
                        <input
                            type="number"
                            id="repeat"
                            placeholder="Default: 0"
                            onChange={this.props.handleChange}
                            disabled={this.props.disableRepeat}
                        />
                        <div className='Hash-input-disable'>
                            <input 
                                className="Hash-checkbox" 
                                type="checkbox" 
                                id="disableRepeat" 
                                onChange={this.props.handleChange} 
                            />
                            <label>Disable</label>
                        </div>
                    </div>
                </div>
                <button onClick={this.props.computeHash} disabled={this.props.computing}>Compute</button>
            </div>
        );
    }
}

export default HashForm;