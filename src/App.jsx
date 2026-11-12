import { useMemo, useState } from 'react';
import './App.css';

const products = [
  {
    id: 'strawberry',
    name: 'Strawberry glaze',
    description: 'Our fluffy classic with real strawberry icing & sprinkles.',
    price: 3.5,
    category: 'Classics',
    tag: 'Bestseller',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=720&q=85',
  },
  {
    id: 'maple',
    name: 'Maple cloud',
    description: 'Pillowy brioche dipped in maple glaze, finished with a little crunch.',
    price: 3.75,
    category: 'Classics',
    tag: 'Staff pick',
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=720&q=85',
  },
  {
    id: 'lemon',
    name: 'Lemon daydream',
    description: 'Bright lemon curd tucked inside a sugar-kissed doughnut.',
    price: 4,
    category: 'Filled',
    tag: 'Seasonal',
    image:
      'https://images.unsplash.com/photo-1533920379810-6bedac961555?auto=format&fit=crop&w=720&q=85',
  },
  {
    id: 'chocolate',
    name: 'Chocolate sprinkle',
    description: 'Deep cocoa glaze, a generous sprinkle party, zero regrets.',
    price: 3.5,
    category: 'Classics',
    tag: '',
    image:
      'https://images.unsplash.com/photo-1583096114844-06ce5a5f2171?auto=format&fit=crop&w=720&q=85',
  },
];

