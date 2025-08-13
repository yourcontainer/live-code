import React, { useEffect, useMemo, useState } from 'react'
import { ThemeMode, getStoredTheme, setTheme, watchSystemPreference } from './theme'

type StartPayload = {
  code: string
  language: string
  fileName?: string
  speed: number
}

type Props = {
  onStart: (payload: StartPayload) => void
  initialLanguage?: string
  initialFileName?: string
}

const supportedLanguages = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'objectivec', label: 'Objective-C' },
  { value: 'java', label: 'Java' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'python', label: 'Python' },
  { value: 'bash', label: 'Bash' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tsx', label: 'TSX' },
  { value: 'json', label: 'JSON' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'sql', label: 'SQL' },
  { value: 'yaml', label: 'YAML' },
  { value: 'toml', label: 'TOML' },
  { value: 'ini', label: 'INI' },
  { value: 'makefile', label: 'Makefile' },
  { value: 'docker', label: 'Dockerfile' },
  { value: 'perl', label: 'Perl' },
  { value: 'dart', label: 'Dart' },
  { value: 'lua', label: 'Lua' },
]

export default function SetupPage({ onStart, initialLanguage = 'c', initialFileName = '' }: Props) {
  const [language, setLanguage] = useState(initialLanguage)
  const [fileName, setFileName] = useState(initialFileName)
  const [code, setCode] = useState('')
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme() || 'system')
  const [speed, setSpeed] = useState(1)

  const canStart = useMemo(() => code.trim().length > 0, [code])

  useEffect(() => {
    const unwatch = watchSystemPreference(() => {
      if (theme === 'system') setTheme('system')
    })
    return () => unwatch()
  }, [theme])

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <a
          href="https://github.com/yourcontainer/live-code"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 .5a11.5 11.5 0 00-3.636 22.415c.575.106.787-.244.787-.546 0-.27-.01-.985-.015-1.934-3.202.696-3.878-1.544-3.878-1.544-.523-1.328-1.279-1.682-1.279-1.682-1.045-.715.079-.7.079-.7 1.156.082 1.765 1.187 1.765 1.187 1.028 1.763 2.697 1.254 3.354.959.104-.745.402-1.255.73-1.543-2.556-.291-5.244-1.278-5.244-5.686 0-1.256.45-2.283 1.186-3.089-.119-.29-.514-1.462.112-3.048 0 0 .967-.31 3.17 1.18a10.98 10.98 0 015.766 0c2.203-1.49 3.168-1.18 3.168-1.18.628 1.586.233 2.758.114 3.048.738.806 1.184 1.833 1.184 3.089 0 4.42-2.693 5.392-5.257 5.678.412.354.779 1.05.779 2.117 0 1.529-.014 2.762-.014 3.139 0 .304.208.659.794.546A11.501 11.501 0 0012 .5z" clipRule="evenodd"/></svg>
          <span className="text-sm font-medium">Fork on GitHub</span>
        </a>
        <button
          aria-label="System theme"
          onClick={() => setThemeState('system')}
          className={`p-2 rounded-md border ${theme === 'system' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-neutral-300 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M4.125 3A1.125 1.125 0 003 4.125v15.75C3 20.66 3.34 21 3.75 21h16.5c.41 0 .75-.34.75-.75V4.125A1.125 1.125 0 0019.875 3H4.125zM4.5 5.25h15v9.75h-15V5.25zM9 18a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z"/></svg>
        </button>
        <button
          aria-label="Light theme"
          onClick={() => setThemeState('light')}
          className={`p-2 rounded-md border ${theme === 'light' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-neutral-300 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V4.5A.75.75 0 0112 3.75zM5.47 5.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L5.47 6.53a.75.75 0 010-1.06zM3.75 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H4.5A.75.75 0 013.75 12zm14.25 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM6.53 17.47a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM12 18.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V19.5a.75.75 0 01.75-.75zm6.53-1.28a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"/></svg>
        </button>
        <button
          aria-label="Dark theme"
          onClick={() => setThemeState('dark')}
          className={`p-2 rounded-md border ${theme === 'dark' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-neutral-300 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
        </button>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Live Coding Setup</h1>
          <p className="text-neutral-600 dark:text-neutral-400">Paste code, choose language, and start typing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm mb-2">Code</label>
            <textarea
              className="w-full h-80 rounded-md bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3 font-mono text-sm dark:bg-neutral-800 dark:border-neutral-700"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here"
            />
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Speed ({speed.toFixed(2)}x)</label>
              <input
                type="range"
                min={0.25}
                max={3}
                step={0.25}
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Language</label>
              <select
                className="w-full rounded-md bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 dark:bg-neutral-800 dark:border-neutral-700"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {supportedLanguages.map(l => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">File name (optional)</label>
              <input
                className="w-full rounded-md bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2 font-mono dark:bg-neutral-800 dark:border-neutral-700"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="main.c"
              />
            </div>
            <button
              className={`w-full rounded-md px-4 py-2 font-medium ${canStart ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-neutral-300 text-neutral-500 cursor-not-allowed dark:bg-neutral-700 dark:text-neutral-400'}`}
              disabled={!canStart}
              onClick={() => onStart({ code, language, fileName, speed })}
            >
              Start Live Coding
            </button>
          </div>
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-500">The next screen will animate your code as if being typed.</div>
      </div>
    </div>
  )
}

