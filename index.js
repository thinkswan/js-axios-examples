// AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// GET REQUEST
function getTodos() {
  console.log("GET Request")

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      params: {
        _limit: 5
      },
      timeout: 5000
    })
    .then(showOutput)
    .catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
  console.log("POST Request")

  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New todo",
      completed: false
    })
    .then(showOutput)
    .catch(err => console.error(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log("PUT/PATCH Request")

  // PUT overwrites the object, but PATCH only modifies to specified
  // params
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated todo",
      completed: true
    })
    .then(showOutput)
    .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
  console.log("DELETE Request")

  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(showOutput)
    .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log("Simultaneous Request")

  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos", {
        params: { _limit: 5 }
      }),
      axios.get("https://jsonplaceholder.typicode.com/posts", {
        params: { _limit: 5 }
      })
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers")

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "some-token"
    }
  }

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New todo",
        completed: false
      },
      config
    )
    .then(showOutput)
    .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response")

  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello world"
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()

      return data
    })
  }

  axios(options).then(showOutput)
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling")

  axios
    .get("https://jsonplaceholder.typicode.com/todoss", {
      params: {
        _limit: 5
      }
    })
    .then(showOutput)
    .catch(err => {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.log(err.response)
      }

      if (err.response.status === 404) {
        window.alert("404 Page Not Found")
      } else if (err.request) {
        // Request was made, but no response was received
        console.error(err.request)
      } else {
        console.error(err.message)
      }
    })
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token")

  const source = axios.CancelToken.source()

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      params: {
        _limit: 5
      },
      cancelToken: source.token
    })
    .then(showOutput)
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log("Request canceled", err.message)
      }
    })

  source.cancel("Request cancelled")
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    )

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
  // Other custom settings
})
// axiosInstance.get("/comments").then(showOutput)

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos)
document.getElementById("post").addEventListener("click", addTodo)
document.getElementById("update").addEventListener("click", updateTodo)
document.getElementById("delete").addEventListener("click", removeTodo)
document.getElementById("sim").addEventListener("click", getData)
document.getElementById("headers").addEventListener("click", customHeaders)
document
  .getElementById("transform")
  .addEventListener("click", transformResponse)
document.getElementById("error").addEventListener("click", errorHandling)
document.getElementById("cancel").addEventListener("click", cancelToken)
