// Operations for creating DID document and SCVP document

function createDidDoc(didUrl, displayName, keyPair){
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
            "displayName": displayName,
            "displayImg": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        });
        
        // return and log didDoc
        console.log(JSON.stringify(didDocument, null, 2));
        return didDocument;
    }
}


function createSCVP(didUrl) // creates sigchain verifiable presentation (the full profile of the user)
    {
        // record did
        const did = "did:web:" + didUrl.replace(/\//g, ':');

        // record current datetime
        const date = new Date();
        const ctime = date.toISOString();
        const etime = "expiration not specified";

        // create the scvp
        const SCVP = {
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
        return SCVP;
    }


export {createDidDoc, createSCVP};