import { Button } from "antd"

// VC Screen for modifying SCVP with new VCs

const testVC = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": "http://example.gov/credentials/3732",
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "https://example.edu/issuers/565049",
    "issuanceDate": "2010-01-01T19:23:24Z",
    "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "degree": {
            "type": "BachelorDegree",
            "name": "Bachelor of Science and Arts"
        }
    }
}

const testSCVP = {
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
          "issuer": "did",
          "issuanceDate": "ctime",
          "prev": null,
          "seqno": 1,
          "ctime": "ctime",
          "etime": "etime",
          "credentialSubject": {
              "id":"did",
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
              "created": "ctime",
              "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..AUQ3AJ23WM5vMOWNtYKuqZBekRAOUibOMH9XuvOd39my1sO-X9R4QyAXLD2ospssLvIuwmQVhJa-F0xMOnkvBg - replace this later",
              "proofPurpose": "assertionMethod",
              "verificationMethod": "did" + "#key1"
          }
      }
    ]
} 

function addVC(VC, SCVP) {    // Add VC to SCVP
    console.log("new SCVP: " + JSON.stringify(SCVP, null, 2))
}

const VCPage = () => {
    return (
        <div>
            <h1>VC Page</h1>
            <Button onClick={ 
                () => { addVC(testVC, testSCVP)}
            }>Test Add VC</Button>
        </div>
    )
}

export default VCPage