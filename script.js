// Get references to all the HTML elements we need
const fetchBtn = document.getElementById('fetch-btn');
const xhrBtn = document.getElementById('xhr-btn');
const output = document.getElementById('output');
const postForm = document.getElementById('post-form');
const postIdInput = document.getElementById('post-id');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const putBtn = document.getElementById('put-btn');
const responseOutput = document.getElementById('response-output');


// ✅ Task 1: GET data using fetch()
fetchBtn.addEventListener('click', () => {
  // Call the API using fetch
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      // If something goes wrong with the request
      if (!response.ok) {
        throw new Error('Something went wrong. Try again.');
      }
      // Convert the response into JSON format
      return response.json();
    })
    .then(data => {
      // Show the title and body on the page
      output.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.body}</p>
      `;
    })
    .catch(error => {
      // Show error message on the page
      output.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    });
});


// ✅ Task 2: GET data using XMLHttpRequest (XHR)
xhrBtn.addEventListener('click', () => {
  const xhr = new XMLHttpRequest(); // Create a new request object

  // Set up the request
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/2');

  // What happens when we get a response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // If the request is successful, show the data
      const data = JSON.parse(xhr.responseText); // Convert text to object
      output.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.body}</p>
      `;
    } else {
      // If the request fails
      output.innerHTML = `<p style="color:red;">XHR Error: ${xhr.status}</p>`;
    }
  };

  // What happens if there's a network error
  xhr.onerror = function () {
    output.innerHTML = `<p style="color:red;">Network error. Please try again.</p>`;
  };

  xhr.send(); // Send the request
});


// ✅ Task 3: Send POST request to create a new post
postForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop the form from reloading the page

  // Get values from the form
  const title = titleInput.value;
  const body = bodyInput.value;

  // Send data to the API using POST
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  })
    .then(response => response.json())
    .then(data => {
      responseOutput.innerHTML = `
        <h4>New Post Created:</h4>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    })
    .catch(error => {
      responseOutput.innerHTML = `<p style="color:red;">POST Error: ${error.message}</p>`;
    });
});


// ✅ Task 4: Send PUT request to update a post
putBtn.addEventListener('click', () => {
  const id = postIdInput.value;
  const title = titleInput.value;
  const body = bodyInput.value;

  // Check if ID is provided
  if (!id) {
    responseOutput.innerHTML = `<p style="color:red;">Please enter a Post ID to update.</p>`;
    return;
  }

  const xhr = new XMLHttpRequest(); // Create request
  xhr.open('PUT', `https://jsonplaceholder.typicode.com/posts/${id}`); // Setup with URL
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 201) {
      const data = JSON.parse(xhr.responseText);
      responseOutput.innerHTML = `
        <h4>Post Updated:</h4>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    } else {
      responseOutput.innerHTML = `<p style="color:red;">PUT Error: ${xhr.status}</p>`;
    }
  };

  xhr.onerror = function () {
    responseOutput.innerHTML = `<p style="color:red;">Network error during update.</p>`;
  };

  // Send the update with new title and body
  xhr.send(JSON.stringify({
    title: title,
    body: body
  }));
});
