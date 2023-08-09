// Imports
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import * as bip39 from '@scure/bip39';
import * as ed from '@noble/ed25519';
//import * as didJWT from 'did-jwt';
//import * as didJWTvc from 'did-jwt-vc';
import { sha512 } from '@noble/hashes/sha512';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import "./App.css";

// Main page
const App = () => {
    // useStates for flags
    const [loaded, setLoaded] = useState(false); // flag for when seed phrase is generated
    const [loaded2, setLoaded2] = useState(false); // flag for when kepair is generated

    // useStates for information
    const [phrase, setPhrase] = useState(""); // seed phrase
    const [keyPair, setKeyPair] = useState({}); // keypair

    // Functions
    function generatePhrase(){ // Generates a mnemonic phrase using the bitcoin bip39 standard
        // generate a phrase
        const phrase = bip39.generateMnemonic(english);

        // log, set loaded state, and return the phrase
        console.log(phrase);
        setLoaded(true);
        return phrase;
    }

    function generateKeyPair(mnemonic){ // Generates an ed25519 private and public key
        if(loaded)
        {
            // generate a private key
            const privateKey = ed.utils.randomPrivateKey();

            // set the sha 512 sync for synchronous key gen
            ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

            // generate a public key
            const publicKey = ed.getPublicKey(privateKey);

            // create JSON object of keypair
            const keyPair = {
                privateKey: privateKey.toString('hex'),
                publicKey: publicKey.toString('hex')
            }

            // log and return the keypair
            console.log(keyPair);
            return keyPair;
        }
        else return {};
    }

    

    // JSX output to page
    return ( 
        <div className="main-container"> {/* Main container with application header */}
            <h1>Decentralized Credential Wallet</h1>
            <p>This is a decentralized wallet application that will allow you to create a full decentalized profile for the web.</p>
            <p>The application is also a PWA, so it is downloadable to desktop and mobile</p>

            <div className="phaseContainer"> {/* Phrase Generator */}
                <p>To begin, click the <strong>"generate secret phrase"</strong> button below. This will generate a random phrase that will be the seed for your keys.</p>
                <Button onClick={ () => {setPhrase(generatePhrase());}}>Generate Secret Phrase</Button>
                {loaded && <p>Your secret phrase: (<strong>{phrase}</strong>)<br/>
                <br/>IMPORTANT: This phrase cannot be regenerated or recovered, and can be used to recover your account. Save it in a secure place.</p>}
            </div>

            <div className="phaseContainer"> {/* Keypair Generator */}
                <p>
                    Now that you have your secret phrase, you can generate your keypair. Click the <strong>"generate keypair"</strong> button below to generate your keypair.
                </p>
                <Button onClick={ () => { setKeyPair(generateKeyPair(phrase)); setLoaded2(true)}}>Generate Keypair</Button>
                {loaded2 && phrase !== "" && keyPair.privateKey && <p>Your private key: (<strong>{keyPair.privateKey}</strong>)</p>}
                {loaded2 && phrase !== "" && keyPair.publicKey && <p>Your public key: (<strong>{keyPair.publicKey}</strong>)</p>}            
                {loaded2 && phrase === "" && <p style={{color: "red"}}>Please complete all previous steps first.</p>}
                
            </div>

            <div className="phaseContainer"> {/* Document Generator */}
                <p>This is the final step. Enter your DID URL, then click the <strong>"generate DID"</strong> button below to generate your a starter DID document and SCVP.</p>
                <Button onClick={() => {}}> Generate DID </Button>   
            </div>
        </div>
    );
}
export default App;