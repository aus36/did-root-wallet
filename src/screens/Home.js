// Imports
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import * as bip39 from '@scure/bip39';
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { useNavigate } from "react-router-dom";
import { createDidDoc, createSCVP } from "../didOperations";
import "../styles/Home.css";

// Main page
const Home = () => {
    // useStates for flags
    const [loaded, setLoaded] = useState(false); // flag for when seed phrase is generated
    const [loaded2, setLoaded2] = useState(false); // flag for when kepair is generated

    // useStates for information
    const [phrase, setPhrase] = useState(""); // seed phrase
    const [keyPair, setKeyPair] = useState({}); // keypair
    const [didDoc, setDidDoc] = useState({}); // did document
    const [scvp, setScvp] = useState({}); // scvp

    // useStates for user input
    const [didUrl, setDidUrl] = useState(""); // url from user input for doc generation
    const [displayName, setDisplayName] = useState(""); // display name for doc generation

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
        else return {}; // if step 1 not complete yet, return empty object
    }

    async function validateOwnership(owner, repo, branch) { // test function for now to check if the user owns the repo
        const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    
        try {
            const response = await fetch(rawUrl);
            const content = await response.text();
            return content;
        } catch (error) {
            console.error('Error fetching the README:', error);
            return null;
        }
    }

    // JSX output to page
    return (
        <div className="main-container"> {/* Main container with application header */}
            <div className="header">
                <div className="header-logo">
                    <h1>Suri</h1>
                    <img className="logo" src="./assets/logo100.png" alt="surilogo"></img>
                </div>
                <h2>Wallet</h2>
            </div>
            <p>Welcome to Suri Wallet. Please choose an option below to manage your decentralized identity.</p>

            <div className="phaseContainer"> {/* Phrase Generator */}
                <p>To begin, click the <strong>"generate secret phrase"</strong> button below. This will generate your random recovery phrase.</p>
                <Button onClick={ () => {setPhrase(generatePhrase());}}>Generate Secret Phrase</Button>
                {loaded && <p>Your secret phrase: (<strong>{phrase}</strong>)<br/>
                <br/><p style={{color: "red"}}>IMPORTANT: This phrase cannot be regenerated or recovered, and can be used to recover your account. Save it in a secure place.</p></p>}
            </div>

            <div className="phaseContainer"> {/* Keypair Generator */}
                <p>Now that you have your secret phrase, you can generate your keypair. Click the <strong>"generate keypair"</strong> button below.</p>
                <Button onClick={ () => { setKeyPair(generateKeyPair(phrase)); setLoaded2(true)}}>Generate Keypair</Button>
                {loaded2 && phrase !== "" && keyPair.privateKey && <p>Your private key: (<strong>{keyPair.privateKey}</strong>)</p>}
                {loaded2 && phrase !== "" && keyPair.publicKey && <p>Your public key: (<strong>{keyPair.publicKey}</strong>)</p>}
                {loaded2 && phrase === "" && <p style={{color: "red"}}>Please complete all previous steps first.</p>}
                
            </div>

            <div className="phaseContainer"> {/* Document Generator */}
                <p>To finalize your new profile, fill in your profile information and click the <strong>"Generate DID"</strong> button below.</p>
                <Form style={{ width: "23%"}}>
                    <Form.Item>
                        <Input onChange={(e) => setDidUrl(e.target.value)} placeholder="Enter your DID URL"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your display name"></Input>
                    </Form.Item>
                </Form>
                <Button 
                    onClick={() => {setDidDoc(createDidDoc(didUrl, displayName, keyPair)); setScvp(createSCVP(didUrl));}}>
                    Generate DID
                </Button>
            </div>
            { JSON.stringify(didDoc) !== "{}" &&
            <div className="phaseContainer"> {/* Display DID Document if Generated */}
                <code>DID document: ({JSON.stringify(didDoc, null, 2)})</code>
            </div>
            }
            { JSON.stringify(scvp) !== "{}" &&
            <div className="phaseContainer"> {/* Display SCVP Document if Generated */}
                <code>SCVP: ({JSON.stringify(scvp, null, 2)})</code>
            </div>
            }

            {/* <div className="phaseContainer">
                <Button onClick={ () => {
                    validateOwnership('aus36', 'did-root-validation', 'master')
                    .then(content => {
                        console.log(content);
                    });}}>
                    Test Validation
                </Button>
            </div> */}
        
        </div>
    );
}
export default Home;