'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react';

export interface ResponsiveColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  /** Show as the card title on mobile */
  primary?: boolean;
  /** Show in mobile card body (default: true for first 3 non-primary) */
  hideOnMobile?: boolean;
}

export interface ResponsiveAction<T> {
  label: string;
  onClick: (row: T) => void;
  color?: string;
  /** Show inline on desktop, in kebab menu on mobile */
}

interface ResponsiveTableProps<T extends Record<string, unknown>> {
  columns: ResponsiveColumn<T>[];
  data: T[];
  actions?: ResponsiveAction<T>[];
  keyField?: string;
  loading?: boolean;
  emptyMessage?: string;
  primaryColor?: string;
}

export function ResponsiveTable<T extends Record<string, unknown>>({
  columns,
  data,
  actions,
  keyField = 'id',
  loading = false,
  emptyMessage = 'No data found.',
  primaryColor = 'var(--tenant-primary)',
}: ResponsiveTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const toggleExpand = (i: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const primaryCol = columns.find(c => c.primary) ?? columns[0];
  const bodyColsMobile = columns.filter(c => !c.primary && !c.hideOnMobile).slice(0, 3);

  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ height: 48, backgroundColor: '#F1F5F9', borderRadius: 8, marginBottom: 10, animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* ─── Desktop/Tablet: standard table ─────────────────── */}
      <div className="hidden sm:block table-container">
        <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC' }}>
              {columns.map(col => (
                <th
                  key={col.key}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  {col.header}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th style={{ padding: '10px 16px', width: 120 }} />
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  style={{ padding: '48px 16px', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={String(row[keyField] ?? i)}
                  style={{ borderBottom: '1px solid #F1F5F9' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '12px 16px', color: '#374151', verticalAlign: 'middle' }}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        {actions.map(action => (
                          <button
                            key={action.label}
                            onClick={() => action.onClick(row)}
                            style={{
                              padding: '5px 12px',
                              borderRadius: 6,
                              border: `1px solid ${action.color || primaryColor}`,
                              color: action.color || primaryColor,
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Mobile: card list ───────────────────────────────── */}
      <div className="sm:hidden" style={{ padding: '8px 0' }}>
        {data.length === 0 ? (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
            {emptyMessage}
          </div>
        ) : (
          data.map((row, i) => {
            const expanded = expandedRows.has(i);
            const menuOpen = openMenu === i;
            return (
              <div
                key={String(row[keyField] ?? i)}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  marginBottom: 10,
                  overflow: 'hidden',
                }}
              >
                {/* Card header row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 14px',
                    gap: 8,
                  }}
                >
                  {/* Primary field */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {primaryCol.render ? primaryCol.render(row) : String(row[primaryCol.key] ?? '')}
                    </div>
                    {/* First body column as subtitle */}
                    {bodyColsMobile[0] && (
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                        {bodyColsMobile[0].render ? bodyColsMobile[0].render(row) : String(row[bodyColsMobile[0].key] ?? '')}
                      </div>
                    )}
                  </div>

                  {/* Right side: actions kebab + expand */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    {actions && actions.length > 0 && (
                      <div style={{ position: 'relative' }}>
                        <button
                          onClick={() => setOpenMenu(menuOpen ? null : i)}
                          style={{
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: 6,
                            color: '#64748B',
                          }}
                          aria-label="Actions"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {menuOpen && (
                          <div
                            style={{
                              position: 'absolute',
                              right: 0,
                              top: 40,
                              backgroundColor: 'white',
                              borderRadius: 10,
                              border: '1px solid #E2E8F0',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                              zIndex: 100,
                              minWidth: 140,
                              overflow: 'hidden',
                            }}
                          >
                            {actions.map(action => (
                              <button
                                key={action.label}
                                onClick={() => { action.onClick(row); setOpenMenu(null); }}
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  padding: '11px 16px',
                                  textAlign: 'left',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  fontSize: 14,
                                  color: action.color || primaryColor,
                                  fontWeight: 500,
                                }}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {/* Expand toggle if there are more fields */}
                    {bodyColsMobile.length > 1 && (
                      <button
                        onClick={() => toggleExpand(i)}
                        style={{
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          borderRadius: 6,
                          color: '#94A3B8',
                        }}
                        aria-label={expanded ? 'Collapse' : 'Expand'}
                      >
                        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {expanded && bodyColsMobile.slice(1).length > 0 && (
                  <div
                    style={{
                      borderTop: '1px solid #F1F5F9',
                      padding: '10px 14px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 10,
                    }}
                  >
                    {bodyColsMobile.slice(1).map(col => (
                      <div key={col.key}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
                          {col.header}
                        </div>
                        <div style={{ fontSize: 13, color: '#374151' }}>
                          {col.render ? col.render(row) : String(row[col.key] ?? '')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
