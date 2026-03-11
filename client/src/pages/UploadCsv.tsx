import { useState } from "react"

function UploadCsv() {
    const [csv, setCsv] = useState<File|string>("")
  return (
    <div>
      <input type="file" />
    </div>
  )
}

export default UploadCsv
