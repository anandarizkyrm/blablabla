import { useMemo, useState } from 'react'
import './App.css'

function FilterPanel({ groups, defaultValue = {}, onChange }) {
  const initialSelected = useMemo(() => {
    const clone = {}
    for (const g of groups) {
      const fromDefaults = defaultValue[g.key] ?? []
      clone[g.key] = new Set(fromDefaults)
    }
    return clone
  }, [groups, defaultValue])

  const [selected, setSelected] = useState(initialSelected)

  function updateSelected(next) {
    setSelected(next)
    if (onChange) {
      const asArrays = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, Array.from(v)])
      )
      onChange(asArrays)
    }
  }

  function toggleOption(groupKey, optionId) {
    const next = structuredClone(selected)
    if (next[groupKey].has(optionId)) next[groupKey].delete(optionId)
    else next[groupKey].add(optionId)
    updateSelected(next)
  }

  function clearGroup(groupKey) {
    const next = structuredClone(selected)
    next[groupKey].clear()
    updateSelected(next)
  }

  return (
    <div className="card shadow-sm filter-card">
      <div className="card-body">
        {groups.map((group, idx) => {
          const numChecked = selected[group.key]?.size ?? 0
          return (
            <div key={group.key} className={idx > 0 ? 'pt-3 mt-2 border-top' : ''}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="fw-semibold">{group.title}</div>
                <button
                  type="button"
                  className="btn btn-link p-0 clear-link"
                  onClick={() => clearGroup(group.key)}
                  disabled={numChecked === 0}
                >
                  Hapus Filter
                </button>
              </div>

              <div className="d-flex flex-column gap-2">
                {group.options.map(opt => {
                  const inputId = `${group.key}-${opt.id}`
                  const checked = selected[group.key]?.has(opt.id) ?? false
                  return (
                    <div className="form-check d-flex align-items-center gap-2" key={opt.id}>
                      <input
                        className="form-check-input red-check"
                        type="checkbox"
                        id={inputId}
                        checked={checked}
                        onChange={() => toggleOption(group.key, opt.id)}
                      />
                      <label className="form-check-label" htmlFor={inputId}>
                        {opt.label}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GROUPS = [
  {
    key: 'fitur',
    title: 'Fitur:',
    options: [
      { id: 'wuzz', label: 'Wuzz' },
      { id: 'quickbook', label: 'Quickbook' },
      { id: 'ev', label: 'EV Charger' },
    ],
  },
  {
    key: 'jenisLokasi',
    title: 'Jenis Lokasi:',
    options: [
      { id: 'mall', label: 'Mall/Toko' },
      { id: 'office', label: 'Perkantoran' },
      { id: 'apartment', label: 'Apartemen/Perumahan' },
      { id: 'hotel', label: 'Hotel' },
      { id: 'lainnya', label: 'Lainnya' },
    ],
  },
]

function App() {
  const [filters, setFilters] = useState({
    fitur: ['wuzz', 'quickbook'],
    jenisLokasi: ['mall', 'office', 'apartment'],
  })
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-4 d-none d-lg-block">
          <FilterPanel groups={GROUPS} defaultValue={filters} onChange={setFilters} />
        </div>
        <div className="col-12 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h5 m-0">Listing</h1>
            <button className="btn btn-outline-secondary d-lg-none" onClick={() => setIsOverlayOpen(true)}>
              Filter
            </button>
          </div>
          <pre className="bg-light p-3 rounded-2">
            {JSON.stringify(filters, null, 2)}
          </pre>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOverlayOpen && (
        <div className="filter-overlay">
          <div className="filter-overlay__backdrop" onClick={() => setIsOverlayOpen(false)} />
          <div className="filter-overlay__panel">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="fw-semibold">Filter</div>
              <button className="btn btn-link text-danger p-0" onClick={() => setIsOverlayOpen(false)}>Tutup</button>
            </div>
            <FilterPanel groups={GROUPS} defaultValue={filters} onChange={setFilters} />
            <button className="btn btn-danger w-100 mt-3" onClick={() => setIsOverlayOpen(false)}>Terapkan</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
