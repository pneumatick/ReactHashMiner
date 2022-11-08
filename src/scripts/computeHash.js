async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                             // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);             // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                       // convert buffer to byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
}

async function generateHash(dataHash, vanity, difficulty, nonce = 0) {
    let finalHash = '';
    let target = vanity + '0'.repeat(difficulty);

    finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
    while (finalHash.substring(0, target.length) !== target) {
        nonce += 1;
        finalHash = await digestMessage(dataHash + nonce).then((digestHex) => { return digestHex; });
    }

    return {hash: finalHash, difficulty, dataHash, nonce, sha256input: dataHash + nonce};
}

export { digestMessage, generateHash };