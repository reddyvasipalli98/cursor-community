import {  useState } from 'react'
import Generate from './Generate'
import RuleDetails from './RuleDetails'

export default function Home() {
    const [isGenerateOpen, setIsGenerateOpen] = useState(false)
    const [isRuleDetailsOpen, setIsRuleDetailsOpen] = useState(false)
    const [selectedTile, setSelectedTile] = useState<{ title: string, description: string } | null>(null)
    const [searchText, setSearchText] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleTileClick = (title: string, description: string) => {
        setSelectedTile({ title, description })
        setIsRuleDetailsOpen(true)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const ruleList = [
        {
            title: 'React Ecommerce Project',
            descrip: 'Learn about our community guidelines and how to participate respectfully.'
        },
        {
            title: 'Python project to connect to LLMs',
            descrip: 'Browse amazing projects created by our community members.'
        },
        {
            title: 'Angular Project for Video Player',
            descrip: 'Explore AI-powered code generation tools and best practices.'
        },
        {
            title: 'Tutorials',
            descrip: 'Step-by-step guides to help you master Cursor and AI development.'
        },
        {
            title: 'Extensions',
            descrip: 'Discover useful extensions and plugins to enhance your workflow.'
        }
    ]
    return (
        <>
            <header className="header">
                <div className="title">
                    <h1>Cursor Community</h1>
                </div>
                
                {/* Desktop Navigation */}
                <nav className="menu desktop-menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <button className="menu-link">Rules</button>
                        </li>
                        <li className="menu-item">
                            <button className="menu-link" onClick={() => setIsGenerateOpen(true)}>Generate</button>
                        </li>
                        <li className="menu-item">
                            <button className="menu-link">Account</button>
                        </li>
                    </ul>
                </nav>
                
                {/* Mobile Hamburger Button */}
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
                    <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                
                {/* Mobile Navigation */}
                <nav className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="mobile-menu-list">
                        <li className="mobile-menu-item">
                            <button className="mobile-menu-link" onClick={closeMobileMenu}>Rules</button>
                        </li>
                        <li className="mobile-menu-item">
                            <button className="mobile-menu-link" onClick={() => { setIsGenerateOpen(true); closeMobileMenu(); }}>Generate</button>
                        </li>
                        <li className="mobile-menu-item">
                            <button className="mobile-menu-link" onClick={closeMobileMenu}>Account</button>
                        </li>
                    </ul>
                </nav>
                
                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
            </header>
            <main className="main-content">
                <div className="search-container">
                    <div className="search-wrapper">
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-input"
                            placeholder="Search for Cursor Rules..."
                        />
                    </div>
                </div>

                <div className="tiles-section">
                    <h2 className="tiles-section-title">Rules...</h2>
                    <div className="tiles-grid">
                        {
                            ruleList.filter(x => x.title.includes(searchText)).map((ruleItem) => (
                                <div className="tile" onClick={() => handleTileClick('React Ecommerce Project', 'Learn about our community guidelines and how to participate respectfully.')}>
                                    <h3 className="tile-title">{ruleItem.title}</h3>
                                    <p className="tile-description">{ruleItem.descrip}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
            <Generate isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} />
            <RuleDetails
                isOpen={isRuleDetailsOpen}
                onClose={() => setIsRuleDetailsOpen(false)}
                tileData={selectedTile}
            />
        </>
    )
}