// Imports
import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import * as bip39 from '@scure/bip39';
import * as ed from '@noble/ed25519';
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
    const [didDoc, setDidDoc] = useState({}); // did document
    const [scvp, setScvp] = useState({}); // scvp

    // useStates for user input
    const [didUrl, setDidUrl] = useState(""); // url from user input for doc generation
    const [isPerson, setIsPerson] = useState(true); // type of subject for doc generation
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

    function createDidDoc(){ // Creates a did document
        if((loaded2 && loaded && didUrl !== "" ) && (displayName !== ""))
        {
            // did link for id
            const did = "did:web:" + didUrl.replace(/\//g, ':');
            console.log(did);
            // start with did doc template using did
            const didDocument = {
                "@context": [
                    "https://www.w3.org/ns/did/v1",
                    "https://w3id.org/security/suites/jws-2020/v1"
                ],
                "id": did,
                "verificationMethod": [
                    {
                    "id": did + "#key1",
                    "type": "Ed25519VerificationKey2020",
                    "controller": did + "#key1",
                    "Ed25519VerificationKey2020" : keyPair.publicKey
                    }
                ],
                "assertionMethod": [
                    did + "#key1"
                ],
                "subject": [
                    
                ]
            }

            // add the subject info to the did document
            didDocument.subject.push({
                "subjectType": isPerson ? "Person" : "Organization",
                "displayName": displayName,
                "displayImg": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            });
            
            // return and log didDoc
            console.log(JSON.stringify(didDocument, null, 2));
            return didDocument;
        }
        else return {}; // if step 2 not complete yet, return empty object
    }

    function createSCVP() // creates sigchain verifiable presentation (the full profile of the user)
    {
        // record did
        const did = "did:web:" + didUrl.replace(/\//g, ':');

        // record current datetime
        const date = new Date();
        const ctime = date.toISOString();
        const etime = "expiration not specified";

        // create the scvp
        const VP = {
                "@context": [
                  "https://www.w3.org/2018/credentials/v1"
                ],
                "type": [
                  "VerifiablePresentation", "SigchainPresentation"
                ],
                "verifiableCredential": [
                  {
                      "@context": [
                          "https://www.w3.org/2018/credentials/v1",
                          "https://www.w3.org/2018/credentials/examples/v1"
                      ],
                      "id": "http://example.com/user/sigs/eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ",
                      "type": [
                          "VerifiableCredential",
                          "SigchainCredential"
                      ],
                      "issuer": did,
                      "issuanceDate": ctime,
                      "prev": null,
                      "seqno": 1,
                      "ctime": ctime,
                      "etime": etime,
                      "credentialSubject": {
                          "id":did,
                          "vmHash": "sImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19 - replace this later",
                          "type": "identity",
                          "service": {
                              "name": "Github",
                              "user": "https://github.com/aus36",
                              "proof": "https://github.com/aus36/sample-proof/blob/master/proof.json"
                          },
                          "version": 0.1
                      },
                      "proof": {
                          "type": "Ed25519Signature2018",
                          "created": ctime,
                          "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..AUQ3AJ23WM5vMOWNtYKuqZBekRAOUibOMH9XuvOd39my1sO-X9R4QyAXLD2ospssLvIuwmQVhJa-F0xMOnkvBg - replace this later",
                          "proofPurpose": "assertionMethod",
                          "verificationMethod": did + "#key1"
                      }
                  }
                ]
            } 
        return VP;
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
            <h1>DID Root - Wallet</h1>
            <p>This is a decentralized wallet application that will allow you to create a full decentralized profile for the web.</p>
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
                <Form style={{ width: "25%"}}>
                    <Radio.Group value = {isPerson ? true : false} style={{marginBottom : "10px"}}  onChange={(e) => {const selectedVal = e.target.value; setIsPerson(selectedVal);}}>
                        <Radio defaultChecked = {isPerson} style = {{color : "white"}} value = {true}>Person</Radio>
                        <Radio defaultChecked = {isPerson} style = {{color : "white"}} value = {false}>Organization</Radio>
                    </Radio.Group>
                    <Form.Item name = "didUrl">
                        <Input onChange={(e) => setDidUrl(e.target.value)} placeholder="Enter your DID URL"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter your display name"></Input>
                    </Form.Item>
                </Form>
                <Button onClick={() => {setDidDoc(createDidDoc()); setScvp(createSCVP());}}> Generate DID </Button>
            </div>
            { JSON.stringify(didDoc) !== "{}" &&
            <div className="phaseContainer"> {/* Display DID Document if Generated */}
                <code>Did document: ({JSON.stringify(didDoc, null, 2)})</code>
            </div>
            }
            { JSON.stringify(scvp) !== "{}" &&
            <div className="phaseContainer"> {/* Display SCVP Document if Generated */}
                <code>SCVP document: ({JSON.stringify(scvp, null, 2)})</code>
            </div>
            }

            <div className="phaseContainer"> {/* Test validation of ownership */}
                <Button onClick={ () => {
                    validateOwnership('aus36', 'did-root-validation', 'master')
                    .then(content => {
                        console.log(content);
                    });}}>
                    Test Validation
                </Button>
            </div>
        
        </div>
    );
}
export default App;