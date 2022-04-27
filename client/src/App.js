import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api/v1")
      .then(response => response.json())
      .then(data => { setBackendData(data) })
  }, [])

  return (
    <div>
      {(typeof backendData.message === "undefined") ? (
        <p>Loading...</p>
      ) : (
        <p>{backendData.message}</p>
      )}
    </div>
  )
}

export default App