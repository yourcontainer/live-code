import React, { useEffect, useMemo, useRef, useState } from 'react'
import Prism from 'prismjs'
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

type Props = {
    onBack: () => void
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
        csharp: () => import('prismjs/components/prism-csharp'),
        objectivec: () => import('prismjs/components/prism-objectivec'),
        javascript: () => import('prismjs/components/prism-javascript'),
        jsx: () => import('prismjs/components/prism-jsx'),
        typescript: () => import('prismjs/components/prism-typescript'),
        tsx: () => import('prismjs/components/prism-tsx'),
        python: () => import('prismjs/components/prism-python'),
        go: () => import('prismjs/components/prism-go'),
        java: () => import('prismjs/components/prism-java'),
        rust: () => import('prismjs/components/prism-rust'),
        bash: () => import('prismjs/components/prism-bash'),
        json: () => import('prismjs/components/prism-json'),
        html: () => import('prismjs/components/prism-markup'),
        css: () => import('prismjs/components/prism-css'),
        php: () => import('prismjs/components/prism-php'),
        ruby: () => import('prismjs/components/prism-ruby'),
        swift: () => import('prismjs/components/prism-swift'),
        kotlin: () => import('prismjs/components/prism-kotlin'),
        scala: () => import('prismjs/components/prism-scala'),
        sql: () => import('prismjs/components/prism-sql'),
        yaml: () => import('prismjs/components/prism-yaml'),
        toml: () => import('prismjs/components/prism-toml'),
        markdown: () => import('prismjs/components/prism-markdown'),
        graphql: () => import('prismjs/components/prism-graphql'),
        ini: () => import('prismjs/components/prism-ini'),
        makefile: () => import('prismjs/components/prism-makefile'),
        docker: () => import('prismjs/components/prism-docker'),
        perl: () => import('prismjs/components/prism-perl'),
        dart: () => import('prismjs/components/prism-dart'),
        lua: () => import('prismjs/components/prism-lua'),
    }
    const loader = map[lang]
    if (loader) await loader()
}

const backgrounds = [
    { name: 'Midnight', value: 'linear-gradient(135deg, #1e1e2e 0%, #0f0f1a 100%)' },
    { name: 'Sunset', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
    { name: 'Ocean', value: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' },
    { name: 'Forest', value: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { name: 'Purple', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { name: 'Glass', value: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { name: 'Dark Blue', value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
    { name: 'Cyber', value: 'linear-gradient(to right, #434343 0%, black 100%)' },
]

export default function PresentationEditor({ onBack }: Props) {
    const [code, setCode] = useState('// Type your code here...')
    const [language, setLanguage] = useState('javascript')
    const [fileName, setFileName] = useState('')
    const [bgInfo, setBgInfo] = useState(backgrounds[0])
    const [fontSize, setFontSize] = useState(16)

    const codeRef = useRef<HTMLElement>(null)
    const lang = normalizeLanguage(language)

    useEffect(() => {
        ensureLanguageLoaded(lang).then(() => {
            if (codeRef.current) {
                Prism.highlightElement(codeRef.current)
            }
        })
    }, [lang, code])

    // Re-highlight when code changes
    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current)
        }
    }, [code])

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-neutral-900 text-white">
            {/* Sidebar Controls */}
            <div className="w-full md:w-80 p-6 bg-neutral-800 border-b md:border-b-0 md:border-r border-neutral-700 overflow-y-auto">
                <div className="flex items-center gap-3 mb-8">
                    <button onClick={onBack} className="p-2 hover:bg-neutral-700 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold">Editor</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">File Name</label>
                        <input
                            type="text"
                            value={fileName}
                            onChange={e => setFileName(e.target.value)}
                            className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Language</label>
                        <select
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            {supportedLanguages.map(l => (
                                <option key={l.value} value={l.value}>{l.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Background</label>
                        <div className="grid grid-cols-2 gap-2">
                            {backgrounds.map(bg => (
                                <button
                                    key={bg.name}
                                    onClick={() => setBgInfo(bg)}
                                    className={`h-12 rounded-md border-2 transition-all ${bgInfo.name === bg.name ? 'border-white scale-105' : 'border-transparent hover:border-neutral-500'}`}
                                    style={{ background: bg.value }}
                                    title={bg.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Font Size ({fontSize}px)</label>
                        <input
                            type="range"
                            min="12"
                            max="32"
                            value={fontSize}
                            onChange={e => setFontSize(Number(e.target.value))}
                            className="w-full accent-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Edit Code</label>
                        <textarea
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            className="w-full h-40 bg-neutral-700 border border-neutral-600 rounded-md p-3 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative" style={{ background: '#121212' }}>
                <style>{`
                    .presentation-mode code::after {
                        display: none !important;
                        content: none !important;
                    }
                `}</style>
                <div className="absolute inset-0" style={{ background: bgInfo.value, opacity: 0.8 }} />

                {/* Window Frame */}
                <div
                    className="relative bg-neutral-900/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/10 presentation-mode"
                    style={{
                        minWidth: '400px',
                        maxWidth: '90%',
                        width: 'auto',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {/* Title Bar */}
                    <div className="px-4 py-3 flex items-center gap-2 bg-white/5 border-b border-white/5">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <div className="flex-1 text-center text-xs text-neutral-400 font-mono">
                            {fileName}
                        </div>
                    </div>

                    {/* Code Area */}
                    <div className="p-6 overflow-auto">
                        <pre style={{
                            margin: 0,
                            padding: 0,
                            background: 'transparent',
                            fontSize: `${fontSize}px`,
                            textShadow: 'none'
                        }}>
                            <code ref={codeRef} className={`language-${lang} !bg-transparent !text-shadow-none`}>
                                {code}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
