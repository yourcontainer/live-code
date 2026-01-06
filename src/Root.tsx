import React, { useEffect, useState } from 'react'
import SetupPage from './SetupPage'
import LiveCodePlayer from './LiveCodePlayer'
import PresentationEditor from './PresentationEditor'
import { initializeTheme } from './theme'

type StartPayload = {
  code: string
  language: string
  fileName?: string
  speed: number
}

export default function Root() {
  const [started, setStarted] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('c')
  const [fileName, setFileName] = useState('')
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    initializeTheme()
  }, [])

  if (showEditor) {
    // Dynamically import or just render the component. 
    // Since we can't easily do dynamic import without Suspense in this simple setup easily without loading state, 
    // we'll just import it at top or require it. 
    // For now, let's assume we import it at the top. 
    // Wait, I can't add top level import in this replace block easily without changing the whole file.
    // I will replace the whole file content to include the import.
    return <PresentationEditor onBack={() => setShowEditor(false)} />
  }

  if (!started) {
    return (
      <SetupPage
        initialLanguage={language}
        initialFileName={fileName}
        onOpenEditor={() => setShowEditor(true)}
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

