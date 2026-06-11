import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet';
import axios from 'axios';

class FootballVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardTitle: '',
      videos: [],
      currentPage: 1,
      loading: true,
      error: null,
      hasNextPage: false,
      selectedVideoIndex: 0
    };
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    this.fetchVideos(1);
  }

  fetchVideos = (page) => {
    this.setState({ loading: true });
    axios.get('http://localhost:8000/get-daily-video', {
      params: {
        page: page,
        limit: 12
      }
    })
      .then(res => {
        this.setState({
          dashboardTitle: res.data.dashboardTitle,
          videos: res.data.videos,
          currentPage: page,
          hasNextPage: res.data.pagination.hasNextPage,
          loading: false,
          selectedVideoIndex: 0
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ 
          error: "Could not establish server connection streams.", 
          loading: false 
        });
      });
  }

  handleNextPage = () => {
    if (this.state.hasNextPage) {
      this.fetchVideos(this.state.currentPage + 1);
    }
  }

  handlePreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.fetchVideos(this.state.currentPage - 1);
    }
  }

  selectVideo = (index) => {
    this.setState({ selectedVideoIndex: index });
    // Scroll to player smoothly
    setTimeout(() => {
      if (this.playerRef.current) {
        this.playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Dynamic UI Badge Theme Selector
  getBadgeStyle(type) {
    let baseBadge = {
      padding: '6px 14px', borderRadius: '20px', fontSize: '12px',
      fontWeight: 'bold', textTransform: 'uppercase', display: 'inline-block', marginBottom: '15px'
    };
    if (type === 'Exclusive Interview') return { ...baseBadge, backgroundColor: '#8a2be2', color: '#fff' };
    if (type === 'Trending News') return { ...baseBadge, backgroundColor: '#007fff', color: '#fff' };
    return { ...baseBadge, backgroundColor: '#00ffb3', color: '#000' }; // Default Highlights
  }

  render() {
    const { dashboardTitle, videos, currentPage, loading, error, selectedVideoIndex } = this.state;

    if (loading) return <div style={styles.centerText}>Filtering high-impact media streams...</div>;
    if (error) return <div style={{...styles.centerText, color: 'red'}}>{error}</div>;

    if (!videos || videos.length === 0) {
      return <div style={styles.centerText}>No videos available</div>;
    }

    const selectedVideo = videos[selectedVideoIndex];
    const currentUrl = window.location.href;
    const shareDesc = `Check out "${selectedVideo.youtubeTitle}" on our premium media platform dashboard.`;

    return (
      <div style={styles.mainContainer}>
        {/* REACT HELMET META INJECTION ENGINE */}
        <Helmet>
          <title>{selectedVideo.youtubeTitle ? `${selectedVideo.youtubeTitle} | Sports Hub` : "Loading Video Feed..."}</title>
          <meta name="description" content={shareDesc} />

          {/* Open Graph Protocol (WhatsApp, Facebook, Discord, etc) */}
          <meta property="og:title" content={selectedVideo.youtubeTitle} />
          <meta property="og:description" content={shareDesc} />
          <meta property="og:image" content={selectedVideo.thumbnailUrl} />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="video.other" />

          {/* Twitter Meta Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={selectedVideo.youtubeTitle} />
          <meta name="twitter:description" content={shareDesc} />
          <meta name="twitter:image" content={selectedVideo.thumbnailUrl} />
        </Helmet>

        {/* Primary Player Section */}
        <div style={styles.dashboardCard} ref={this.playerRef}>
          <h1 style={styles.mainTitle}>🏆 Football Media Hub</h1>
          <p style={styles.infoLabel}>{dashboardTitle}</p>

          {/* Dynamic Categorization Display */}
          <div style={{ textAlign: 'center' }}>
            <span style={this.getBadgeStyle(selectedVideo.contentType)}>{selectedVideo.contentType}</span>
          </div>

          <h3 style={styles.videoHeader}>{selectedVideo.youtubeTitle}</h3>

          {/* The Native Video Core Frame */}
          <div style={styles.playerContainer}>
            <div style={styles.playerWrapper}>
              <ReactPlayer 
                url={selectedVideo.videoUrl} 
                controls={true} 
                width="100%" 
                height="100%" 
              />
            </div>
          </div>

          {/* SOCIAL LINK SHARING INTERACTION LAYERS */}
          <div style={styles.shareRow}>
            <span style={{ marginRight: '12px', fontSize: '13px', color: '#666' }}>Share Content:</span>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank" rel="noopener noreferrer" style={{ ...styles.shareBtn, backgroundColor: '#3b5998' }}
            >
              Facebook
            </a>
            <a 
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(selectedVideo.youtubeTitle)}`}
              target="_blank" rel="noopener noreferrer" style={{ ...styles.shareBtn, backgroundColor: '#1da1f2' }}
            >
              Twitter / X
            </a>
          </div>
        </div>

        {/* Video Grid Section */}
        <div style={styles.gridContainer}>
          <h2 style={styles.gridTitle}>📺 More Football Content</h2>
          <div style={styles.videoGrid}>
            {videos.map((video, index) => (
              <div
                key={index}
                style={{
                  ...styles.videoCard,
                  border: selectedVideoIndex === index ? '3px solid #00ffb3' : '1px solid #222'
                }}
                onClick={() => this.selectVideo(index)}
              >
                <div style={styles.thumbnailWrapper}>
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.youtubeTitle}
                    style={styles.thumbnail}
                  />
                  <div style={styles.badgeOverlay}>
                    <span style={this.getBadgeStyle(video.contentType)}>
                      {video.contentType}
                    </span>
                  </div>
                </div>
                <div style={styles.videoInfo}>
                  <p style={styles.videoTitle}>{video.youtubeTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div style={styles.paginationContainer}>
          <button 
            style={{
              ...styles.paginationBtn, 
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
            onClick={this.handlePreviousPage}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <span style={styles.pageIndicator}>
            Page {currentPage}
          </span>

          <button 
            style={{
              ...styles.paginationBtn,
              opacity: !this.state.hasNextPage ? 0.5 : 1,
              cursor: !this.state.hasNextPage ? 'not-allowed' : 'pointer'
            }}
            onClick={this.handleNextPage}
            disabled={!this.state.hasNextPage}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainer: { 
    paddingBottom: '40px',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh'
  },
  dashboardCard: { 
    maxWidth: '900px', 
    margin: '40px auto', 
    padding: '35px', 
    backgroundColor: '#0d0d0d', 
    color: '#fff', 
    borderRadius: '16px', 
    border: '1px solid #1c1c1c', 
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)', 
    fontFamily: '"Segoe UI", sans-serif' 
  },
  mainTitle: { 
    textAlign: 'center', 
    color: '#ffffff', 
    margin: '0 0 20px 0', 
    fontSize: '26px', 
    fontWeight: 'bold' 
  },
  infoLabel: { 
    textAlign: 'center', 
    color: '#555', 
    fontSize: '13px', 
    marginBottom: '15px' 
  },
  videoHeader: { 
    textAlign: 'center', 
    fontSize: '17px', 
    color: '#e0e0e0', 
    fontWeight: '400', 
    margin: '10px 0 20px 0' 
  },
  playerContainer: { 
    position: 'relative', 
    paddingTop: '56.25%', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    border: '1px solid #222', 
    backgroundColor: '#000',
    marginBottom: '30px'
  },
  playerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  shareRow: { 
    marginTop: '30px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  shareBtn: { 
    padding: '6px 14px', 
    borderRadius: '6px', 
    color: '#fff', 
    textDecoration: 'none', 
    margin: '0 4px', 
    fontWeight: 'bold', 
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none'
  },
  centerText: { 
    textAlign: 'center', 
    marginTop: '120px', 
    fontSize: '16px', 
    color: '#444' 
  },
  gridContainer: {
    maxWidth: '1200px',
    margin: '60px auto',
    padding: '0 20px'
  },
  gridTitle: {
    color: '#fff',
    fontSize: '22px',
    marginBottom: '30px',
    textAlign: 'center'
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  videoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  thumbnailWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    backgroundColor: '#000',
    overflow: 'hidden'
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  badgeOverlay: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    right: '10px'
  },
  videoInfo: {
    padding: '15px'
  },
  videoTitle: {
    color: '#e0e0e0',
    fontSize: '13px',
    margin: '0',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '40px',
    paddingBottom: '40px'
  },
  paginationBtn: {
    padding: '12px 24px',
    backgroundColor: '#00ffb3',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#00e6a0'
    }
  },
  pageIndicator: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '100px',
    textAlign: 'center'
  }
};

export default FootballVideoPlayer;