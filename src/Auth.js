export function auth () {
  const auth = {
    headers: {
      "authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  return auth
}