import { Moon, Search, Sun } from "lucide-react";

function Header({
    searchValue,
    setSearchValue,
    handleKeyDown,
    loading,
    handleSearch,
    setIsDark,
    isDark,
}) {
    return (
        <div className="header-controls">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search location..."
                    className="search-input"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} // Update search input value
                    onKeyDown={handleKeyDown}
                />
                <div className="search-controls">
                    {loading && <div className="searchLoader"></div>}
                    <Search
                        className="search-icon"
                        onClick={handleSearch}
                    />{" "}
                    {/* Trigger search */}
                </div>
                {/* Trigger search */}
            </div>
            <button onClick={() => setIsDark(!isDark)} className="theme-toggle">
                {isDark ? (
                    <Sun className="sun-icon" size={24} />
                ) : (
                    <Moon className="moon-icon" size={24} />
                )}
            </button>
        </div>
    );
}

export default Header;
