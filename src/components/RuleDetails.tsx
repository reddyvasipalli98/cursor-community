import { useState, useEffect } from 'react'

interface RuleDetailsProps {
  isOpen: boolean
  onClose: () => void
  tileData: {
    title: string
    description: string
    location: string
  } | null
}

export default function RuleDetails({ isOpen, onClose, tileData }: RuleDetailsProps) {
  const [fileContent, setFileContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      loadFileContent()
    }
  }, [isOpen])

  const loadFileContent = async () => {
    try {
      setLoading(true)
      const moduleContent = await import(tileData?.location + '?raw') //import('../RuleFiles/react/modernwebdev.txt?raw')
        setFileContent(moduleContent.default)
      // const response = await fetch('/src/RuleFiles/react/modernwebdev.txt')
      // if (response.ok) {
      //   const content = await response.text()
      //   setFileContent(content)
      // } else {
      //   // Fallback: try to import the file content
      //   const moduleContent = await import('../RuleFiles/modernwebdev.txt?raw')
      //   setFileContent(moduleContent.default)
      // }
    } catch (error) {
      console.error('Failed to load file content:', error)
      setFileContent('Error: Could not load the modernwebdev.txt file content.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !tileData) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', maxHeight: '90vh' }}>
        <div className="modal-header">
          <h2 className="modal-title">{tileData.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body" style={{ overflowY: 'auto', maxHeight: 'calc(90vh - 140px)' }}>
          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px',
              color: '#9ca3af'
            }}>
              <p>Loading file content...</p>
            </div>
          ) : (
            <pre style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#f9fafb',
              backgroundColor: '#111827',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #374151',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              margin: 0,
              textAlign: 'left',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              {fileContent}
            </pre>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}