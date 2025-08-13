import React, { useEffect, useState } from 'react'
import SetupPage from './SetupPage'
import LiveCodePlayer from './LiveCodePlayer'
import { initializeTheme } from './theme'

type StartPayload = {
  code: string
  language: string
  fileName?: string
  speed: number
}

export default function Root() {
  const [started, setStarted] = useState(false)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('c')
  const [fileName, setFileName] = useState('')
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    initializeTheme()
  }, [])

  if (!started) {
    return (
      <SetupPage
        initialLanguage={language}
        initialFileName={fileName}
        onStart={(payload: StartPayload) => {
          setCode(payload.code)
          setLanguage(payload.language)
          setFileName(payload.fileName || '')
          setSpeed(payload.speed)
          setStarted(true)
        }}
      />
    )
  }

  return (
    <LiveCodePlayer code={code} language={language} fileName={fileName} speed={speed} />
  )
}

