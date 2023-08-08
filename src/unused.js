// This file stores all unused, removed, or commented out code snippets from the project.
// Rest in peace to all unused code

// Original App.js
// ==================================================================================================================================================
// const App = () => {
//     const [url, setUrl] = useState("joe.com"); // Url for did doc creation

//     const [isOrg, setIsOrg] = useState(false); // flag for if the user is an organization or not

//     const [orgName, setOrgName] = useState(""); // name of the organization
//     const [firstName, setFirstName] = useState("joe"); // first name of the user
//     const [lastName, setLastName] = useState("brandon"); // last name of the user

//     const [vpUrl, setVpUrl] = useState("https://aus36.github.io/didweb-doc/vp.json"); // Url for hosted vp
//     const [didUrl, setDidUrl] = useState("https://aus36.github.io/didweb-doc/did.json"); // Url for hosted did document

//     const [loaded, setLoaded] = useState(false); // flag for when the validate pair function has been called

//     const [validateSuccessful, setValidateSuccessful] = useState(false); // flag for the result when the validate pair function has been called

//     const setType = () => {
//         if (document.getElementById('type').value === 'organization') {
//         setIsOrg(true);
//         } else {
//         setIsOrg(false);
//         }
//     }

//     return ( 
//         <div className="main-container">
//             <h1>did:web Wallet PWA</h1>
//             <div id="didDocGen" className="didDocGen">
//                 <form
//                 onSubmit={e => {
//                     // e.preventDefault(); // interacts with server and will blow up everything, keep commented out for now
//                     // submit(url, isOrg, orgName, firstName, lastName);
//                 }}>
//                 <label>
//                     URL:
//                     <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Subject Type:
//                     <select id='type' onChange={setType}>
//                     <option value="person">Person</option>
//                     <option value="organization">Organization</option>
//                     </select>
//                 </label>
//                 <br />
//                 {isOrg ?
//                     <label>
//                     Organization Name:
//                     <input type="text" onChange={e => setOrgName(e.target.value)} />
//                     </label> :
//                     <label>
//                     First Name:
//                     <input id="firstName" value={firstName} type="text" onChange={e => setFirstName(e.target.value)} />
//                     <br />
//                     Last Name:
//                     <input id="lastName" value={lastName} type="text" onChange={e => setLastName(e.target.value)} />
//                     </label>
//                 }
//                 <br />
//                 <input type="submit" value="Submit" />
//                 </form>
//             </div>
//             <div id="validation" className="validation">
//                 <form>
//                     <label>
//                         DID Document URL:
//                         <input id="didDocUrl" value={didUrl} type="text" onChange={e => setDidUrl(e.target.value)} />
//                         <br />
//                         Verifiable Presentation URL:
//                         <input id="vpUrl" value={vpUrl} type="text" onChange={e => setVpUrl(e.target.value)} />
//                     </label>
//                 </form>
//                 <br />
//                 <button onClick={ () => {setValidateSuccessful(validateDidVp(vpUrl, didUrl)); setLoaded(true);}}>Validate did document and vp pair</button>
//                 <br />
//                 {loaded
//                 ? <p>Validation result: {validateSuccessful ? "Pair Sucessfully Validated" : "Invalid DID Doc/VP Pair"}</p> 
//                 : <p>Nothing to validate yet</p>}
//             </div>
//         </div>
//     );
//     }

// export default App;
// ==================================================================================================================================================
