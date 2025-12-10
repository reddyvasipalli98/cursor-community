import React from 'react'

interface RuleDetailsProps {
  isOpen: boolean
  onClose: () => void
  tileData: {
    title: string
    description: string
  } | null
}

export default function RuleDetails({ isOpen, onClose, tileData }: RuleDetailsProps) {
  if (!isOpen || !tileData) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{tileData.title}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="rule-content">
            <h3 className="rule-subtitle">Overview</h3>
            <p className="rule-description">{tileData.description}</p>
            
            <h3 className="rule-subtitle">Detailed Rules</h3>
            <ul className="rule-list">
              <li>Follow community guidelines and be respectful to all members</li>
              <li>Use appropriate tags and categories when posting</li>
              <li>Search existing posts before creating duplicates</li>
              <li>Provide clear and detailed descriptions of your issues</li>
              <li>Share code snippets and examples when relevant</li>
              <li>Help others by answering questions you know</li>
            </ul>
            
            <h3 className="rule-subtitle">Best Practices</h3>
            <p className="rule-text">
              When working with {tileData.title.toLowerCase()}, make sure to follow industry standards 
              and keep your code clean and well-documented. Consider performance implications 
              and always test your implementations thoroughly.
            </p>
            
            <div className="rule-tips">
              <h4 className="tip-title">💡 Pro Tips</h4>
              <ul className="tip-list">
                <li>Use version control for all your projects</li>
                <li>Write meaningful commit messages</li>
                <li>Document your code and APIs</li>
                <li>Follow naming conventions consistently</li>
              </ul>
            </div>
          </div>
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