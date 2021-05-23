export const getApiUrl = (path) => {
    return process.env.NODE_ENV === "production"
      ? `/api/${path}`
      : `http://localhost:4000/${path}`
  }
  
  export const WSUrl =
    process.env.NODE_ENV === "production" ? "/socket.io" : "http://localhost:4001"