const errorMap = {
  [32700]: {
    message: 'Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.',
  },
  [-32600]: {
    message: 'The JSON sent is not a valid Request object.',
  },
  [-32601]: {
    message: 'The method does not exist / is not available.',
  },
  [-32602]: {
    message: 'Invalid method parameter(s).',
  },
  [-32603]: {
    message: 'Internal JSON-RPC error.',
  },
  [-32000]: {
    message: "Huh? We don't recognize this input",
  },
  [-32001]: {
    message: "Hmmm, we can't find the resource you've requested",
  },
  [-32002]: {
    message: "Sorry, this resource isn't available!",
  },
  [-32003]: {
    message: 'Transaction rejected.',
  },
  [-32004]: {
    message: "This method isn't supported",
  },
  [-32005]: {
    message: 'Whoa, slow down there speed racer! Too many requests!',
  },
  [4001]: {
    message: "Looks like you rejected the request! We'll need you to try again and sign the transaction if you want to purchase this item.",
  },
  [4100]: {
    message: "You'll need to authorize the requested account and/or method before trying again.",
  },
  [4200]: {
    message: "We don't support the action you requested! Try something else!",
  },
  [4900]: {
    message: "Please connect to Polygon!",
  },
  [4901]: {
    message: "Please connect to Polygon!",
  },
}

export default errorMap;