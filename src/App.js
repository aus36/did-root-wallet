import React, { useEffect, useState } from "react";
import { Button } from "antd";
import * as bip39 from '@scure/bip39';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { getKeyPairFromMnemonic } from 'human-crypto-keys';
import "./App.css";

// Main page
const App = () => {

    // Functions
    function generatePhrase(){
        // generate a bitcoin bip39 phrase
        const phrase = bip39.generateMnemonic(english);
        // log and return the phrase
        console.log(phrase);
        return phrase;
    }

    async function generateKeyPair(mnemonic){
        // generate a keypair
        const keyPair = await getKeyPairFromMnemonic(mnemonic, 'ed25519');
        // log and return the keypair
        console.log(keyPair);
        return keyPair;
    }

    function setKeys(keyPair){
        // set the key useStates
        setPrivateKey(keyPair.privateKey);
        setPublicKey(keyPair.publicKey);
    }

    // useStates for flags
    const [loaded, setLoaded] = useState(false); // flag for when seed phrase is generated
    const [loaded2, setLoaded2] = useState(false); // flag for when kepair is generated

    // useEffect to show all information when done
    useEffect(() => {
        if (loaded && loaded2){
            console.log("phrase: " + phrase);
            console.log("private key: " + privateKey);
            console.log("public key: " + publicKey);
        }
    }, [loaded, loaded2]);

    // useStates for information
    const [phrase, setPhrase] = useState(""); // seed phrase
    const [privateKey , setPrivateKey] = useState(""); // private key
    const [publicKey, setPublicKey] = useState(""); // public key

    // JSX
    return ( 
        <div className="main-container">
            <h1>Decentralized Wallet PWA</h1>
            <div className="phaseContainer">
                <p>
                    This is a decentralized wallet application that will allow you to create a full decentalized profile for the web.<br/>To begin, click the <strong>"generate secret phrase"</strong> button below. This will generate a random phrase that will be the seed for your keys.
                </p>
                <Button onClick={ () => {setPhrase(generatePhrase()); setLoaded(true)}}>Generate Secret Phrase</Button>
            {loaded && <p>Your secret phrase: (<strong>idk how to put the phrase here</strong>)<br/><br/>IMPORTANT: This phrase cannot be regenerated or recovered, save it in a secure place.</p>}
            </div>
            <div className="phaseContainer">
                <p>
                    Now that you have your secret phrase, you can generate your keypair. Click the <strong>"generate keypair"</strong> button below to generate your keypair.
                </p>
                <Button onClick={ () => { setKeys(generateKeyPair(phrase)); setLoaded2(true)}}>Generate Keypair</Button>
            {loaded2 && <p>Your secret phrase: (<strong>idk how to put the phrase here</strong>)<br/><br/>IMPORTANT: This phrase cannot be regenerated or recovered, save it in a secure place.</p>}
            <div/>
        </div>
        </div>
    );
    }

export default App;