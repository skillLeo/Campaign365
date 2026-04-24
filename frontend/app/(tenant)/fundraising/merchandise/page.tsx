'use client';
import { useState } from 'react';

const PRODUCTS = [
  { id: 1,  name: 'Red Wave T-Shirt', price: '$25.00', bg: 'linear-gradient(135deg,#1a0808 0%,#3d0a0a 50%,#1a0808 100%)', accent: '#DC143C', sold: false },
  { id: 2,  name: 'Unity Cap',        price: '$15.00', bg: 'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 50%,#0a0a0a 100%)', accent: '#ffffff', sold: false },
  { id: 3,  name: 'Victory Flag',     price: '$10.00', bg: 'linear-gradient(135deg,#050a1a 0%,#0a1530 50%,#050a1a 100%)', accent: '#3B82F6', sold: false },
  { id: 4,  name: 'Victory Flag',     price: '$30.00', bg: 'linear-gradient(135deg,#050a1a 0%,#0d1f3c 50%,#050a1a 100%)', accent: '#60A5FA', sold: false },
  { id: 5,  name: 'Victory Flag',     price: '$25.00', bg: 'linear-gradient(135deg,#1a0a08 0%,#3d1a08 50%,#1a0a08 100%)', accent: '#F97316', sold: true  },
  { id: 6,  name: 'Victory Flag',     price: '$20.00', bg: 'linear-gradient(135deg,#0a0a08 0%,#1a1a10 50%,#0a0a08 100%)', accent: '#EAB308', sold: false },
  { id: 7,  name: 'Red Wave T-Shirt', price: '$25.00', bg: 'linear-gradient(135deg,#1a0808 0%,#2d0606 50%,#1a0808 100%)', accent: '#DC143C', sold: false },
  { id: 8,  name: 'Victory Flag',     price: '$15.00', bg: 'linear-gradient(135deg,#080a08 0%,#101810 50%,#080a08 100%)', accent: '#4ADE80', sold: false },
];

