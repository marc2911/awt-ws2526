const url = "https://httpbin.org/post";
const data = { text: "Hello!" };

const handleResults = result => {
  console.log(result);
};

function get() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const results = JSON.parse(xhr.responseText);
        handleResults(results);
      }
    }
  };
  xhr.send(null);
}

function post() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const results = JSON.parse(xhr.responseText);
        handleResults(results);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}

function onLoad() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.onload = () => {
    const results = JSON.parse(xhr.responseText);
    handleResults(results);
  };
  xhr.send(null);
}
