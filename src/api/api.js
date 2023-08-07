// Functions for validating the did document and vp pair
//========================================================
// 1. Fetch the did document from a hosted location
async function fetchJSON(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(JSON.stringify(data, null, 2)); // Prints the JSON to the console
      return data;
    })
    .catch(error => console.error('An error occurred while fetching the JSON from '+url+": ", error));
  }
  
  // 2. Validate the did document and vp pair
  async function validateDidVp(vpUrl, didUrl) {
    let vp = await fetchJSON(vpUrl);
    let did = await fetchJSON(didUrl);
    
    if(vp["verifiableCredentials"][0]["credentialSubject"]["id"] === did["id"]) {
      return true
    }
    else return false
  }
  //========================================================

export { validateDidVp };