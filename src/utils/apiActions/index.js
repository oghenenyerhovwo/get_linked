export const backend_url = process.env.REACT_APP_BACKEND_URL
export const frontend_url = process.env.REACT_APP_FRONTEND_URL

export const setError = (err) => {
    return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const setHeader = (token) => {
  return {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
 }