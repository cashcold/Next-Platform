import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class PropertyShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listings: [],
      currentRegion: 'us', // Matches our backend default fallback
      currentPage: 1,
      pagination: null,
      loading: true,
      error: null,
      
      // Lead Capture Form Modal States
      showModal: false,
      selectedProperty: null,
      leadName: '',
      leadPhone: '',
      leadEmail: '',
      submitStatus: ''
    };
  }

  componentDidMount() {
    // Fetch initial 'us' property records on load
    this.fetchProperties(this.state.currentRegion);
  }

  /**
   * Action trigger to call your backend dynamically based on selected tab
   */
  fetchProperties(region, page = 1) {
    this.setState({ loading: true, currentRegion: region, currentPage: page, error: null });

    // Hits your Node server with the region query parameter (?region=africa)
    axios.get(`/users/listings?region=${region}&page=${page}`)
      .then(res => {
        if (res.data.success) {
          this.setState({ 
            listings: res.data.listings, 
            pagination: res.data.pagination,
            loading: false 
          });
        } else {
          this.setState({ error: "Failed to parse API data stream structural arrays.", loading: false });
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: `Could not reach backend for the ${region.toUpperCase()} market network.`, loading: false });
      });
  }

  handleOpenModal(property) {
    this.setState({ showModal: true, selectedProperty: property, submitStatus: '' });
  }

  handleCloseModal() {
    this.setState({ showModal: false, selectedProperty: null });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { leadName, leadPhone, leadEmail, selectedProperty } = this.state;

    this.setState({ submitStatus: 'Registering security verification tags...' });

    // Sends captured broker lead to backend POST endpoint
    axios.post('/user/capture-lead', {
      name: leadName,
      phone: leadPhone,
      email: leadEmail,
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title
    })
    .then(res => {
      this.setState({ 
        submitStatus: '✅ Inquiry Secured. A priority asset partner will contact you shortly.',
        leadName: '', leadPhone: '', leadEmail: ''
      });
      // Close the popup smoothly after 3 seconds
      setTimeout(() => this.handleCloseModal(), 3000);
    })
    .catch(err => {
      this.setState({ submitStatus: '❌ Verification failed. Please re-enter credentials.' });
    });
  }

  render() {
    const { listings, currentRegion, currentPage, pagination, loading, error, showModal, selectedProperty, leadName, leadPhone, leadEmail, submitStatus } = this.state;
    const headlineTitle = listings[0]?.title || "Premium Global Portfolio Core";

    return (
      <div style={styles.container}>
        <Helmet>
          <title>{`${headlineTitle} | Luxury Investments`}</title>
          <meta property="og:title" content={headlineTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <h1 style={styles.mainTitle}>🏢 Global Property Index</h1>
        <p style={styles.infoLabel}>Direct Investment Pipelines for High-Net-Worth Portfolios</p>

        {/* REGION SELECTION TABS */}
        <div style={styles.navigationDeck}>
          {['us', 'africa', 'europe'].map((region) => (
            <button
              key={region}
              onClick={() => this.fetchProperties(region)}
              style={{
                ...styles.navBtn,
                backgroundColor: currentRegion === region ? '#00ffb3' : '#141414',
                color: currentRegion === region ? '#000' : '#fff',
                borderColor: currentRegion === region ? '#00ffb3' : '#333'
              }}
            >
              {region.toUpperCase()} Market
            </button>
          ))}
        </div>

        {/* LOADING & ERROR INDICATORS */}
        {loading && <div style={styles.center}>Sourcing live high-end real estate matrices from API streams...</div>}
        {error && <div style={{...styles.center, color: 'red'}}>{error}</div>}

        {/* PROPERTY DECK LISTINGS GRID */}
        {!loading && !error && (
          <>
            <div style={styles.grid}>
              {listings.map((item) => (
                <div key={item.id} style={styles.card}>
                  <div style={{...styles.cardImage, backgroundImage: `url(${item.imageUrl})`}} />
                  <div style={styles.cardContent}>
                    <p style={styles.locationTag}>📍 {item.location}</p>
                    <h3 style={styles.propertyTitle}>{item.title}</h3>
                    <div style={styles.specsRow}>
                      <span>🛏️ {item.beds} Beds</span>
                      <span>🛁 {item.baths} Baths</span>
                    </div>
                    <div style={styles.priceLine}>{item.price}</div>
                    
                    <button onClick={() => this.handleOpenModal(item)} style={styles.actionBtn}>
                      Request Private Viewing
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {pagination && pagination.totalPages > 1 && (
              <div style={styles.paginationContainer}>
                <button 
                  disabled={!pagination.hasPrevPage}
                  onClick={() => this.fetchProperties(currentRegion, currentPage - 1)}
                  style={{...styles.pageBtn, opacity: pagination.hasPrevPage ? 1 : 0.5}}
                >
                  ← Previous
                </button>
                
                <div style={styles.pageInfo}>
                  Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalItems} listings)
                </div>
                
                <button 
                  disabled={!pagination.hasNextPage}
                  onClick={() => this.fetchProperties(currentRegion, currentPage + 1)}
                  style={{...styles.pageBtn, opacity: pagination.hasNextPage ? 1 : 0.5}}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}

        {/* LEAD CAPTURE POPUP MODAL OVERLAY */}
        {showModal && selectedProperty && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalBody}>
              <h3 style={{marginTop: 0, color: '#00ffb3'}}>Schedule Priority Broker Callback</h3>
              <p style={{fontSize: '13px', color: '#aaa'}}>{selectedProperty.title}</p>
              
              <form onSubmit={(e) => this.handleFormSubmit(e)} style={styles.formContainer}>
                <input required type="text" name="leadName" placeholder="Full Name" value={leadName} onChange={(e) => this.handleInputChange(e)} style={styles.inputField} />
                <input required type="tel" name="leadPhone" placeholder="Phone Number (WhatsApp Active)" value={leadPhone} onChange={(e) => this.handleInputChange(e)} style={styles.inputField} />
                <input type="email" name="leadEmail" placeholder="Email Address" value={leadEmail} onChange={(e) => this.handleInputChange(e)} style={styles.inputField} />
                
                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                  <button type="submit" style={{...styles.actionBtn, flex: 2}}>Submit Verification</button>
                  <button type="button" onClick={() => this.handleCloseModal()} style={styles.cancelBtn}>Cancel</button>
                </div>
              </form>
              {submitStatus && <p style={styles.statusMsg}>{submitStatus}</p>}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Minimalist Dashboard Stylesheet Layout Matrix
const styles = {
  container: { maxWidth: '1200px', margin: '40px auto', padding: '20px', color: '#fff', fontFamily: '"Segoe UI", sans-serif' },
  mainTitle: { textAlign: 'center', margin: '0 0 5px 0', fontSize: '30px', fontWeight: 'bold' },
  infoLabel: { textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '30px' },
  navigationDeck: { display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' },
  navBtn: { padding: '10px 24px', border: '1px solid', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', transition: '0.2s', textTransform: 'uppercase' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' },
  card: { backgroundColor: '#0d0d0d', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1c1c1c', display: 'flex', flexDirection: 'column' },
  cardImage: { height: '220px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#222' },
  cardContent: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' },
  locationTag: { color: '#00ffb3', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 5px 0' },
  propertyTitle: { fontSize: '16px', fontWeight: '500', color: '#e0e0e0', margin: '0 0 12px 0', minHeight: '44px', lineHeight: '1.4' },
  specsRow: { display: 'flex', gap: '15px', color: '#777', fontSize: '13px', marginBottom: '15px' },
  priceLine: { fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '15px' },
  actionBtn: { width: '100%', padding: '10px 0', backgroundColor: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalBody: { backgroundColor: '#111', padding: '30px', borderRadius: '12px', width: '90%', maxWidth: '420px', border: '1px solid #222' },
  formContainer: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' },
  inputField: { padding: '12px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', color: '#fff', fontSize: '14px' },
  cancelBtn: { flex: 1, padding: '10px 0', backgroundColor: 'transparent', color: '#777', border: '1px solid #333', borderRadius: '6px', cursor: 'pointer' },
  statusMsg: { textAlign: 'center', fontSize: '12px', marginTop: '15px', fontWeight: '500' },
  center: { textAlign: 'center', padding: '100px 0', color: '#555' },
  paginationContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '40px', padding: '20px', backgroundColor: '#0d0d0d', borderRadius: '12px', border: '1px solid #1c1c1c' },
  pageBtn: { padding: '10px 20px', backgroundColor: '#00ffb3', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', fontSize: '14px' },
  pageInfo: { fontSize: '14px', color: '#aaa', fontWeight: '500', minWidth: '200px', textAlign: 'center' }
};

export default PropertyShowcase;