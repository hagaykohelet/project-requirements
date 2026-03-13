import { useState } from "react"

function GetDataFetch(url: string, token: string) {

  const [result, setResult] = useState<Report[]>([])
  const [error, setError] = useState<string | null>(null)
  async function fetchData() {
    try {
      const res = await fetch(url, {
        headers: { token: token }
      })
      if (!res.ok) {
        console.log(res)
        throw new Error(res.statusText)
      }
      const data = await res.json()
      setResult(data.reports)
    } catch (err) {
      console.log(err)
      setError("fail")
    }
  }
  return { fetchData, result, error }
}

export default GetDataFetch
