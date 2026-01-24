handleResults = result => {
  console.log(result);
};
const url = "https://httpbin.org/post";
const data = { text: "Hello!" };

function callbackPOST() {
  fetch(url, {
    method: "POST",
    body: data
  })
    .then(res => res.json())
    .then(handleResults);
}

async function promisePOST() {
  const response = await fetch(url, {
    method: "POST",
    body: data
  });
  const result = await response.json();
  handleResults(result);
}

async function promiseGET() {
  const response = await fetch(url);
  const result = await response.json();
  handleResults(result);
}
