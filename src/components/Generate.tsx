interface GenerateProps {
    isOpen: boolean
    onClose: () => void
}

export default function Generate({ isOpen, onClose }: GenerateProps) {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Generate Code</h2>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="prompt" className="form-label">
                            Add the rules for the Cursor project:
                        </label>
                        <textarea
                            id="prompt"
                            className="form-textarea"
                            placeholder="e.g., Create a React component for a todo list with add, edit, and delete functionality..."
                            rows={4}
                        />
                    </div>


                    <div className="modal-footer">
                        <button className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn-primary">
                            Generate Rule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}