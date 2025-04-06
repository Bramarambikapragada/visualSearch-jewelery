import React, { useState, useEffect } from 'react';
import './Body.css';
import { FaUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Shimmer from './Shimmer';

const Body = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [imageFiltered, setImageFiltered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/", {
          credentials: 'include',
        });

        if (res.status === 401) {
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setAllProducts(data);
        setSearchResults(data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error fetching all products or checking auth:", err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetchProducts();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated && !imageFiltered) {
      if (searchQuery.trim() === "") {
        setSearchResults(allProducts);
      } else {
        const filtered = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      }
    }
  }, [searchQuery, allProducts, imageFiltered, isAuthenticated]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Image preview
    }
  };

  const handleImageSearch = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);
    setShowImagePopup(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();
      setSearchResults(result);
      setImageFiltered(true);
      setShowImagePopup(false);
    } catch (error) {
      console.error("Error searching image:", error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleClearImageFilter = () => {
    setSearchResults(allProducts);
    setImageFiltered(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  if (!isAuthenticated && !loading) {
    return null;
  }

  return (
    <div className="body-wrapper">
      <div className="glass-card">
        <div className="upload-section">
          <input
            type="text"
            placeholder="Search by name, seller, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-input"
            disabled={imageFiltered}
          />

          {imageFiltered ? (
            <button className="search-btn" onClick={handleClearImageFilter}>
              ❌ Clear Image Filter
            </button>
          ) : (
            <button className="search-btn" onClick={() => setShowImagePopup(true)}>
              <FaUpload className="icon" /> Image Filter
            </button>
          )}
        </div>

        <div className="search-results">
          <h2>Search Results</h2>
          <div className="results-grid">
            {loading ? (
              <>
                <Shimmer /><Shimmer /><Shimmer />
              </>
            ) : searchResults.length > 0 ? (
              searchResults.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="product-card"
                >
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-seller">by {product.seller}</p>
                    <p className="product-rating">⭐ {product.rating}</p>
                    <p className="product-price">₹ {product.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>

      {showImagePopup && (
        <div className="modal-overlay">
          <div className="modal">
            {loading ? (
              <div className="loading-message">
                🔍 Searching for matches...<br />
                💍📿💍📿💍📿
              </div>
            ) : (
              <>
                <h2>Upload Image to Search</h2>

                <label htmlFor="file-upload" className="file-upload-label">
                  Choose Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {previewUrl && (
                  <div style={{ margin: '10px 0' }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '10px' }}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button className="search-btn" onClick={handleImageSearch}>
                    🔍 Search
                  </button>
                  <button
                    className="search-btn"
                    onClick={() => {
                      setShowImagePopup(false);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
