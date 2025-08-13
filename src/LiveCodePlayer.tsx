import React, { useEffect, useMemo, useRef, useState } from 'react'
import Prism from 'prismjs'

type Props = {
  code: string
  language: string
  fileName?: string
  speed?: number
}

function normalizeLanguage(language: string) {
  if (language === 'ts') return 'typescript'
  if (language === 'js') return 'javascript'
  if (language === 'c++') return 'cpp'
  return language
}

async function ensureLanguageLoaded(language: string) {
  const lang = normalizeLanguage(language)
  if ((Prism.languages as any)[lang]) return
  const map: Record<string, () => Promise<any>> = {
    c: () => import('prismjs/components/prism-c'),
    cpp: () => import('prismjs/components/prism-cpp'),
    javascript: () => import('prismjs/components/prism-javascript'),
    typescript: () => import('prismjs/components/prism-typescript'),
    python: () => import('prismjs/components/prism-python'),
    go: () => import('prismjs/components/prism-go'),
    java: () => import('prismjs/components/prism-java'),
    rust: () => import('prismjs/components/prism-rust'),
    bash: () => import('prismjs/components/prism-bash'),
    json: () => import('prismjs/components/prism-json'),
    html: () => import('prismjs/components/prism-markup'),
    css: () => import('prismjs/components/prism-css'),
  }
  const loader = map[lang]
  if (loader) await loader()
}

export default function LiveCodePlayer({ code, language, fileName, speed = 1 }: Props) {
  const text = useMemo(() => code.replace(/^\n+/, ''), [code])
  const [typed, setTyped] = useState('')
  const [lines, setLines] = useState(1)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const codeRef = useRef<HTMLElement | null>(null)
  const lang = normalizeLanguage(language)

  useEffect(() => {
    ensureLanguageLoaded(lang)
  }, [lang])

  useEffect(() => {
    setTyped('')
    let i = 0
    let handle = 0 as unknown as number
    function tick() {
      if (i < text.length) {
        const next = text[i]
        i += 1
        setTyped(prev => prev + next)
        const base = next === '\n' ? 15 : 15 + Math.random() * 10
        const delay = Math.max(1, base / Math.max(0.1, speed))
        handle = window.setTimeout(tick, delay)
      }
    }
    tick()
    return () => window.clearTimeout(handle)
  }, [text, speed])

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current)
      const count = typed.split('\n').length || 1
      if (count !== lines) setLines(count)
    }
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [typed, lines])

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="window-controls">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="editor-title">{fileName || ''}</div>
      </div>
      <div className="editor-body">
        <div className="scroll-container" id="scroll" ref={scrollRef}>
          <div className="code-wrapper">
            <div className="line-numbers" id="lineNumbers">
              {Array.from({ length: lines }).map((_, idx) => (
                <div key={idx}>{idx + 1}</div>
              ))}
            </div>
            <pre>
              <code id="code" ref={codeRef as any} className={`language-${lang}`}>{typed}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

