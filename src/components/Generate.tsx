import { useUser, usePermissions } from '../hooks/useUser';
import { UserStatus } from './UserProfile';

interface GenerateProps {
    isOpen: boolean
    onClose: () => void
}

export default function Generate({ isOpen, onClose }: GenerateProps) {
    const { isAuthenticated, userName, firstName } = useUser();
    const { canCreatePosts } = usePermissions();

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">
                        Generate Rule {isAuthenticated && `- ${firstName}`}
                    </h2>
                    <div className="modal-user-status">
                        <UserStatus />
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="modal-body">
                    {!isAuthenticated && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#ef4444', margin: 0 }}>
                                Please log in to access code generation features
                            </p>
                        </div>
                    )}
                    
                    {isAuthenticated && !canCreatePosts && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: 'rgba(251, 191, 36, 0.1)',
                            border: '1px solid rgba(251, 191, 36, 0.3)',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#f59e0b', margin: 0 }}>
                                Welcome {userName}! You have limited access to this feature.
                            </p>
                        </div>
                    )}
                    
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
                        <button 
                            disabled={!isAuthenticated} 
                            className={`btn-secondary ${!isAuthenticated ? 'disabled' : ''}`}
                            onClick={isAuthenticated ? onClose : undefined}
                            style={{
                                opacity: !isAuthenticated ? 0.4 : 1,
                                cursor: !isAuthenticated ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={!isAuthenticated}             
                            className={`btn-primary ${!isAuthenticated ? 'disabled' : ''}`}
                            style={{
                                opacity: !isAuthenticated ? 0.4 : 1,
                                cursor: !isAuthenticated ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Generate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}