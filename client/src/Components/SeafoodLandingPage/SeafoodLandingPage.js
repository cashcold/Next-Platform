import React from 'react';
import { 
  Anchor, 
  Sparkles, 
  Radio, 
  Compass, 
  ShieldCheck, 
  HeartHandshake, 
  Ship, 
  ArrowRight, 
  Waves, 
  Wind, 
  ShoppingBag, 
  Eye, 
  Trash2, 
  X, 
  CheckCircle2, 
  ShieldAlert, 
  MapPin, 
  BookOpen, 
  Users, 
  Clock, 
  Timer, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  CheckCircle, 
  CalendarRange, 
  ClipboardCheck, 
  AlertCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  Menu,
  Thermometer,
  Navigation,
  Calendar
} from 'lucide-react';
import { SEAFOOD_ITEMS, RECIPES } from './data.js';

/* =========================================================================
   SUB-COMPONENT 1: NAVBAR
   ========================================================================= */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOpen: false
    };
  }

  toggleMobileMenu = () => {
    this.setState((prevState) => ({ mobileMenuOpen: !prevState.mobileMenuOpen }));
  };

  handleNavClick = (tab) => {
    this.props.onTabChange(tab);
    this.setState({ mobileMenuOpen: false });
  };

  render() {
    const { activeTab, cartCount } = this.props;
    const { mobileMenuOpen } = this.state;

    const navItems = [
      { id: 'home', label: 'Home Harbor', icon: Anchor },
      { id: 'tracker', label: 'Vessels & Live Harbor', icon: Radio },
      { id: 'market', label: 'Seafood Cold Market', icon: ShoppingBag },
      { id: 'recipes', label: 'Ghanaian Fish Recipes', icon: BookOpen },
      { id: 'reservations', label: 'Contact / Buy & Sell', icon: CalendarRange },
    ];

    return (
      <header id="nautilus-header" className="sticky top-0 z-50 bg-white border-b border-[#ece6de] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              id="logo-container" 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => this.handleNavClick('home')}
            >
              <div className="p-2.5 bg-[#f1f5f5] border border-[#ece6de] rounded-lg group-hover:border-[#4a6b6b] transition-all duration-300">
                <Anchor className="h-6 w-6 text-[#4a6b6b]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl tracking-widest text-[#2c3e3e] font-bold uppercase">
                  Nautilus <span className="font-light text-[#8a817c]">Ghana</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] font-mono text-[#8a817c] uppercase">
                  National Seafood Fleet
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => this.handleNavClick(item.id)}
                    className={`flex items-center gap-2 py-2 px-1 text-sm font-medium tracking-wide border-b-2 transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-[#4a6b6b] border-[#4a6b6b] font-semibold'
                        : 'text-[#8a817c] border-transparent hover:text-[#4a6b6b] hover:border-[#4a6b6b]/45'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Cart & Mobile Trigger */}
            <div className="flex items-center gap-4">
              {/* Cart Button */}
              <button
                id="header-cart-btn"
                onClick={() => this.handleNavClick('market')}
                className="relative p-2.5 bg-[#f9f7f4] border border-[#ece6de] rounded-full text-[#4a6b6b] hover:bg-[#edeae6] hover:border-[#4a6b6b] transition-all duration-300 cursor-pointer"
                title="View Market & Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#4a6b6b] text-white text-[10px] font-mono font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                onClick={this.toggleMobileMenu}
                className="p-2.5 text-[#8a817c] hover:text-[#4a6b6b] md:hidden border border-transparent rounded-lg hover:bg-[#f9f7f4]/50 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-nav" className="md:hidden bg-[#f9f7f4] border-b border-[#ece6de] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => this.handleNavClick(item.id)}
                  className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-left text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#edeae6] text-[#4a6b6b] border-l-4 border-[#4a6b6b]'
                      : 'text-[#8a817c] hover:bg-[#edeae6]/50 hover:text-[#4a6b6b]'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </header>
    );
  }
}

/* =========================================================================
   SUB-COMPONENT 2: HOME VIEW
   ========================================================================= */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeHarbor: 'Tema Harbour',
      showSustainabilityDetails: false
    };
  }

  handleHarborChange = (harbor) => {
    this.setState({ activeHarbor: harbor });
  };

  toggleSustainability = () => {
    this.setState(prevState => ({ showSustainabilityDetails: !prevState.showSustainabilityDetails }));
  };

  render() {
    const { onNavigateToTab } = this.props;
    const { activeHarbor, showSustainabilityDetails } = this.state;

    const harborData = {
      'Tema Harbour': {
        temp: '26.8°C',
        wind: '12 knots SW',
        waves: '1.1 meters',
        tide: 'High Tide rising',
        vessels: 'M.V. Tema Star, M.V. Freedom',
        status: 'Optimal Deep-Sea Catch'
      },
      'Takoradi Harbour': {
        temp: '25.4°C',
        wind: '10 knots S',
        waves: '0.9 meters',
        tide: 'Low Tide bottom',
        vessels: 'M.V. Nyame Nsa, Coast Guardian',
        status: 'Peak Coastal Reef Sourcing'
      },
      'Akosombo Harbour': {
        temp: '28.2°C',
        wind: '5 knots E',
        waves: '0.2 meters',
        tide: 'Calm waters',
        vessels: 'M.V. Akosombo Warrior',
        status: 'Volta Lake Tilapia Sourcing'
      }
    };

    const activeSpecs = harborData[activeHarbor];

    return (
      <div id="home-landing-module" className="space-y-20 pb-20">
        {/* HERO BANNER SECTION (Ghana Theme) */}
        <section id="hero-banner" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden clip-wave bg-[#fcfaf7]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,107,107,0.08)_0%,transparent_70%)] z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-center space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f5f5] border border-[#ece6de] text-[#4a6b6b] text-xs font-mono font-medium tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> PREMIUM NATIONWIDE DELIVERY ANYWHERE IN GHANA
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#2c3e3e] font-bold tracking-tight leading-none max-w-5xl mx-auto">
              Sourced by Sea.<br className="hidden sm:inline" /> Traced by Science.
            </h1>

            <p className="text-[#8a817c] text-lg sm:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
              Buy fresh Volta Tilapia, wild ocean Red Snapper, and spiny lobsters sourced directly by our own fleet of fishing vessels at Tema, Takoradi, and Akosombo.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                id="hero-market-btn"
                onClick={() => onNavigateToTab('market')}
                className="px-8 py-4 btn-gold-foil rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-[#4a6b6b]/15"
              >
                Shop Fresh Market
              </button>
              <button
                id="hero-reservations-btn"
                onClick={() => onNavigateToTab('reservations')}
                className="px-8 py-4 bg-[#f9f7f4] hover:bg-[#edeae6] border border-[#ece6de] rounded-xl text-sm font-semibold text-[#2c3e3e] transition-all duration-300 cursor-pointer"
              >
                Buy, Sell or Contact Us
              </button>
            </div>

            <div className="pt-8 border-t border-[#ece6de] max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-[10px] font-mono text-[#8a817c] uppercase block">Delivery Location</span>
                <span className="text-base font-serif font-bold text-[#2c3e3e] mt-1 block">Anywhere in Ghana</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8a817c] uppercase block">Cold Transport</span>
                <span className="text-base font-serif font-bold text-[#2c3e3e] mt-1 block">Insulated & Safe</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8a817c] uppercase block">Own Vessel Fleet</span>
                <span className="text-base font-serif font-bold text-[#2c3e3e] mt-1 block">4 Active Vessels</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8a817c] uppercase block">Sourcing Certified</span>
                <span className="text-base font-serif font-bold text-emerald-600 mt-1 block">100% Sustainable</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#fcfaf7] z-20"></div>
        </section>

        {/* DAILY HARVEST SPOTLIGHT */}
        <section id="daily-spotlight" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-mono text-[#4a6b6b] uppercase tracking-widest mb-1.5">Fresh Sourcing</div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2c3e3e] font-bold tracking-tight">
                Our Fresh Catch Inventory
              </h2>
            </div>
            <button
              id="view-all-market-btn"
              onClick={() => onNavigateToTab('market')}
              className="group flex items-center gap-1.5 text-xs font-mono font-bold text-[#4a6b6b] hover:text-[#3d5858] transition-colors cursor-pointer"
            >
              Examine Complete Vault <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div id="spotlight-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SEAFOOD_ITEMS.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                id={`spotlight-${item.id}`}
                className="bg-white border border-[#ece6de] rounded-2xl overflow-hidden group shadow-sm"
              >
                <div className="relative h-48 overflow-hidden bg-[#f9f7f4]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 text-[10px] font-mono uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                    {item.freshnessIndex}% Fresh
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-[#8a817c] uppercase">{item.origin.split(',')[0]}</span>
                    <span className="text-xs font-mono font-bold text-[#4a6b6b]">{item.catchCode}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#2c3e3e] font-bold truncate">
                    {item.name}
                  </h3>
                  <p className="text-[#8a817c] text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center pt-3 border-t border-[#f7f3ef]">
                    <span className="text-base font-mono text-[#4a6b6b] font-bold">GH₵ {item.price.toFixed(2)} / kg</span>
                    <button
                      id={`inspect-spotlight-${item.id}`}
                      onClick={() => onNavigateToTab('tracker')}
                      className="text-xs font-mono font-semibold text-[#8a817c] hover:text-[#4a6b6b] transition-all cursor-pointer"
                    >
                      Track Source Vessel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE HARBOR TIDES & WEATHER WIDGET */}
        <section id="harbor-widgets" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#ece6de] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 h-24 w-24 bg-[#4a6b6b]/5 rounded-bl-full flex items-center justify-center text-[#4a6b6b] opacity-20">
              <Compass className="h-10 w-10" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4a6b6b]">
                  <Radio className="h-3.5 w-3.5 animate-pulse" /> Environmental Telemetry
                </div>
                <h3 className="font-serif text-3xl text-[#2c3e3e] font-bold">
                  Live Ghana Harbor Conditions
                </h3>
                <p className="text-[#8a817c] text-sm leading-relaxed">
                  Select our harbor hubs in Ghana to inspect active marine sensors, tide status, and our vessels docking with fresh stocks.
                </p>

                <div className="flex gap-2 flex-wrap pt-2">
                  {['Tema Harbour', 'Takoradi Harbour', 'Akosombo Harbour'].map((harbor) => (
                    <button
                      key={harbor}
                      id={`harbor-tab-${harbor.replace(' ', '-')}`}
                      onClick={() => this.handleHarborChange(harbor)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all duration-300 cursor-pointer ${
                        activeHarbor === harbor
                          ? 'bg-[#4a6b6b] text-white border-[#4a6b6b] shadow-md'
                          : 'bg-[#f9f7f4] border-[#ece6de] text-[#8a817c] hover:border-[#4a6b6b] hover:text-[#4a6b6b]'
                      }`}
                    >
                      {harbor}
                    </button>
                  ))}
                </div>
              </div>

              <div id="ocean-conditions-box" className="lg:col-span-7 bg-[#f9f7f4] rounded-2xl border border-[#ece6de] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono text-[#8a817c] uppercase flex items-center justify-center sm:justify-start gap-1">
                    <Waves className="h-3.5 w-3.5 text-[#4a6b6b]" /> Water Temp
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#2c3e3e] block">{activeSpecs.temp}</span>
                  <span className="text-[9px] font-mono text-emerald-600 block font-semibold">✓ Perfect Cold Storage</span>
                </div>

                <div className="space-y-1 text-center sm:text-left border-y sm:border-y-0 sm:border-x border-[#ece6de] py-4 sm:py-0 sm:px-6">
                  <span className="text-[10px] font-mono text-[#8a817c] uppercase flex items-center justify-center sm:justify-start gap-1">
                    <Wind className="h-3.5 w-3.5 text-[#4a6b6b]" /> Harbor Winds
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#2c3e3e] block">{activeSpecs.wind}</span>
                  <span className="text-[9px] font-mono text-[#8a817c] block">Waves: {activeSpecs.waves}</span>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono text-[#8a817c] uppercase flex items-center justify-center sm:justify-start gap-1">
                    <Anchor className="h-3.5 w-3.5 text-[#4a6b6b]" /> Active Vessel
                  </span>
                  <span className="text-sm font-serif text-[#2c3e3e] font-semibold block truncate mt-1">
                    {activeSpecs.vessels.split(',')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-[#4a6b6b] block uppercase mt-0.5 font-bold">{activeSpecs.status}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUSTAINABLE OCEAN CONSERVATION PLEDGE */}
        <section id="sustainability-conservation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 relative">
              <div className="absolute -left-12 -top-12 h-44 w-44 bg-emerald-500/5 rounded-full filter blur-3xl z-0"></div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-400/20 rounded-full text-emerald-600 text-xs font-mono font-bold">
                <ShieldCheck className="h-3.5 w-3.5" /> Ministry of Fisheries Approved
              </div>
              <h3 className="font-serif text-4xl text-[#2c3e3e] font-bold leading-tight">
                Empowering Local Ghanaian Fishing Communities
              </h3>
              <p className="text-[#8a817c] text-sm leading-relaxed">
                Nautilus owns and operates certified vessels registered under Ghanaian maritime laws. We source only sustainably caught seafood from our local partners and our own fleet, protecting wild marine diversity.
              </p>

              <button
                id="toggle-sustainability-btn"
                onClick={this.toggleSustainability}
                className="px-5 py-2.5 bg-[#f1f5f5] hover:bg-[#edeae6] border border-[#ece6de] rounded-xl text-xs font-bold text-[#4a6b6b] transition-all cursor-pointer"
              >
                {showSustainabilityDetails ? 'Hide Sourcing Details' : 'Verify Our Sourcing Standards'}
              </button>

              {showSustainabilityDetails && (
                <div id="certification-drawer" className="bg-[#f9f7f4] border border-[#ece6de] p-4 rounded-xl space-y-3 animate-fadeIn">
                  <span className="text-[10px] font-mono text-[#4a6b6b] block uppercase font-bold">LEDGER REGISTRY ID: GH-MAR-2026-F</span>
                  <p className="text-xs text-[#6b615a]">
                    Our operations hold strict certifications with state maritime and environmental commissions. Every purchase supports direct, fair wages to our crew members and local canoe cooperatives.
                  </p>
                  <span className="text-[9px] text-emerald-600 font-mono block font-bold">● Active 2026 Fisheries License</span>
                </div>
              )}
            </div>

            <div id="conservation-metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <div className="bg-white border border-[#ece6de] p-5 rounded-2xl shadow-sm">
                <div className="p-3 bg-[#f1f5f5] border border-[#ece6de] w-fit rounded-xl mb-3">
                  <Compass className="h-5 w-5 text-[#4a6b6b]" />
                </div>
                <h4 className="font-serif text-lg text-[#2c3e3e] font-bold mb-1">100% Traceability</h4>
                <p className="text-xs text-[#8a817c] leading-relaxed">
                  Every snapper, tilapia, or crab can be traced to the specific vessel and exact day it was landed in Ghana.
                </p>
              </div>

              <div className="bg-white border border-[#ece6de] p-5 rounded-2xl shadow-sm">
                <div className="p-3 bg-[#f1f5f5] border border-[#ece6de] w-fit rounded-xl mb-3">
                  <ShieldCheck className="h-5 w-5 text-[#4a6b6b]" />
                </div>
                <h4 className="font-serif text-lg text-[#2c3e3e] font-bold mb-1">Nationwide Delivery</h4>
                <p className="text-xs text-[#8a817c] leading-relaxed">
                  Equipped with chilled logistics boxes, we deliver your fresh catch safely anywhere in Ghana.
                </p>
              </div>

              <div className="bg-white border border-[#ece6de] p-5 rounded-2xl shadow-sm">
                <div className="p-3 bg-[#f1f5f5] border border-[#ece6de] w-fit rounded-xl mb-3">
                  <Ship className="h-5 w-5 text-[#4a6b6b]" />
                </div>
                <h4 className="font-serif text-lg text-[#2c3e3e] font-bold mb-1">Own Vessel Fleet</h4>
                <p className="text-xs text-[#8a817c] leading-relaxed">
                  We control the supply chain from net to delivery using our registered vessels (M.V. Nyame Nsa, etc.).
                </p>
              </div>

              <div className="bg-white border border-[#ece6de] p-5 rounded-2xl shadow-sm">
                <div className="p-3 bg-[#f1f5f5] border border-[#ece6de] w-fit rounded-xl mb-3">
                  <HeartHandshake className="h-5 w-5 text-[#4a6b6b]" />
                </div>
                <h4 className="font-serif text-lg text-[#2c3e3e] font-bold mb-1">Buy & Sell Portal</h4>
                <p className="text-xs text-[#8a817c] leading-relaxed">
                  Local artisanal fishers can partner with us to sell their catch, and commercial buyers can order in bulk.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

/* =========================================================================
   SUB-COMPONENT 3: VESSEL & LIVE HARBOR TRACKER
   ========================================================================= */
class FreshTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      selectedItem: SEAFOOD_ITEMS[0],
      verificationCodeInput: '',
      isVerifying: false,
      verifiedStatus: 'idle'
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    const found = SEAFOOD_ITEMS.find(
      item => item.catchCode.toLowerCase() === this.state.searchQuery.trim().toLowerCase()
    );
    if (found) {
      this.setState({ selectedItem: found, verifiedStatus: 'success' });
    } else {
      this.setState({ verifiedStatus: 'failed' });
    }
  };

  handleCodeSelect = (item) => {
    this.setState({
      selectedItem: item,
      searchQuery: item.catchCode,
      verifiedStatus: 'success'
    });
  };

  verifyCustomCode = () => {
    this.setState({ isVerifying: true });
    setTimeout(() => {
      const match = SEAFOOD_ITEMS.find(
        i => i.catchCode.toLowerCase() === this.state.verificationCodeInput.trim().toLowerCase()
      );
      if (match) {
        this.setState({
          selectedItem: match,
          verifiedStatus: 'success',
          searchQuery: match.catchCode,
          isVerifying: false
        });
      } else {
        this.setState({
          verifiedStatus: 'failed',
          isVerifying: false
        });
      }
    }, 1200);
  };

  render() {
    const { selectedItem, verificationCodeInput, isVerifying, verifiedStatus } = this.state;

    return (
      <section id="fresh-tracker" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f5f5] border border-[#ece6de] text-[#4a6b6b] text-xs font-mono font-bold mb-4 uppercase tracking-widest">
            <Radio className="h-3 w-3 animate-pulse" /> LIVE MARITIME LOGS
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-gold-gradient font-bold tracking-tight mb-4">
            Ocean-to-Door Traceability
          </h2>
          <p className="text-[#8a817c] text-lg leading-relaxed">
            Every catch in our vessels carries an immutable maritime tag. Choose any fish code below to track its journey from Ghanaian ocean coordinates directly to your doorstep.
          </p>
        </div>

        <div id="marine-ledger-stats" className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-[#ece6de] rounded-xl p-5 text-center shadow-sm">
            <span className="text-[10px] tracking-wider uppercase font-mono text-[#8a817c] block mb-1">Water Temperature</span>
            <div className="text-[#4a6b6b] font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <Thermometer className="h-5 w-5 text-[#4a6b6b]" /> 26.5°C
            </div>
            <span className="text-[10px] text-emerald-600 font-mono mt-1 block font-bold">● Active Gulf Currents</span>
          </div>

          <div className="bg-white border border-[#ece6de] rounded-xl p-5 text-center shadow-sm">
            <span className="text-[10px] tracking-wider uppercase font-mono text-[#8a817c] block mb-1">Our Fleet</span>
            <div className="text-[#4a6b6b] font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <Anchor className="h-5 w-5 text-[#4a6b6b]" /> 4 Vessels
            </div>
            <span className="text-[10px] text-[#8a817c] font-mono mt-1 block">Registered in Ghana</span>
          </div>

          <div className="bg-white border border-[#ece6de] rounded-xl p-5 text-center shadow-sm">
            <span className="text-[10px] tracking-wider uppercase font-mono text-[#8a817c] block mb-1">Harbour Docks</span>
            <div className="text-[#4a6b6b] font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <Compass className="h-5 w-5 text-[#4a6b6b]" /> 3 Harbours
            </div>
            <span className="text-[10px] text-[#8a817c] font-mono mt-1 block">Tema, Takoradi, Akosombo</span>
          </div>

          <div className="bg-white border border-[#ece6de] rounded-xl p-5 text-center shadow-sm">
            <span className="text-[10px] tracking-wider uppercase font-mono text-[#8a817c] block mb-1">Quality Inspection</span>
            <div className="text-[#4a6b6b] font-serif text-2xl font-semibold flex items-center justify-center gap-1">
              <ShieldAlert className="h-5 w-5 text-emerald-600" /> 100% Fresh
            </div>
            <span className="text-[10px] text-emerald-600 font-mono mt-1 block font-bold">Tested & Approved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#ece6de] rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif text-lg text-[#4a6b6b] font-bold mb-3 uppercase tracking-wider">
                Select Active Catch Code
              </h3>
              <p className="text-xs text-[#8a817c] mb-4">
                Click any code harvested recently to inspect its real-time telemetry:
              </p>
              <div className="space-y-2.5">
                {SEAFOOD_ITEMS.map((item) => {
                  const isCurrent = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`catch-btn-${item.id}`}
                      onClick={() => this.handleCodeSelect(item)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#f1f5f5] border-[#4a6b6b] text-[#2c3e3e] font-medium shadow-sm'
                          : 'bg-white border-[#ece6de] hover:border-[#4a6b6b] text-[#8a817c] hover:text-[#4a6b6b]'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold tracking-wider text-[#4a6b6b]">
                          {item.catchCode}
                        </span>
                        <span className="text-xs mt-0.5 truncate max-w-[180px] text-[#2c3e3e]">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono bg-[#fcfaf7] px-1.5 py-0.5 rounded text-emerald-600 border border-[#ece6de]">
                          {item.freshnessIndex}% Fresh
                        </span>
                        <span className="text-[9px] text-[#8a817c] mt-0.5 font-mono">
                          {item.origin.split(',')[1] || item.origin}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-[#ece6de] rounded-2xl p-5 shadow-sm">
              <h3 className="font-serif text-lg text-[#4a6b6b] font-bold mb-2 uppercase tracking-wider">
                Verify Catch Code
              </h3>
              <p className="text-xs text-[#8a817c] mb-4">
                Have a code on your delivery package? Verify it here:
              </p>
              <div className="flex gap-2">
                <input
                  id="custom-catch-input"
                  type="text"
                  placeholder="e.g. SNAP-GH-04"
                  value={verificationCodeInput}
                  onChange={(e) => this.setState({ verificationCodeInput: e.target.value })}
                  className="flex-1 bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#3d3d3d] font-mono placeholder-[#8a817c] focus:outline-none focus:border-[#4a6b6b]"
                />
                <button
                  id="verify-code-btn"
                  onClick={this.verifyCustomCode}
                  disabled={isVerifying}
                  className="px-4 py-2 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-medium rounded-xl text-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? 'Scanning...' : 'Verify'}
                </button>
              </div>

              {verifiedStatus === 'success' && (
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 className="h-4 w-4" /> Code verified. Ledger loaded below.
                </div>
              )}
              {verifiedStatus === 'failed' && (
                <div className="mt-3 text-xs text-rose-500 font-medium">
                  ⚠️ Ledger Record Not Found. Double check code format.
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white border border-[#ece6de] rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ece6de] pb-6 mb-8 gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-[#ece6de]"
                />
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#4a6b6b] bg-[#f1f5f5] px-2 py-0.5 rounded uppercase">
                    Catch Code: {selectedItem.catchCode}
                  </span>
                  <h4 className="font-serif text-2xl text-[#2c3e3e] font-bold mt-1">
                    {selectedItem.name}
                  </h4>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-[#8a817c] uppercase block">Certified Freshness Index</span>
                <span className="text-3xl font-mono text-[#4a6b6b] font-bold">
                  {selectedItem.freshnessIndex}%
                </span>
                <span className="text-[10px] text-emerald-600 font-mono block font-semibold">★ Peak Quality Guarded</span>
              </div>
            </div>

            <h5 className="font-serif text-base text-[#4a6b6b] font-medium uppercase tracking-wider mb-4">
              Ghanaian Catch Telemetry
            </h5>
            <div id="telemetry-specs-grid" className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Vessel Name</span>
                <span className="text-sm font-medium text-[#2c3e3e] flex items-center gap-1.5 mt-1">
                  <Anchor className="h-3.5 w-3.5 text-[#4a6b6b]" /> {selectedItem.vessel}
                </span>
              </div>
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Depth of Catch</span>
                <span className="text-sm font-medium text-[#2c3e3e] flex items-center gap-1.5 mt-1">
                  <Navigation className="h-3.5 w-3.5 text-[#4a6b6b] rotate-180" /> {selectedItem.depth} Meters
                </span>
              </div>
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Storage Temp</span>
                <span className="text-sm font-medium text-[#2c3e3e] flex items-center gap-1.5 mt-1">
                  <Thermometer className="h-3.5 w-3.5 text-[#4a6b6b]" /> {selectedItem.temperature}°C
                </span>
              </div>
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Origin Sourcing Harbour</span>
                <span className="text-sm font-medium text-[#2c3e3e] block mt-1 truncate">
                  {selectedItem.origin}
                </span>
              </div>
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Landing Date</span>
                <span className="text-sm font-medium text-[#2c3e3e] flex items-center gap-1.5 mt-1">
                  <Calendar className="h-3.5 w-3.5 text-[#4a6b6b]" /> {selectedItem.landingDate.split(',')[0]}
                </span>
              </div>
              <div className="bg-[#f9f7f4] rounded-xl p-3 border border-[#ece6de]">
                <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Sustainability Level</span>
                <span className="text-sm font-semibold text-emerald-600 mt-1 block">
                  ✓ {selectedItem.sustainability}
                </span>
              </div>
            </div>

            <h5 className="font-serif text-base text-[#4a6b6b] font-medium uppercase tracking-wider mb-6">
              Verified Ghanaian Cold-Chain Timeline
            </h5>
            <div id="cold-chain-timeline" className="relative pl-6 border-l-2 border-[#ece6de] space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 bg-[#4a6b6b] h-4 w-4 rounded-full border-4 border-white"></div>
                <div>
                  <span className="text-[10px] font-mono text-[#4a6b6b] font-bold">STAGE 1: SUSTAINABLE SEA HARVEST</span>
                  <h6 className="text-sm font-bold text-[#2c3e3e] mt-0.5">Caught by {selectedItem.vessel}</h6>
                  <p className="text-xs text-[#8a817c] mt-1">
                    Retrieved at a depth of {selectedItem.depth} meters in rich waters. Vessel tracking telemetry matches coordinate registry.
                  </p>
                  <span className="text-[9px] font-mono text-[#8a817c] mt-1 block">{selectedItem.landingDate}</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 bg-[#4a6b6b] h-4 w-4 rounded-full border-4 border-white"></div>
                <div>
                  <span className="text-[10px] font-mono text-[#4a6b6b] font-bold">STAGE 2: RAPID HARBOUR CHILLING</span>
                  <h6 className="text-sm font-bold text-[#2c3e3e] mt-0.5">Immediate Cold Chain Storage</h6>
                  <p className="text-xs text-[#8a817c] mt-1">
                    Submerged in liquid slurry chilling vats at exactly {selectedItem.temperature}°C to lock in exceptional freshness and texture.
                  </p>
                  <span className="text-[9px] font-mono text-[#8a817c] mt-1 block">Harvest + 20 mins</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 bg-[#4a6b6b] h-4 w-4 rounded-full border-4 border-white"></div>
                <div>
                  <span className="text-[10px] font-mono text-[#4a6b6b] font-bold">STAGE 3: HARBOUR CLASSIFICATION</span>
                  <h6 className="text-sm font-bold text-[#2c3e3e] mt-0.5">Inspection & Tagging</h6>
                  <p className="text-xs text-[#8a817c] mt-1">
                    Inspected and cleared by fisheries officials at Tema or Takoradi ports. Sealed in certified insulated shipping crates. Tag <code className="text-[#4a6b6b] font-mono text-xs">{selectedItem.catchCode}</code> issued.
                  </p>
                  <span className="text-[9px] font-mono text-[#8a817c] mt-1 block">Harvest + 2 hours</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1 bg-emerald-600 h-4 w-4 rounded-full border-4 border-white"></div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">STAGE 4: DEPLOYMENT & DELIVERY</span>
                  <h6 className="text-sm font-bold text-emerald-600 mt-0.5">Delivery Active Across Ghana</h6>
                  <p className="text-xs text-[#8a817c] mt-1">
                    Transferred to specialized refrigerated delivery vehicles and shipped directly to Accra, Kumasi, Takoradi, Tamale, or your local city.
                  </p>
                  <span className="text-[9px] font-mono text-emerald-600 mt-1 block">Live Status: Premium Delivery Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

/* =========================================================================
   SUB-COMPONENT 4: SEAFOOD COLD MARKET
   ========================================================================= */
class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'all',
      detailProduct: null,
      checkoutOpen: false,
      checkoutName: '',
      checkoutRegion: 'Greater Accra',
      checkoutAddress: '',
      checkoutNotes: '',
      orderPlaced: false,
      orderNumber: ''
    };
  }

  handleCategoryChange = (cat) => {
    this.setState({ selectedCategory: cat });
  };

  openDetails = (product) => {
    this.setState({ detailProduct: product });
  };

  closeDetails = () => {
    this.setState({ detailProduct: null });
  };

  openCheckout = () => {
    this.setState({ checkoutOpen: true });
  };

  closeCheckout = () => {
    this.setState({ checkoutOpen: false, orderPlaced: false });
  };

  handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!this.state.checkoutName || !this.state.checkoutAddress) return;

    const code = 'NTL-GH-' + Math.floor(100000 + Math.random() * 900000);
    this.setState({ 
      orderPlaced: true,
      orderNumber: code
    });

    setTimeout(() => {
      this.props.onClearCart();
    }, 1500);
  };

  render() {
    const { cart, onAddToCart, onRemoveFromCart, onUpdateCartQuantity } = this.props;
    const { 
      selectedCategory, 
      detailProduct, 
      checkoutOpen, 
      checkoutName, 
      checkoutRegion,
      checkoutAddress, 
      checkoutNotes, 
      orderPlaced, 
      orderNumber 
    } = this.state;

    const filteredItems = selectedCategory === 'all' 
      ? SEAFOOD_ITEMS 
      : SEAFOOD_ITEMS.filter(item => item.category === selectedCategory);

    const categories = [
      { id: 'all', label: 'All Seafood' },
      { id: 'crustaceans', label: 'Crustaceans' },
      { id: 'shellfish', label: 'Shellfish' },
      { id: 'finfish', label: 'Finfish' },
      { id: 'specialty', label: 'Specialty Catch' }
    ];

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const shippingThreshold = 400;
    const shippingCost = subtotal > shippingThreshold || subtotal === 0 ? 0 : 35.00;
    const priorityHandling = subtotal > 0 ? 15.00 : 0;
    const grandTotal = subtotal + shippingCost + priorityHandling;

    return (
      <section id="seafood-market" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f5f5] border border-[#ece6de] text-[#4a6b6b] text-xs font-mono font-bold mb-4 uppercase tracking-widest">
            <Sparkles className="h-3 w-3" /> Nautilus Shore Market
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2c3e3e] font-bold tracking-tight mb-4">
            Ghana Seafood Market Vault
          </h2>
          <p className="text-[#8a817c] text-lg leading-relaxed">
            Order premium coastal fish, Tilapia, and crabs caught by our fleet and delivered fresh to any address across Ghana.
          </p>
        </div>

        <div id="category-filter-bar" className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => this.handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#4a6b6b] text-white border-[#4a6b6b] font-semibold'
                  : 'bg-white border-[#ece6de] hover:border-[#4a6b6b] text-[#8a817c] hover:text-[#4a6b6b]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map(product => {
              const inCartItem = cart.find(item => item.product.id === product.id);
              const inCartQty = inCartItem ? inCartItem.quantity : 0;

              return (
                <div 
                  key={product.id} 
                  id={`product-card-${product.id}`}
                  className="bg-white border border-[#ece6de] rounded-2xl overflow-hidden flex flex-col relative shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                    <span className="text-[9px] font-mono font-semibold uppercase bg-white/95 text-[#4a6b6b] px-2 py-0.5 rounded border border-[#ece6de] shadow-sm">
                      {product.category}
                    </span>
                    <span className="text-[9px] font-mono font-semibold uppercase bg-emerald-600/90 text-white px-2 py-0.5 rounded shadow-sm">
                      {product.freshnessIndex}% Fresh
                    </span>
                  </div>

                  <div className="relative h-48 overflow-hidden bg-[#f9f7f4]">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[10px] font-mono text-[#8a817c] block mb-1">
                      📍 {product.origin}
                    </span>
                    <h3 className="font-serif text-xl text-[#2c3e3e] font-bold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-[#8a817c] text-xs line-clamp-2 leading-relaxed flex-1 mb-4">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f7f3ef]">
                      <div>
                        <span className="text-[10px] text-[#8a817c] block font-mono">Price / kg</span>
                        <span className="text-xl font-mono text-[#4a6b6b] font-bold">
                          GH₵ {product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          id={`view-details-${product.id}`}
                          onClick={() => this.openDetails(product)}
                          className="p-2 border border-[#ece6de] rounded-xl text-[#4a6b6b] hover:bg-[#f1f5f5] transition-all duration-200 cursor-pointer"
                          title="Sourcing telemetry"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </button>

                        <button
                          id={`add-to-cart-${product.id}`}
                          onClick={() => onAddToCart(product)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-medium rounded-xl text-xs transition-all duration-200 cursor-pointer"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          {inCartQty > 0 ? `In Cart (${inCartQty})` : 'Add Fresh'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 bg-white border border-[#ece6de] rounded-2xl p-5 sm:p-6 flex flex-col h-fit shadow-sm">
            <div className="flex items-center justify-between border-b border-[#ece6de] pb-4 mb-4">
              <h3 className="font-serif text-lg text-[#2c3e3e] font-bold flex items-center gap-2 uppercase tracking-wider">
                <ShoppingBag className="h-5 w-5 text-[#4a6b6b]" /> Sourcing Cart
              </h3>
              <span className="text-xs font-mono bg-[#f1f5f5] text-[#4a6b6b] px-2 py-0.5 rounded-lg border border-[#ece6de]">
                {cart.reduce((acc, item) => acc + item.quantity, 0)} items
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-300 mb-3" />
                <p className="text-sm text-[#8a817c] font-medium">Your shopping cart is currently empty.</p>
                <p className="text-xs text-[#8a817c]/70 mt-1">Select from our premium fresh catches on the left.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 mb-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 bg-[#fcfaf7] p-3 rounded-xl border border-[#ece6de]">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-[#ece6de]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2c3e3e] truncate">{item.product.name}</h4>
                      <span className="text-[10px] font-mono text-[#4a6b6b] block mt-0.5">
                        GH₵ {item.product.price.toFixed(2)} each
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          id={`dec-qty-${item.product.id}`}
                          onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                          className="h-5 w-5 rounded bg-white hover:bg-[#edeae6] border border-[#ece6de] text-gray-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-mono text-[#2c3e3e] w-4 text-center">{item.quantity}</span>
                        <button
                          id={`inc-qty-${item.product.id}`}
                          onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                          className="h-5 w-5 rounded bg-white hover:bg-[#edeae6] border border-[#ece6de] text-gray-600 flex items-center justify-center text-xs font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      id={`delete-item-${item.product.id}`}
                      onClick={() => onRemoveFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-500 p-1 self-start transition-colors duration-200 cursor-pointer"
                      title="Remove catch"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-[#ece6de] pt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-[#8a817c]">
                  <span>Product Subtotal</span>
                  <span className="font-mono text-[#2c3e3e]">GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#8a817c]">
                  <span>
                    Chilled Preservation Pack
                    <span className="text-[9px] block text-[#8a817c]/75">Insulated cold chain protection</span>
                  </span>
                  <span className="font-mono text-[#2c3e3e]">GH₵ {priorityHandling.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#8a817c]">
                  <span>
                    Delivery Fee (Across Ghana)
                    {subtotal > shippingThreshold ? (
                      <span className="text-[9px] block text-emerald-600 font-semibold">✓ Free Delivery Reward</span>
                    ) : (
                      <span className="text-[9px] block text-[#8a817c]/75">Free above GH₵ {shippingThreshold}.00</span>
                    )}
                  </span>
                  <span className="font-mono text-right text-[#2c3e3e]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase text-[10px]">Free</span>
                    ) : (
                      `GH₵ ${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t border-[#ece6de] pt-3 flex justify-between items-center text-[#2c3e3e] font-bold">
                  <span className="font-serif">Grand Total</span>
                  <span className="text-lg font-mono text-[#4a6b6b]">GH₵ {grandTotal.toFixed(2)}</span>
                </div>

                <button
                  id="checkout-trigger-btn"
                  onClick={this.openCheckout}
                  className="w-full mt-4 py-3 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" /> Secure Order Now
                </button>
              </div>
            )}
          </div>
        </div>

        {detailProduct && (
          <div id="product-details-modal" className="fixed inset-0 z-50 bg-[#2c3e3e]/40 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-[#ece6de] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <button
                id="close-details-modal"
                onClick={this.closeDetails}
                className="absolute top-4 right-4 p-2 bg-[#f9f7f4] border border-[#ece6de] hover:border-[#4a6b6b] rounded-full text-gray-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              <div className="p-6 sm:p-8">
                <img 
                  src={detailProduct.imageUrl} 
                  alt={detailProduct.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover rounded-2xl border border-[#ece6de] mb-6"
                />

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-[#4a6b6b] bg-[#f1f5f5] px-2.5 py-1 rounded-md border border-[#ece6de]">
                    Code: {detailProduct.catchCode}
                  </span>
                  <span className="text-xs font-mono text-emerald-600 bg-[#f1f5f5] px-2.5 py-1 rounded-md border border-emerald-600/10">
                    Freshness: {detailProduct.freshnessIndex}%
                  </span>
                  <span className="text-xs font-mono text-[#8a817c] bg-[#edeae6] px-2.5 py-1 rounded-md">
                    {detailProduct.sustainability}
                  </span>
                </div>

                <h3 className="font-serif text-3xl text-[#2c3e3e] font-bold mb-4">
                  {detailProduct.name}
                </h3>

                <p className="text-[#8a817c] text-sm leading-relaxed mb-6">
                  {detailProduct.description}
                </p>

                <h4 className="font-serif text-base text-[#4a6b6b] font-semibold uppercase tracking-wider mb-3">
                  Ghana Sourcing & Fleet Telemetry
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-6 bg-[#f9f7f4] p-4 rounded-xl border border-[#ece6de]">
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-[#8a817c] uppercase block">Catching Vessel:</span>
                      <span className="text-[#2c3e3e] font-medium">{detailProduct.vessel}</span>
                    </div>
                    <div>
                      <span className="text-[#8a817c] uppercase block">Harvest Depth:</span>
                      <span className="text-[#2c3e3e] font-medium">{detailProduct.depth} meters</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-[#8a817c] uppercase block">Sourcing Harbour:</span>
                      <span className="text-[#2c3e3e] font-medium">{detailProduct.origin}</span>
                    </div>
                    <div>
                      <span className="text-[#8a817c] uppercase block">Water Temperature:</span>
                      <span className="text-[#2c3e3e] font-medium">{detailProduct.temperature}°C</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#ece6de]">
                  <span className="text-2xl font-mono text-[#4a6b6b] font-bold">
                    GH₵ {detailProduct.price.toFixed(2)}
                  </span>
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={() => {
                      onAddToCart(detailProduct);
                      this.closeDetails();
                    }}
                    className="px-5 py-2.5 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-sm transition-all duration-200 cursor-pointer"
                  >
                    Add This Fresh Catch
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {checkoutOpen && (
          <div id="checkout-modal" className="fixed inset-0 z-50 bg-[#2c3e3e]/40 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-[#ece6de] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative">
              <button
                id="close-checkout-modal"
                onClick={this.closeCheckout}
                className="absolute top-4 right-4 p-2 bg-[#f9f7f4] border border-[#ece6de] hover:border-[#4a6b6b] rounded-full text-gray-500 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>

              <div className="p-6">
                {!orderPlaced ? (
                  <form onSubmit={this.handleCheckoutSubmit} className="space-y-4">
                    <div className="text-center pb-2 border-b border-[#ece6de] mb-4">
                      <ShoppingBag className="h-8 w-8 text-[#4a6b6b] mx-auto mb-2" />
                      <h3 className="font-serif text-xl text-[#2c3e3e] font-bold">
                        Ghana Cold Chain Dispatch
                      </h3>
                      <p className="text-xs text-[#8a817c] mt-1">
                        We deliver fresh fish and vessels catches anywhere in Ghana.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Recipient Name</label>
                      <input
                        id="checkout-name"
                        type="text"
                        required
                        placeholder="e.g. Kwame Mensah"
                        value={checkoutName}
                        onChange={(e) => this.setState({ checkoutName: e.target.value })}
                        className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Ghana Region</label>
                      <select
                        id="checkout-region"
                        value={checkoutRegion}
                        onChange={(e) => this.setState({ checkoutRegion: e.target.value })}
                        className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                      >
                        <option value="Greater Accra">Greater Accra Region</option>
                        <option value="Ashanti">Ashanti Region</option>
                        <option value="Western">Western Region</option>
                        <option value="Central">Central Region</option>
                        <option value="Eastern">Eastern Region</option>
                        <option value="Volta">Volta Region</option>
                        <option value="Northern">Northern Region</option>
                        <option value="Bono">Bono Region</option>
                        <option value="Upper East">Upper East Region</option>
                        <option value="Upper West">Upper West Region</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Delivery Address / City</label>
                      <textarea
                        id="checkout-address"
                        required
                        rows={2}
                        placeholder="e.g. House No. 45, Spintex Road, Accra"
                        value={checkoutAddress}
                        onChange={(e) => this.setState({ checkoutAddress: e.target.value })}
                        className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Delivery Notes</label>
                      <input
                        id="checkout-notes"
                        type="text"
                        placeholder="e.g. Call before arrival, leave at office"
                        value={checkoutNotes}
                        onChange={(e) => this.setState({ checkoutNotes: e.target.value })}
                        className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                      />
                    </div>

                    <div className="bg-[#fcfaf7] p-3 rounded-xl border border-[#ece6de] flex items-start gap-2 text-xs text-[#8a817c]">
                      <ShieldCheck className="h-4.5 w-4.5 text-[#4a6b6b] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#2c3e3e] block">Our Cold Chain Guarantee</span>
                        Your seafood is packed in custom ice boxes and delivered anywhere in Ghana.
                      </div>
                    </div>

                    <button
                      id="place-order-btn"
                      type="submit"
                      className="w-full mt-2 py-3 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm"
                    >
                      Place Secure Order (GH₵ {grandTotal.toFixed(2)})
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4">
                    <div className="h-16 w-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#2c3e3e] font-bold">
                      Order Placed Successfully!
                    </h3>
                    <p className="text-sm text-[#8a817c] leading-relaxed max-w-xs mx-auto">
                      Thank you for your order. We are preparing your fresh cold-chain package for delivery.
                    </p>

                    <div className="bg-[#fcfaf7] border border-[#ece6de] p-4 rounded-xl max-w-xs mx-auto">
                      <span className="text-[10px] font-mono text-[#8a817c] block uppercase">GHANA COURIER WAYBILL CODE</span>
                      <span className="text-lg font-mono text-[#4a6b6b] font-bold tracking-wider">{orderNumber}</span>
                      <span className="text-[9px] text-emerald-600 font-mono block mt-1">● Refrigeration verified</span>
                    </div>

                    <div className="text-xs text-[#8a817c] flex items-center justify-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#4a6b6b]" /> Delivering to: <span className="text-[#2c3e3e] truncate max-w-[120px]">{checkoutAddress}</span>
                    </div>

                    <button
                      id="order-dismiss-btn"
                      onClick={this.closeCheckout}
                      className="mt-6 px-6 py-2.5 bg-[#4a6b6b] hover:bg-[#3d5858] border border-[#ece6de] rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      Return to Market
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

/* =========================================================================
   SUB-COMPONENT 5: GHANAIAN FISH RECIPES
   ========================================================================= */
class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.timerInterval = null;
    this.state = {
      selectedRecipe: RECIPES[0],
      servings: 2,
      cookingModeActive: false,
      currentStepIndex: 0,
      timerSecondsRemaining: 0,
      timerRunning: false
    };
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleSelectRecipe = (recipe) => {
    this.setState({
      selectedRecipe: recipe,
      servings: 2,
      cookingModeActive: false,
      currentStepIndex: 0,
      timerSecondsRemaining: 0,
      timerRunning: false
    });
    this.stopTimer();
  };

  adjustServings = (amount) => {
    this.setState(prevState => {
      const newServings = Math.max(1, prevState.servings + amount);
      return { servings: newServings };
    });
  };

  startCookingMode = () => {
    this.setState({
      cookingModeActive: true,
      currentStepIndex: 0
    }, () => {
      this.initTimerForStep();
    });
  };

  exitCookingMode = () => {
    this.setState({
      cookingModeActive: false,
      currentStepIndex: 0,
      timerRunning: false
    });
    this.stopTimer();
  };

  nextStep = () => {
    const { selectedRecipe, currentStepIndex } = this.state;
    if (currentStepIndex < selectedRecipe.instructions.length - 1) {
      this.setState({
        currentStepIndex: currentStepIndex + 1
      }, () => {
        this.initTimerForStep();
      });
    }
  };

  prevStep = () => {
    const { currentStepIndex } = this.state;
    if (currentStepIndex > 0) {
      this.setState({
        currentStepIndex: currentStepIndex - 1
      }, () => {
        this.initTimerForStep();
      });
    }
  };

  initTimerForStep = () => {
    this.stopTimer();
    const { selectedRecipe, currentStepIndex } = this.state;
    const text = selectedRecipe.instructions[currentStepIndex];
    
    let seconds = 0;
    const minutesMatch = text.match(/(\d+(\.\d+)?)\s*minute/i);
    if (minutesMatch) {
      const minutesVal = parseFloat(minutesMatch[1]);
      seconds = Math.round(minutesVal * 60);
    } else {
      const secondsMatch = text.match(/(\d+)\s*second/i);
      if (secondsMatch) {
        seconds = parseInt(secondsMatch[1]);
      }
    }

    this.setState({
      timerSecondsRemaining: seconds,
      timerRunning: false
    });
  };

  startTimer = () => {
    if (this.state.timerRunning) return;
    this.setState({ timerRunning: true });
    this.timerInterval = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timerSecondsRemaining <= 1) {
          this.stopTimer();
          return { timerSecondsRemaining: 0, timerRunning: false };
        }
        return { timerSecondsRemaining: prevState.timerSecondsRemaining - 1, timerRunning: prevState.timerRunning };
      });
    }, 1000);
  };

  pauseTimer = () => {
    this.setState({ timerRunning: false });
    this.stopTimer();
  };

  resetTimer = () => {
    this.initTimerForStep();
  };

  stopTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  };

  formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  render() {
    const { selectedRecipe, servings, cookingModeActive, currentStepIndex, timerSecondsRemaining, timerRunning } = this.state;

    return (
      <section id="chef-recipes" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {!cookingModeActive && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f5f5] border border-[#ece6de] text-[#4a6b6b] text-xs font-mono font-bold mb-4 uppercase tracking-widest">
              <BookOpen className="h-3 w-3" /> Nautilus Culinary Atelier
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2c3e3e] font-bold tracking-tight mb-4">
              Traditional Ghanaian Fish Secrets
            </h2>
            <p className="text-[#8a817c] text-lg leading-relaxed">
              Achieve professional culinary standards at home with our step-by-step master guides using fresh marine catch, scaled dynamically for your family.
            </p>
          </div>
        )}

        {!cookingModeActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-[#ece6de] rounded-2xl p-5 shadow-sm">
                <h3 className="font-serif text-lg text-[#4a6b6b] font-bold mb-4 uppercase tracking-wider">
                  Ocean Recipes
                </h3>
                <div className="space-y-3">
                  {RECIPES.map((recipe) => {
                    const isSelected = selectedRecipe.id === recipe.id;
                    return (
                      <button
                        key={recipe.id}
                        id={`recipe-selector-${recipe.id}`}
                        onClick={() => this.handleSelectRecipe(recipe)}
                        className={`w-full flex gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#f1f5f5] border-[#4a6b6b] shadow-sm'
                            : 'bg-white border-[#ece6de] hover:border-[#4a6b6b] text-[#8a817c] hover:text-[#4a6b6b]'
                        }`}
                      >
                        <img 
                          src={recipe.imageUrl} 
                          alt={recipe.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-lg object-cover border border-[#ece6de] shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-[#2c3e3e]' : 'text-gray-700'}`}>
                            {recipe.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-[#8a817c] font-mono">
                            <span className="flex items-center gap-0.5">
                              <Clock className="h-3 w-3" /> {recipe.prepTime + recipe.cookTime} min
                            </span>
                            <span className="text-[#4a6b6b] font-semibold">• {recipe.difficulty}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white border border-[#ece6de] rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-xl border border-[#ece6de] mb-6 bg-[#f9f7f4]">
                <img 
                  src={selectedRecipe.imageUrl} 
                  alt={selectedRecipe.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono text-[#4a6b6b] uppercase tracking-wider block bg-white px-2 py-0.5 rounded w-fit mb-1 border border-[#ece6de] shadow-sm">
                      Chef Masterclass
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2c3e3e] font-bold leading-tight">
                      {selectedRecipe.name}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-[#8a817c] text-sm leading-relaxed mb-6">
                {selectedRecipe.description}
              </p>

              <div className="grid grid-cols-3 gap-4 border-y border-[#ece6de] py-4 mb-6 text-center">
                <div>
                  <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Prep duration</span>
                  <span className="text-base font-semibold text-[#2c3e3e] mt-1 block">{selectedRecipe.prepTime} mins</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Cooking duration</span>
                  <span className="text-base font-semibold text-[#2c3e3e] mt-1 block">{selectedRecipe.cookTime} mins</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8a817c] block uppercase">Complexity</span>
                  <span className="text-base font-semibold text-[#4a6b6b] mt-1 block">{selectedRecipe.difficulty}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-lg text-[#4a6b6b] font-bold uppercase tracking-wider">
                    Culinary Ingredients
                  </h4>
                  <div className="flex items-center gap-3 bg-[#fcfaf7] px-3 py-1.5 rounded-xl border border-[#ece6de]">
                    <span className="text-xs text-[#8a817c] font-mono flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> Servings:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        id="dec-servings-btn"
                        onClick={() => this.adjustServings(-1)}
                        className="h-5 w-5 bg-white hover:bg-[#edeae6] rounded border border-[#ece6de] text-xs font-bold text-gray-600 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono text-[#2c3e3e] font-bold w-4 text-center">{servings}</span>
                      <button
                        id="inc-servings-btn"
                        onClick={() => this.adjustServings(1)}
                        className="h-5 w-5 bg-white hover:bg-[#edeae6] rounded border border-[#ece6de] text-xs font-bold text-gray-600 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRecipe.ingredients.map((ing, idx) => {
                    const scaledAmount = (ing.baseAmount / 2) * servings;
                    return (
                      <div key={idx} className="flex justify-between items-center bg-[#fcfaf7] p-3 rounded-xl border border-[#ece6de]">
                        <span className="text-xs text-[#2c3e3e]">{ing.name}</span>
                        <span className="text-xs font-mono text-[#4a6b6b] font-bold">
                          {scaledAmount % 1 === 0 ? scaledAmount : scaledAmount.toFixed(1)} {ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                id="start-cooking-btn"
                onClick={this.startCookingMode}
                className="w-full py-3 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Flame className="h-4 w-4 text-orange-400" /> Start Cooking Assistant
              </button>
            </div>
          </div>
        ) : (
          <div id="immersive-cooking-panel" className="bg-white border border-[#ece6de] rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto relative shadow-sm animate-fadeIn">
            <div className="flex justify-between items-center border-b border-[#ece6de] pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Flame className="h-5 w-5 text-orange-400 animate-pulse" />
                <span className="text-xs font-mono text-[#4a6b6b] font-bold uppercase tracking-widest">
                  Atelier Cooking Assistant
                </span>
              </div>
              <button
                id="exit-cooking-mode"
                onClick={this.exitCookingMode}
                className="text-xs font-mono text-[#8a817c] hover:text-[#4a6b6b] px-3 py-1 bg-[#fcfaf7] rounded-lg border border-[#ece6de] transition-all cursor-pointer"
              >
                Exit Assistant
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-[#8a817c] font-mono">
                <span>RECIPE: {selectedRecipe.name.toUpperCase()}</span>
                <span>STEP {currentStepIndex + 1} OF {selectedRecipe.instructions.length}</span>
              </div>

              <div className="bg-[#fcfaf7] p-6 sm:p-8 rounded-2xl border border-[#ece6de] min-h-[160px] flex items-center relative overflow-hidden">
                <div className="absolute top-2 left-3 text-[100px] text-[#4a6b6b]/5 font-serif select-none pointer-events-none font-bold">
                  {currentStepIndex + 1}
                </div>
                <p className="text-lg sm:text-xl text-[#2c3e3e] font-serif leading-relaxed relative z-10">
                  {selectedRecipe.instructions[currentStepIndex]}
                </p>
              </div>

              {timerSecondsRemaining > 0 ? (
                <div className="bg-[#fcfaf7] border border-[#ece6de] p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Timer className="h-7 w-7 text-[#4a6b6b] animate-pulse" />
                    <div>
                      <span className="text-[10px] font-mono text-[#8a817c] block uppercase">RECOMMENDED INTERVAL TIMER</span>
                      <span className="text-sm text-[#2c3e3e] font-medium">Calibrated for peak seafood consistency.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-mono text-[#4a6b6b] font-bold">
                      {this.formatTime(timerSecondsRemaining)}
                    </span>

                    <div className="flex items-center gap-2">
                      {timerRunning ? (
                        <button
                          id="pause-timer-btn"
                          onClick={this.pauseTimer}
                          className="p-2.5 bg-white border border-[#ece6de] hover:border-[#4a6b6b] rounded-xl text-[#2c3e3e] transition-all cursor-pointer"
                          title="Pause Timer"
                        >
                          <Pause className="h-4.5 w-4.5" />
                        </button>
                      ) : (
                        <button
                          id="play-timer-btn"
                          onClick={this.startTimer}
                          className="p-2.5 bg-[#4a6b6b] hover:bg-[#3d5858] text-white rounded-xl font-bold transition-all cursor-pointer"
                          title="Start Timer"
                        >
                          <Play className="h-4.5 w-4.5" fill="currentColor" />
                        </button>
                      )}

                      <button
                        id="reset-timer-btn"
                        onClick={this.resetTimer}
                        className="p-2.5 bg-white border border-[#ece6de] hover:border-[#4a6b6b] rounded-xl text-[#8a817c] hover:text-[#4a6b6b] transition-all cursor-pointer"
                        title="Reset Timer"
                      >
                        <RotateCcw className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                timerSecondsRemaining === 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-center gap-2 text-xs font-mono text-emerald-700">
                    <CheckCircle className="h-5 w-5" /> Recommended step duration completed or not required. Move forward!
                  </div>
                )
              )}

              <div className="flex justify-between items-center pt-4 border-t border-[#ece6de]">
                <button
                  id="prev-step-btn"
                  onClick={this.prevStep}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 bg-white hover:bg-[#fcfaf7] disabled:opacity-30 border border-[#ece6de] rounded-xl text-xs font-semibold text-[#2c3e3e] transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous Step
                </button>

                <div className="text-xs text-[#8a817c] font-mono">
                  {currentStepIndex + 1} / {selectedRecipe.instructions.length}
                </div>

                {currentStepIndex === selectedRecipe.instructions.length - 1 ? (
                  <button
                    id="finish-cooking-btn"
                    onClick={this.exitCookingMode}
                    className="flex items-center gap-1 px-4 py-2 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                  >
                    Finish & Platter <CheckCircle className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    id="next-step-btn"
                    onClick={this.nextStep}
                    className="flex items-center gap-1 px-4 py-2 bg-[#f1f5f5] hover:bg-[#edeae6] border border-[#ece6de] rounded-xl text-xs font-semibold text-[#4a6b6b] transition-all cursor-pointer"
                  >
                    Next Step <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
}

/* =========================================================================
   SUB-COMPONENT 6: CONTACT / BUY & SELL PORTAL
   ========================================================================= */
class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      contactType: 'Buy Seafood (Bulk)',
      fishType: 'Volta Tilapia',
      quantityKg: 50,
      notes: '',
      submitted: false,
      referenceCode: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (!name || !email || !phone) return;

    const refCode = 'CON-GH-' + Math.floor(1000 + Math.random() * 9000);
    this.setState({
      submitted: true,
      referenceCode: refCode
    });
  };

  resetForm = () => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      contactType: 'Buy Seafood (Bulk)',
      fishType: 'Volta Tilapia',
      quantityKg: 50,
      notes: '',
      submitted: false,
      referenceCode: ''
    });
  };

  render() {
    const {
      name,
      email,
      phone,
      contactType,
      fishType,
      quantityKg,
      notes,
      submitted,
      referenceCode
    } = this.state;

    return (
      <section id="reservations-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {!submitted && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f5f5] border border-[#ece6de] text-[#4a6b6b] text-xs font-mono font-bold mb-4 uppercase tracking-widest">
              <CalendarRange className="h-3 w-3" /> Nautilus Ghana Network
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2c3e3e] font-bold tracking-tight mb-4">
              Partner, Buy or Sell Catch
            </h2>
            <p className="text-[#8a817c] text-lg leading-relaxed">
              Are you a local fisherman wanting to sell your fresh catch, or a hotel/wholesaler wishing to buy in bulk? Contact our harbour office in Tema or Takoradi immediately.
            </p>
          </div>
        )}

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#ece6de] rounded-2xl p-5 sm:p-6 shadow-sm">
                <h3 className="font-serif text-lg text-[#4a6b6b] font-bold mb-4 uppercase tracking-wider">
                  Our Fleet & Harbour Docks
                </h3>
                <div className="space-y-4 text-xs text-[#8a817c] leading-relaxed">
                  <div className="flex gap-3">
                    <Ship className="h-5 w-5 text-[#4a6b6b] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2c3e3e] block">M.V. Nyame Nsa & Active Fleet</span>
                      Our deep-sea vessels supply hundreds of tons of Red Snapper, Grouper, and Tuna weekly. We dock at Tema Port and Takoradi Port.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-[#4a6b6b] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2c3e3e] block">Nationwide Delivery Hub</span>
                      Equipped with dynamic cold-chain preservation crates, we ship orders safely to Accra, Kumasi, Takoradi, Tamale, and any location in Ghana.
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Sparkles className="h-5 w-5 text-[#4a6b6b] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#2c3e3e] block">Artisanal Fishers Partnership</span>
                      We buy wild-caught fish from local canoes at guaranteed fair prices, ensuring ethical income for our coastal communities.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#ece6de] rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
                <h3 className="font-serif text-lg text-[#2c3e3e] font-bold mb-4 uppercase tracking-wider">
                  Direct Harbor Offices
                </h3>
                <div className="space-y-3 text-xs text-[#8a817c]">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#4a6b6b]" />
                    <span>Tema Office: +233 (0) 302 991 882</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#4a6b6b]" />
                    <span>Takoradi Office: +233 (0) 312 445 119</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#4a6b6b]" />
                    <span>Inquiries: sales@nautilus-seafood-ghana.com</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={this.handleSubmit} className="lg:col-span-7 bg-white border border-[#ece6de] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-serif text-2xl text-[#2c3e3e] font-bold pb-4 border-b border-[#ece6de]">
                Inquiry Manifest
              </h3>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">I want to...</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Buy Seafood (Bulk)', label: 'Buy Bulk Catch' },
                    { id: 'Sell Seafood', label: 'Sell Fresh Catch' },
                    { id: 'Fleet Partnership', label: 'Vessel / Fleet Info' }
                  ].map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => this.setState({ contactType: option.id })}
                      className={`px-3 py-2 text-xs font-mono font-bold rounded-xl border transition-all duration-200 cursor-pointer ${
                        contactType === option.id
                          ? 'bg-[#4a6b6b] text-white border-[#4a6b6b]'
                          : 'bg-[#fcfaf7] border-[#ece6de] text-[#8a817c]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8a817c] block uppercase">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Kwame Mensah"
                    value={name}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8a817c] block uppercase">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="kwame@example.com"
                    value={email}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-[#8a817c] block uppercase">Phone Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="+233 XX XXX XXXX"
                    value={phone}
                    onChange={this.handleInputChange}
                    className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                  />
                </div>
              </div>

              {(contactType === 'Buy Seafood (Bulk)' || contactType === 'Sell Seafood') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#f7f3ef] pt-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Primary Catch Target</label>
                    <select
                      id="fish-type-select"
                      name="fishType"
                      value={fishType}
                      onChange={this.handleInputChange}
                      className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                    >
                      <option value="Volta Tilapia">Freshwater Volta Tilapia</option>
                      <option value="Red Snapper">Wild Gulf Red Snapper</option>
                      <option value="Cassava Fish">Pristine Cassava Fish</option>
                      <option value="Spiny Lobster">Spiny Lobster</option>
                      <option value="Barracuda">Coastal Barracuda</option>
                      <option value="Atlantic Tuna">Atlantic Yellowfin Tuna</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-[#4a6b6b] block uppercase">Est. Volume (kg)</label>
                    <input
                      id="quantity-kg-input"
                      type="number"
                      name="quantityKg"
                      min="10"
                      value={quantityKg}
                      onChange={this.handleInputChange}
                      className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] font-mono focus:outline-none focus:border-[#4a6b6b]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-[#8a817c] block uppercase">Additional Notes / Fleet Specifications</label>
                <textarea
                  id="contact-notes"
                  name="notes"
                  rows={3}
                  placeholder="e.g. Specify cold-chain storage needs, vessel licensing numbers, docking requests, or other details..."
                  value={notes}
                  onChange={this.handleInputChange}
                  className="w-full bg-white border border-[#ece6de] rounded-xl px-3 py-2 text-sm text-[#2c3e3e] focus:outline-none focus:border-[#4a6b6b]"
                />
              </div>

              <div className="bg-[#fcfaf7] p-4 border border-[#ece6de] rounded-2xl flex items-start gap-2.5 text-xs text-[#8a817c]">
                <MessageSquare className="h-4.5 w-4.5 text-[#4a6b6b] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#2c3e3e] block">Nautilus Professional Dispatch</span>
                  Inquiries are logged in our Port Office and reviewed within 2 hours. Delivery logistics are coordinated nationwide across Ghana.
                </div>
              </div>

              <button
                id="submit-contact-btn"
                type="submit"
                className="w-full py-3 bg-[#4a6b6b] hover:bg-[#3d5858] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                ⚓ Submit Portal Manifest
              </button>
            </form>
          </div>
        ) : (
          <div id="booking-confirmation-panel" className="bg-white border border-[#ece6de] rounded-3xl p-6 sm:p-10 max-w-xl mx-auto text-center space-y-6 shadow-sm animate-fadeIn">
            <div className="h-16 w-16 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <h3 className="font-serif text-3xl text-[#2c3e3e] font-bold leading-tight">
              Inquiry Logged successfully!
            </h3>
            <p className="text-sm text-[#8a817c] max-w-sm mx-auto">
              Your message has been filed in the Harbour Master manifest. A sales representative will call you shortly.
            </p>

            <div className="bg-[#fcfaf7] border border-[#ece6de] p-6 rounded-2xl space-y-4 text-left max-w-sm mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 h-10 w-10 bg-[#4a6b6b]/5 rounded-bl-full flex items-center justify-center text-[#4a6b6b]">
                <ClipboardCheck className="h-4 w-4" />
              </div>

              <div className="border-b border-dashed border-[#ece6de] pb-3 text-center">
                <span className="text-[9px] font-mono text-[#8a817c] uppercase block">PORT AUTHORITY TELEGRAM</span>
                <span className="text-lg font-mono text-[#4a6b6b] font-bold tracking-wider">{referenceCode}</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#8a817c]">NAME:</span>
                  <span className="text-[#2c3e3e] font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a817c]">PHONE:</span>
                  <span className="text-[#2c3e3e] font-medium">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a817c]">INQUIRY:</span>
                  <span className="text-[#2c3e3e] font-medium">{contactType}</span>
                </div>
                {(contactType === 'Buy Seafood (Bulk)' || contactType === 'Sell Seafood') && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[#8a817c]">TARGET FISH:</span>
                      <span className="text-[#2c3e3e] font-medium">{fishType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a817c]">VOLUME:</span>
                      <span className="text-[#2c3e3e] font-medium">{quantityKg} kg</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="text-xs text-[#8a817c] max-w-sm mx-auto bg-[#f1f5f5] p-3.5 rounded-xl border border-[#ece6de] flex items-start gap-2 text-left">
              <AlertCircle className="h-4 w-4 text-[#4a6b6b] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#2c3e3e] block">Important:</span>
                If submitting a licensing or fleet vessel registration, prepare your Ministry of Fisheries documents.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <button
                id="reset-booking-btn"
                onClick={this.resetForm}
                className="px-5 py-2.5 bg-[#4a6b6b] hover:bg-[#3d5858] border border-[#ece6de] rounded-xl text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Submit New Ticket
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

/* =========================================================================
   CORE APPLICATION CONTAINER (MAIN ROUTER & STATE HUB)
   ========================================================================= */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'home',
      cart: [],
      preSelectedCatchCode: null
    };
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  handleAddToCart = (product) => {
    this.setState((prevState) => {
      const existingItem = prevState.cart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: prevState.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        cart: [...prevState.cart, { product, quantity: 1 }]
      };
    });
  };

  handleRemoveFromCart = (productId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item) => item.product.id !== productId)
    }));
  };

  handleUpdateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      this.handleRemoveFromCart(productId);
      return;
    }
    this.setState((prevState) => ({
      cart: prevState.cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  };

  handleClearCart = () => {
    this.setState({ cart: [] });
  };

  renderActiveTab() {
    const { activeTab, cart } = this.state;

    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onNavigateToTab={this.handleTabChange}
          />
        );
      case 'tracker':
        return <FreshTracker />;
      case 'market':
        return (
          <Market
            cart={cart}
            onAddToCart={this.handleAddToCart}
            onRemoveFromCart={this.handleRemoveFromCart}
            onUpdateCartQuantity={this.handleUpdateCartQuantity}
            onClearCart={this.handleClearCart}
            onNavigateToTab={this.handleTabChange}
          />
        );
      case 'recipes':
        return <Recipes />;
      case 'reservations':
        return <Reservations />;
      default:
        return (
          <Home 
            onNavigateToTab={this.handleTabChange}
          />
        );
    }
  }

  render() {
    const { activeTab, cart } = this.state;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
      <div id="nautilus-root" className="min-h-screen flex flex-col bg-ocean-mesh relative">
        <Navbar
          activeTab={activeTab}
          onTabChange={this.handleTabChange}
          cartCount={cartCount}
        />

        <main id="nautilus-main-content" className="flex-grow">
          {this.renderActiveTab()}
        </main>

        <footer id="nautilus-footer" className="bg-ocean-medium border-t border-gold-accent/15 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Anchor className="h-5 w-5 text-gold-accent" />
                <span className="font-serif text-lg tracking-widest text-gold-gradient font-bold uppercase">
                  Nautilus Ghana
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
                Ghana's premium sustainable fish purveyor and vessel fleet operator. We deliver any kind of fresh and marine catch anywhere in Ghana with cold-preserved precision.
              </p>
              <div className="text-[10px] text-gray-500 font-mono">
                COORDINATES: 5.6148° N, 0.0167° W (Tema Harbour, Ghana)
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold-accent uppercase tracking-wider">
                Explore Modules
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-400">
                <li>
                  <button onClick={() => this.handleTabChange('home')} className="hover:text-gold-hover transition-colors cursor-pointer text-left">
                    Home Harbor
                  </button>
                </li>
                <li>
                  <button onClick={() => this.handleTabChange('tracker')} className="hover:text-gold-hover transition-colors cursor-pointer text-left">
                    Vessel Fleet & Harbor Live
                  </button>
                </li>
                <li>
                  <button onClick={() => this.handleTabChange('market')} className="hover:text-gold-hover transition-colors cursor-pointer text-left">
                    Buy Seafood (Ghana Delivery)
                  </button>
                </li>
                <li>
                  <button onClick={() => this.handleTabChange('recipes')} className="hover:text-gold-hover transition-colors cursor-pointer text-left">
                    Ghanaian Fish Recipes
                  </button>
                </li>
                <li>
                  <button onClick={() => this.handleTabChange('reservations')} className="hover:text-gold-hover transition-colors cursor-pointer text-left">
                    Buy & Sell / Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold-accent uppercase tracking-wider">
                Our Fleet & Harbor Docks
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Harbor Master Office: Tema Port / Takoradi Port<br />
                Vessel Calling Sign: VHF Ch 16 (M.V. Nyame Nsa)<br />
                Immediate Inquiries: sales@nautilus-seafood-ghana.com
              </p>
              <span className="text-[10px] text-emerald-600 font-bold block">● Ghana Nationwide Delivery active</span>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-gold-accent uppercase tracking-wider">
                Ghanaian Maritime Pact
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-600">
                  <ShieldAlert className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">100% Traceable National Sourcing</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">
                  All catches are logged with digital tracking codes. Licensed under the Ministry of Fisheries and Aquaculture Development, Ghana.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-gold-accent/10 mt-10 pt-6 text-center text-[10px] text-gray-500 font-mono flex flex-col sm:flex-row justify-between items-center gap-4">
            <span>© 2026 NAUTILUS GHANA SEAFOODS LTD. ALL RIGHTS RESERVED. DELIVERING NATIONWIDE.</span>
            <span className="flex items-center gap-1">
              ⚓ COMMITTED TO SUSTAINABLE GHANAIAN OCEAN INVENTORY
            </span>
          </div>
      </div>
    );
  }
}
