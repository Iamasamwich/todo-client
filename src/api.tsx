interface Body {
  todo?: string;
  step?: string;
  done: boolean;
  dueDate?: string;
};

const host = 'http://localhost:3000';

const api = (path : string, method : "POST" | "GET" | "PUT", body?: Body) => {
  return fetch(host + path, {
    method,
    headers: {
      'Content-Type' : 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
};

export default api;