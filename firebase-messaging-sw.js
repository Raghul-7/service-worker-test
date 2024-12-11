// importScripts();

// worker-proxy.js
const fetch = require('node-fetch');  // We use node-fetch to fetch the external worker.js

exports.handler = async function(event, context) {
  try {
    // Fetch the worker.js file from an external server
    const response = await fetch('https://sdk.smartdx.co/Scripts/gcp-push.js');  // Replace with your worker.js URL
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Failed to fetch worker.js: ${response.statusText}`,
      };
    }

    // Read the content of the worker.js file
    const scriptContent = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript',  // Serve it as JavaScript
        'Access-Control-Allow-Origin': '*',  // Allow access from any domain
      },
      body: scriptContent,  // Return the content of the worker.js
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching worker.js: ${error.message}`,
    };
  }
};
