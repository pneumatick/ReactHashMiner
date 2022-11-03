import React from 'react';

class HashTable extends React.Component {
    render() {
        let listedHashes = [];
        this.props.hashes.forEach((hash, index) => {
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
                <table>
                    <thead>
                        <tr>
                            <td className='id'>ID</td>
                            <td>Hash</td>
                            <td>Input (data hash + nonce)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listedHashes}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HashTable;