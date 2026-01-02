import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoSearch, IoClose } from 'react-icons/io5'
import { ShopContext } from '../Context/ShopContext'
import './SearchBar.css'

const SearchBar = () => {
  const { all_product } = useContext(ShopContext)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [show, setShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const filtered = (all_product || []).filter(p => {
      const title = (p.title || p.name || '').toLowerCase()
      const category = (p.category || '').toLowerCase()
      return title.includes(q) || category.includes(q)
    }).slice(0, 8)
    setResults(filtered)
  }, [query, all_product])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (product) => {
    setQuery('')
    setResults([])
    setShow(false)
    navigate(`/product/${product.id}`)
  }

  const onKeyDown = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      setActiveIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < results.length) {
        handleSelect(results[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setShow(false)
    }
  }

  return (
    <div className="searchbar" ref={ref}>
      <div className="search-wrapper">
        <IoSearch className="search-icon" />
        <input
          aria-label="Search products"
          placeholder="Search products, categories..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShow(true); setActiveIndex(-1) }}
          onFocus={() => setShow(true)}
          onKeyDown={onKeyDown}
          className="search-input"
        />
        {query && (
          <button
            aria-label="Clear search"
            onClick={() => { setQuery(''); setResults([]); setActiveIndex(-1) }}
            className="clear-btn"
          >
            <IoClose />
          </button>
        )}
      </div>

      {show && results.length > 0 && (
        <ul className="search-suggestions" role="listbox">
          <li className="suggestions-header">
            <span>Found {results.length} result{results.length !== 1 ? 's' : ''}</span>
          </li>
          {results.map((p, idx) => (
            <li
              key={p.id}
              role="option"
              aria-selected={activeIndex === idx}
              className={`suggestion-item ${activeIndex === idx ? 'active' : ''}`}
              onMouseDown={() => handleSelect(p)}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <div className="suggestion-img-wrapper">
                <img src={p.image || p.img || ''} alt={p.title} className="suggestion-img"/>
              </div>
              <div className="suggestion-content">
                <div className="suggestion-title">{p.title || p.name}</div>
                <div className="suggestion-meta">
                  {p.category && <span className="category-badge">{p.category}</span>}
                  {p.new_price && <span className="suggestion-price">${p.new_price}</span>}
                </div>
              </div>
              <div className="suggestion-arrow">→</div>
            </li>
          ))}
        </ul>
      )}

      {show && query.trim() && results.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">✨</div>
          <p>No products found for "{query}"</p>
          <p className="no-results-hint">Try different keywords</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