const filters = ['All treats', 'Classics', 'Filled'];

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'bag') {
    return (
      <svg {...common}>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    );
  }

  if (name === 'pin') {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M3 12h18M12 3v18" />
    </svg>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All treats');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts =
    activeFilter === 'All treats'
      ? products
      : products.filter((product) => product.category === activeFilter);
  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  );
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const updateQuantity = (id, change) => {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[id] || 0) + change;
      const nextCart = { ...currentCart };
      if (nextQuantity <= 0) {
        delete nextCart[id];
      } else {
        nextCart[id] = nextQuantity;
      }
      return nextCart;
    });
  };

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>GOOD MORNING, NEIGHBOR!</span>
        <span>Fresh batches daily · 7am until we sell out</span>
        <a href="#visit">Come say hi <Icon name="arrow" size={14} /></a>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Daisy's Donuts home">
          <span className="wordmark-flower" aria-hidden="true">✿</span>
          <span>DAISY’S<span className="wordmark-small">DONUTS & COFFEE</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#menu">The menu</a>
          <a href="#story">Our little story</a>
          <a href="#visit">Find us</a>
        </nav>
        <button
          className="cart-button"
          onClick={() => setCartOpen((open) => !open)}
          aria-expanded={cartOpen}
          aria-label={`Open bag, ${itemCount} items`}
        >
          <Icon name="bag" size={19} />
          <span>Your bag</span>
          <span className="cart-count">{itemCount}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> SMALL BATCH. BIG JOY.</p>
            <h1>A little<br />hole lot of <span>happy.</span></h1>
            <p className="hero-description">
              Hand-cut, hand-glazed, and made with love right here in the neighborhood.
              Your morning just got sweeter.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">Explore the menu <Icon name="arrow" size={17} /></a>
              <span className="hero-note">Baked fresh, every single day <span>♡</span></span>
            </div>
            <div className="hero-footnote">
              <span className="footnote-line" />
              <span>Est. 2018 · Portland, Oregon</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1300&q=90"
                alt="Pink strawberry-glazed doughnut topped with colorful sprinkles"
              />
            </div>
            <div className="hero-sticker">
              <span>made with</span>
              <strong>♡</strong>
              <span>in portland</span>
            </div>
            <div className="hero-caption"><span>01</span> THE STRAWBERRY GLAZE</div>
          </div>
          <div className="hero-scroll" aria-hidden="true"><span /> SCROLL FOR THE GOOD STUFF</div>
        </section>

        <section className="ticker" aria-label="Our promise">
          <div>HAND-ROLLED WITH LOVE <span>✳</span> REAL, SIMPLE INGREDIENTS <span>✳</span> ALWAYS FRESH, NEVER FROZEN <span>✳</span> MADE FOR SHARING <span>✳</span></div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE GOOD STUFF</p>
              <h2>Meet your <em>new</em><br />favorite.</h2>
            </div>
            <p className="section-intro">A little something for your coffee, your commute, or just because it’s Tuesday.</p>
          </div>
          <div className="menu-toolbar">
            <div className="filter-list" aria-label="Filter menu">
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter ? 'filter-chip active' : 'filter-chip'}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <span className="menu-count">MADE FRESH THIS MORNING <span>✳</span></span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product, index) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <button
                    className="add-button"
                    onClick={() => updateQuantity(product.id, 1)}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <Icon name="plus" size={20} />
                  </button>
                  <span className="product-number">0{index + 1}</span>
                </div>
                <div className="product-details">
                  <div className="product-title-row">
                    <h3>{product.name}</h3>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <p>{product.description}</p>
                  {cart[product.id] > 0 && (
                    <span className="added-note">In your bag · {cart[product.id]}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a className="menu-link" href="#visit">See what’s in the case today <Icon name="arrow" size={17} /></a>
        </section>

        <section className="story-section" id="story">
          <div className="story-photo">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85"
              alt="Freshly baked pastries cooling in the bakery"
              loading="lazy"
            />
            <span className="photo-caption">OUR KIND OF EARLY MORNING</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">A NEIGHBORHOOD KIND OF PLACE</p>
            <h2>Good things<br />take <em>butter.</em></h2>
            <p>
              Daisy’s started with one tiny kitchen, a very old recipe book, and a
              big idea: make the kind of doughnuts that turn an ordinary day into
              a good one.
            </p>
            <p>
              Still made by hand. Still here before sunrise. Still saving you the
              corner one with extra sprinkles.
            </p>
            <a className="text-link" href="#visit">A little more about us <Icon name="arrow" size={17} /></a>
            <span className="story-doodle" aria-hidden="true">✿</span>
          </div>
        </section>

        <section className="visit-section section-wrap" id="visit">
          <div>
            <p className="eyebrow">COME ON OVER</p>
            <h2>Your corner<br />of <em>the world.</em></h2>
          </div>
          <div className="visit-details">
            <div className="visit-address">
              <Icon name="pin" size={21} />
              <p><strong>28 SE Maple Street</strong><br />Portland, OR 97214</p>
            </div>
            <div className="visit-hours">
              <span>MON–FRI</span><strong>7am — 2pm</strong>
              <span>SAT–SUN</span><strong>8am — 3pm</strong>
            </div>
            <a className="button button-dark" href="https://maps.google.com/?q=28+SE+Maple+Street+Portland+OR" target="_blank" rel="noreferrer">
              Get directions <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="visit-note">There’s always room<br />for one more. <span>♡</span></div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#home">
          <span className="wordmark-flower" aria-hidden="true">✿</span>
          <span>DAISY’S<span className="wordmark-small">DONUTS & COFFEE</span></span>
        </a>
        <span>MADE FRESH IN PORTLAND, OR · SINCE 2018</span>
        <a href="mailto:hello@daisysdonuts.example">Say hello <Icon name="arrow" size={15} /></a>
      </footer>

      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-panel"
            aria-label="Your bag"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-heading">
              <div><p className="eyebrow">THE GOOD STUFF</p><h2>Your bag <span>({itemCount})</span></h2></div>
              <button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button>
            </div>
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <span>✿</span>
                <p>Your bag’s looking a little lonely.</p>
                <button className="text-link" onClick={() => setCartOpen(false)}>Find something sweet <Icon name="arrow" size={17} /></button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt="" />
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>${item.price.toFixed(2)}</span>
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
                <p className="pickup-note">Pickup at Daisy’s · Pay when you get here</p>
                <a className="button button-dark checkout-button" href="#visit" onClick={() => setCartOpen(false)}>
                  Plan your pickup <Icon name="arrow" size={17} />
                </a>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
