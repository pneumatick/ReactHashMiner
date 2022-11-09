import React from 'react';

class HashTable extends React.Component {
    constructor(props) {
        super(props);

        this.saveHashesToFile = this.saveHashesToFile.bind(this);
    }

    saveHashesToFile() {
        const element = document.createElement("a");
        let hashes = JSON.stringify(this.props.hashes);
        const file = new Blob([hashes], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = "hashes.json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        let hashes = this.props.hashes;
        let rawHashes = [];
        let listedHashes = [];

        for (let dataHash in hashes) {
            for (let vanity in hashes[dataHash]) {
                for (let hash of hashes[dataHash][vanity]['hashes']) {
                    rawHashes.push(hash);
                }
            }
        }
        
        rawHashes.forEach((hash, index) => {
            listedHashes.push(
                <tr key={index} id={index}>
                    <td>{index}</td>
                    <td>{hash[0]}</td>
                    <td>{hash[1]}</td>
                </tr>
            )
        });

        return (
            <div className='Hash-table'>
                <input type="file" accept=".json" onChange={this.props.loadHashFile}></input>
                <button onClick={this.saveHashesToFile}>Download</button>
                <table>
                    <thead>
                        <tr>
                            <td className='id'>#</td>
                            <td>Hash</td>
                            <td>Input (data hash + nonce)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listedHashes.reverse()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HashTable;