function ProductImage({ bg, accent, name }: { bg: string; accent: string; name: string }) {
  const isShirt = name.includes('T-Shirt') || name.includes('Cap');
  const isFlag  = name.includes('Flag');

  return (
    <div style={{
      height: 130, background: bg, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Glow burst */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 40%, ${accent}33 0%, transparent 65%)`,
      }} />
      {/* Product visual */}
      {isShirt && (
        <svg viewBox="0 0 80 70" width="68" height="60" style={{ position: 'relative', zIndex: 1 }}>
          {/* T-shirt shape */}
          <path d="M20,8 L10,20 L20,24 L20,62 L60,62 L60,24 L70,20 L60,8 L48,16 Q40,20 32,16 Z"
            fill={accent === '#ffffff' ? '#222' : accent} opacity="0.9" />
          {/* Collar */}
          <path d="M32,16 Q40,24 48,16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          {/* SKNLP text */}
          <text x="40" y="42" textAnchor="middle" fill="white" fontSize="8" fontWeight="900">SKNLP</text>
          {/* Shine */}
          <path d="M24,14 L26,50" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {isFlag && !isShirt && (
        <svg viewBox="0 0 30 20" width="65" height="45" style={{ position: 'relative', zIndex: 1, borderRadius: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
          <polygon points="0,20 30,20 0,0" fill="#009E60" />
          <polygon points="30,0 30,20 0,0" fill="#CE1126" />
          <polygon points="0,0 3,0 30,17 27,20 0,20" fill="#000" />
          <polygon points="3,0 6,0 30,14 30,17" fill="#FCD116" />
          <polygon points="0,17 0,20 3,20 27,3 24,0" fill="#FCD116" />
          <text x="15" y="12" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="4" fontWeight="800">SKNLP</text>
        </svg>
      )}
      {!isShirt && !isFlag && (
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${accent}, rgba(0,0,0,0.5))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 20, fontWeight: 900,
          position: 'relative', zIndex: 1,
        }}>S</div>
      )}
    </div>
  );
}

function ProductCard({ p, onSold }: { p: typeof PRODUCTS[0]; onSold: (id: number) => void }) {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      background: '#0f1824', border: '1px solid rgba(255,255,255,0.07)',
    }}>
      <ProductImage bg={p.bg} accent={p.accent} name={p.name} />
      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, margin: '0 0 2px' }}>{p.name}</p>
        <p style={{ color: '#64748B', fontSize: 12, margin: '0 0 8px' }}>{p.price}</p>
        <button
          onClick={() => onSold(p.id)}
          style={{
            width: '100%',
            background: p.sold ? '#166534' : '#DC143C',
            color: 'white', border: 'none', borderRadius: 6,
            padding: '7px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >{p.sold ? '✓ Sold' : 'Mark as Sold'}</button>
      </div>
    </div>
  );
}

export default function MerchandisePage() {
  const [products, setProducts] = useState(PRODUCTS);

  const handleSold = (id: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, sold: !p.sold } : p));
  };

  return (
    <div style={{ backgroundColor: '#080E1C', minHeight: '100vh', fontFamily: "'Inter',sans-serif" }}>

      {/* Tropical palm tree header bg */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg,#050d1a 0%,#0a1628 60%,#050d1a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Palm silhouettes */}
        <div style={{ position: 'absolute', right: 0, top: 0, opacity: 0.35 }}>
          <svg width="200" height="80" viewBox="0 0 200 80">
            <path d="M160,80 Q158,55 162,38 Q165,25 168,18" stroke="#1a4a10" strokeWidth="5" fill="none" />
            <path d="M168,18 Q148,5 128,2 Q148,12 152,24" fill="#1a5e10" />
            <path d="M168,18 Q152,0 140,-8 Q160,5 162,18" fill="#228b22" />
            <path d="M168,18 Q185,-2 198,-6 Q180,8 174,18" fill="#1a5e10" />
          </svg>
        </div>

        {/* Top nav bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          padding: '10px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 30 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'linear-gradient(135deg,#DC143C,#7C1010)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 20 20" width="20" height="20">
                <path d="M10,2 L14,8 L20,8 L15,13 L17,20 L10,16 L3,20 L5,13 L0,8 L6,8 Z" fill="white" opacity="0.9" />
              </svg>
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 8, fontWeight: 700, margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>CAMPAIGN NELS</p>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 900, margin: 0 }}>SKNLP</p>
            </div>
          </div>
          {/* Nav links */}
          {['Home', 'Campaigns ▾', 'Store', 'Reports', 'Settings ▾'].map((n, i) => (
            <button key={i} style={{
              background: 'none', border: 'none', color: n === 'Store' ? '#E2E8F0' : '#64748B',
              fontSize: 13, fontWeight: n === 'Store' ? 700 : 500, cursor: 'pointer',
              padding: '6px 14px', fontFamily: 'inherit',
              borderBottom: n === 'Store' ? '2px solid #DC143C' : '2px solid transparent',
            }}>{n}</button>
          ))}
          {/* Search */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '6px 12px' }}>
            <span style={{ color: '#475569', fontSize: 13 }}>🔍 Search dashboard...</span>
          </div>
        </div>

        <div style={{ padding: '12px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <h1 style={{ color: '#DC143C', fontSize: 22, fontWeight: 900, margin: 0 }}>Campaign Merchandise Store</h1>
          <span style={{ color: '#475569', fontSize: 12 }}>#11E293B</span>
        </div>
      </div>

      <div style={{ padding: '16px 20px' }}>

        {/* 4 stat cards */}
        <div className="rg-4" style={{ gap: 14, marginBottom: 16 }}>

          {/* Total Merch Sales */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Merch Sales</p>
            <p style={{ color: 'white', fontSize: 30, fontWeight: 900, margin: '0 0 3px', lineHeight: 1 }}>$12,840</p>
            <p style={{ color: '#EF4444', fontSize: 11, margin: 0 }}>#EF4444</p>
          </div>

          {/* Items Sold */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Items Sold</p>
            <p style={{ color: 'white', fontSize: 30, fontWeight: 900, margin: '0 0 3px', lineHeight: 1 }}>687</p>
            <p style={{ color: '#EF4444', fontSize: 11, margin: 0 }}>#EF4444</p>
          </div>

          {/* Top Seller */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Seller</p>
              <p style={{ color: 'white', fontSize: 13, fontWeight: 700, margin: 0 }}>Red Wave T-Shirt</p>
            </div>
            {/* Mini t-shirt thumbnail */}
            <div style={{
              width: 42, height: 42, borderRadius: 8,
              background: 'linear-gradient(135deg,#3d0a0a,#1a0808)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg viewBox="0 0 40 35" width="32" height="28">
                <path d="M10,4 L5,10 L10,12 L10,31 L30,31 L30,12 L35,10 L30,4 L24,8 Q20,10 16,8 Z" fill="#DC143C" opacity="0.9" />
                <text x="20" y="23" textAnchor="middle" fill="white" fontSize="5" fontWeight="900">SKNLP</text>
              </svg>
            </div>
          </div>

          {/* Inventory Status */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px',
          }}>
            <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Inventory Status</p>
            <p style={{ color: '#E2E8F0', fontSize: 12, margin: '0 0 8px' }}>In Stock: 342 &nbsp; Low Stock: 45</p>
            <button style={{
              background: '#DC143C', color: 'white', border: 'none', borderRadius: 6,
              padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 3px 10px rgba(220,20,60,0.4)',
            }}>Launch New Merch Drop</button>
          </div>
        </div>

        {/* Product grid */}
        <div className="rg-4" style={{ gap: 14 }}>
          {products.map(p => <ProductCard key={p.id} p={p} onSold={handleSold} />)}
        </div>
      </div>
    </div>
  );
}
