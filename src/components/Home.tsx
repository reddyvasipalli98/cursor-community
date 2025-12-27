import {  useState } from 'react'
import Generate from './Generate'
import RuleDetails from './RuleDetails'
import GoogleAuth from './GoogleAuth'

export default function Home() {
    const [isGenerateOpen, setIsGenerateOpen] = useState(false)
    const [isRuleDetailsOpen, setIsRuleDetailsOpen] = useState(false)
    const [selectedTile, setSelectedTile] = useState<{ title: string, description: string, location: string } | null>(null)
    const [searchText, setSearchText] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleTileClick = (title: string, description: string, location: string) => {
        setSelectedTile({ title, description, location })
        setIsRuleDetailsOpen(true)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const reactList = [
        {
            title: 'Modern Web Development',
            descrip: 'You are an expert developer in TypeScript, Node.js, Next.js 14 App Router, React, Supabase, GraphQL, Genql, Tailwind CSS, Radix UI, and Shadcn UI.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/modernwebdev.txt'
        },
        {
            title: 'Modern Vite Development',
            descrip: 'You are an expert in React, Vite, Tailwind CSS, three.js, React three fiber and Next UI.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/reactvite.txt'
        },
        {
            title: 'Gatsby Cursor Rules',
            descrip: 'You are an expert in TypeScript, Gatsby, React and Tailwind.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/gatsby.txt'
        }
    ]

    const reactnativelist = [
        {
            title: 'React Native Expo Development',
            descrip: 'You are an expert in TypeScript, React Native, Expo, and Mobile UI development.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/reactnativeexpo.txt'
        }
    ]

    const pythonlist = [
        {
            title: 'Python Flask',
            descrip: 'You are an expert in Python, Flask, and scalable API development.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/pythonflask.txt'
        },
        {
            title: 'Web Scraper',
            descrip: 'You are an expert in web scraping and data extraction, with a focus on Python libraries and frameworks such as requests, BeautifulSoup, selenium, and advanced tools like jina, firecrawl, agentQL, and multion.',
            location: 'https://cursor-community-dev.s3.us-east-1.amazonaws.com/webscraper.txt'
        }
    ]

    const normalizedSearch = searchText.toLowerCase()
    const hasResults = reactList.some(x => x.title.toLowerCase().includes(normalizedSearch)) ||
        reactnativelist.some(x => x.title.toLowerCase().includes(normalizedSearch)) ||
        pythonlist.some(x => x.title.toLowerCase().includes(normalizedSearch))
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
                            {/* <button className="menu-link">Rules</button> */}
                            <GoogleAuth />
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
                            {/* <button className="mobile-menu-link" onClick={closeMobileMenu}>Rules</button> */}
                            <GoogleAuth />
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
                <div className="search-container" style={{ minHeight: 80 }}>
                    <div className="search-wrapper" style={{ width: '100%' }}>
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

                <div className="tiles-wrapper" style={{ minHeight: 220 }}>
                    {hasResults ? (
                        <>
                            {reactList.filter(x => x.title.toLowerCase().includes(normalizedSearch)).length > 0 && (
                                <div className="tiles-section">
                                    <h2 className="tiles-section-title">React</h2>
                                    <div className="tiles-grid">
                                        {reactList.filter(x => x.title.toLowerCase().includes(normalizedSearch)).map((ruleItem) => (
                                            <div className="tile" onClick={() => handleTileClick(ruleItem.title, ruleItem.descrip, ruleItem.location)} key={ruleItem.title}>
                                                <h3 className="tile-title">{ruleItem.title}</h3>
                                                <p className="tile-description">{ruleItem.descrip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {reactnativelist.filter(x => x.title.toLowerCase().includes(normalizedSearch)).length > 0 && (
                                <div className="tiles-section">
                                    <h2 className="tiles-section-title">React Native</h2>
                                    <div className="tiles-grid">
                                        {reactnativelist.filter(x => x.title.toLowerCase().includes(normalizedSearch)).map((ruleItem) => (
                                            <div className="tile" onClick={() => handleTileClick(ruleItem.title, ruleItem.descrip, ruleItem.location)} key={ruleItem.title}>
                                                <h3 className="tile-title">{ruleItem.title}</h3>
                                                <p className="tile-description">{ruleItem.descrip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pythonlist.filter(x => x.title.toLowerCase().includes(normalizedSearch)).length > 0 && (
                                <div className="tiles-section">
                                    <h2 className="tiles-section-title">Python</h2>
                                    <div className="tiles-grid">
                                        {pythonlist.filter(x => x.title.toLowerCase().includes(normalizedSearch)).map((ruleItem) => (
                                            <div className="tile" onClick={() => handleTileClick(ruleItem.title, ruleItem.descrip, ruleItem.location)} key={ruleItem.title}>
                                                <h3 className="tile-title">{ruleItem.title}</h3>
                                                <p className="tile-description">{ruleItem.descrip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-results" style={{ padding: 24, color: '#666' }}>No rules match your search.</div>
                    )}
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