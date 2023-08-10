# DID:ROOT Wallet
This application is a progressive web application that is used to generate a decentralized profile for a sigchain-based contacts application.

### Uses
* 🔐 Generates an ed25519 keypair for the user and shows it to them
* 🌱 Shares the seed phrase that generated the keypair so the user can save it for recovery
* 📑 Asks the user to input some basic details, and then creates a did:web document and sigchain verifiable presentation

### How to use - Live
To accesss the application, simply [click this link](https://aus36.github.io/did-wallet-pwa/) to navigate to the site. Also, since the website is a progressive web application, the application can be downloaded and used on or offline on the desktop or mobile.

### How to use - For Developers
To run a development instance of this application:
* clone the application to your machine and navigate to the folder in your console
* run ```npm install``` to install all dependencies
* run ```npm start``` to start the development server
* if the console doesn't automatically open the browser page, navigate to the browser and enter the url: http://localhost:3000/did-root-wallet
* That's it! 🎉 If any issues are found, please feel free to post them in the GitHub issues page for this repo
