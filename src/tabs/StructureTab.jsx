import { useState } from 'react'
import CrossSectionGraphic from '../components/CrossSectionGraphic'
import GeneralArrangementGraphic from '../components/GeneralArrangementGraphic'

const StructureTab = ({ formData, updateFormData }) => {
  const [collapsed, setCollapsed] = useState({
    sheeting: false,
    span: false,
    concrete: false,
    mesh: false,
    stud: false,
    bar: false
  })

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="split-container">
      {/* Left Panel - Form */}
      <div className="left-panel">
        {/* Sheeting Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Sheeting</span>
            <button className="collapse-btn" onClick={() => toggleSection('sheeting')}>
              {collapsed.sheeting ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.sheeting && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Profil.:</label>
                <select 
                  className="form-select" 
                  value={formData.profile}
                  onChange={(e) => updateFormData({ profile: e.target.value })}
                >
                  <option>ComFlor 60</option>
                  <option>ComFlor 80</option>
                  <option>WH-38-152</option>
                  <option>2WH-36</option>
                  <option>3WH-36</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Thickn.:</label>
                <select 
                  className="form-select"
                  value={formData.thickness}
                  onChange={(e) => updateFormData({ thickness: e.target.value })}
                >
                  <option>0.75</option>
                  <option>0.90</option>
                  <option>1.0</option>
                  <option>1.2</option>
                </select>
                <span className="form-unit">mm</span>
              </div>
              <div className="form-row">
                <label className="form-label">Gra.:</label>
                <select 
                  className="form-select"
                  value={formData.grade}
                  onChange={(e) => updateFormData({ grade: e.target.value })}
                >
                  <option>S280</option>
                  <option>S350</option>
                  <option>S450</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Span Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Span</span>
            <button className="collapse-btn" onClick={() => toggleSection('span')}>
              {collapsed.span ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.span && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Profile span ty.:</label>
                <select 
                  className="form-select"
                  value={formData.spanType}
                  onChange={(e) => updateFormData({ spanType: e.target.value })}
                >
                  <option>Single</option>
                  <option>Double</option>
                  <option>Triple</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Length sid.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.span1}
                  onChange={(e) => updateFormData({ span1: e.target.value })}
                />
                <span className="form-unit">m</span>
              </div>
              <div className="form-row">
                <label className="form-label">Length sid.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.span2}
                  onChange={(e) => updateFormData({ span2: e.target.value })}
                />
                <span className="form-unit">m</span>
                <label className="form-label" style={{ marginLeft: '20px' }}>Support w.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.supportWidth}
                  onChange={(e) => updateFormData({ supportWidth: e.target.value })}
                />
                <span className="form-unit">m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Deck prop.:</label>
                <select className="form-select">
                  <option>No Props</option>
                  <option>1 Prop</option>
                  <option>2 Props</option>
                </select>
                <label className="form-label" style={{ marginLeft: '20px' }}>Deck prop w:</label>
                <input type="number" className="form-input" defaultValue="100" />
                <span className="form-unit">m..</span>
              </div>
            </div>
          )}
        </div>

        {/* Concrete Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Concrete</span>
            <button className="collapse-btn" onClick={() => toggleSection('concrete')}>
              {collapsed.concrete ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.concrete && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Gra.:</label>
                <select 
                  className="form-select"
                  value={formData.concreteGrade}
                  onChange={(e) => updateFormData({ concreteGrade: e.target.value })}
                >
                  <option>C25</option>
                  <option>C30</option>
                  <option>C35</option>
                  <option>C40</option>
                </select>
                <label className="form-label" style={{ marginLeft: '20px' }}>Slab dept.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.slabDepth}
                  onChange={(e) => updateFormData({ slabDepth: e.target.value })}
                />
                <span className="form-unit">mm</span>
              </div>
              <div className="form-row">
                <label className="form-label">Type:</label>
                <select 
                  className="form-select"
                  value={formData.concreteType}
                  onChange={(e) => updateFormData({ concreteType: e.target.value })}
                >
                  <option>Normal Wei</option>
                  <option>Lightweight</option>
                </select>
                <label className="form-label" style={{ marginLeft: '20px' }}>Wet dens.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.wetDensity}
                  onChange={(e) => updateFormData({ wetDensity: e.target.value })}
                />
                <span className="form-unit">kg/..</span>
              </div>
              <div className="form-row">
                <label className="form-label"></label>
                <label className="form-label" style={{ marginLeft: '168px' }}>Dry densi.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.dryDensity}
                  onChange={(e) => updateFormData({ dryDensity: e.target.value })}
                />
                <span className="form-unit">kg/..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Auto calculate modular ratio:</label>
                <input type="checkbox" />
                <label className="form-label" style={{ marginLeft: '20px' }}>Modular r.:</label>
                <input type="number" className="form-input" defaultValue="10" />
              </div>
            </div>
          )}
        </div>

        {/* Mesh or Fibre Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Mesh or Fibre</span>
            <button className="collapse-btn" onClick={() => toggleSection('mesh')}>
              {collapsed.mesh ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.mesh && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Mesh or F.:</label>
                <select className="form-select">
                  <option>Mesh</option>
                  <option>Fibre</option>
                  <option>None</option>
                </select>
                <label className="form-label" style={{ marginLeft: '20px' }}>Typ.:</label>
                <select 
                  className="form-select"
                  value={formData.meshType}
                  onChange={(e) => updateFormData({ meshType: e.target.value })}
                >
                  <option>A142</option>
                  <option>A193</option>
                  <option>A252</option>
                  <option>A393</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Cov.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.meshCover}
                  onChange={(e) => updateFormData({ meshCover: e.target.value })}
                />
                <span className="form-unit">mm</span>
                <label className="form-label" style={{ marginLeft: '82px' }}>Yiel.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.meshYield}
                  onChange={(e) => updateFormData({ meshYield: e.target.value })}
                />
                <span className="form-unit">N/m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Lay.:</label>
                <select 
                  className="form-select"
                  value={formData.meshLayer}
                  onChange={(e) => updateFormData({ meshLayer: e.target.value })}
                >
                  <option>Singl</option>
                  <option>Double</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stud Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Stud</span>
            <button className="collapse-btn" onClick={() => toggleSection('stud')}>
              {collapsed.stud ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.stud && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Diamet.:</label>
                <select className="form-select">
                  <option>None</option>
                  <option>12mm</option>
                  <option>16mm</option>
                  <option>19mm</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Accoun.:</label>
                <select className="form-select">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">No. per.:</label>
                <input type="number" className="form-input" defaultValue="" />
              </div>
            </div>
          )}
        </div>

        {/* Bar Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Bar</span>
            <button className="collapse-btn" onClick={() => toggleSection('bar')}>
              {collapsed.bar ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.bar && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Diam.:</label>
                <select className="form-select">
                  <option>None</option>
                  <option>8mm</option>
                  <option>10mm</option>
                  <option>12mm</option>
                  <option>16mm</option>
                  <option>20mm</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Yield:</label>
                <input type="number" className="form-input" defaultValue="460" />
                <span className="form-unit">N/m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Axis distan.:</label>
                <input type="number" className="form-input" defaultValue="30" />
                <span className="form-unit">mm</span>
              </div>
            </div>
          )}
        </div>

        {/* Results Sum */}
        <div className="results-sum">
          <div className="results-grid">
            <div className="result-item">
              <span className="result-value">{formData.maxUnityFactor}</span>
              <span className="result-label">MAX UNITY FACT.:</span>
            </div>
            <div className="result-item">
              <span className="result-value">{formData.maxUnityFactor}</span>
            </div>
          </div>
          <div className="results-grid" style={{ marginTop: '12px' }}>
            <div className="result-item">
              <span className="result-label">NORMAL STAGE:</span>
              <span className="result-value">{formData.normalStage}</span>
            </div>
          </div>
          <div className="results-grid" style={{ marginTop: '8px' }}>
            <div className="result-item">
              <span className="result-value">{formData.serviceability}</span>
            </div>
          </div>
          <div className="results-grid" style={{ marginTop: '8px' }}>
            <div className="result-item">
              <span className="result-label">FIRE:</span>
              <span className="result-value">{formData.fire}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Graphics */}
      <div className="right-panel">
        <div className="graphics-section">
          <div className="graphics-title">Cross Section</div>
          <div className="graphics-container">
            <CrossSectionGraphic formData={formData} />
          </div>
        </div>

        <div className="graphics-section">
          <div className="graphics-title">General Arrangement Graphics</div>
          <div className="graphics-container">
            <GeneralArrangementGraphic formData={formData} />
          </div>
        </div>

        <div className="errors-section">
          <div className="graphics-title">Errors & Warnings</div>
          <table className="errors-table">
            <thead>
              <tr>
                <th style={{ width: '40%' }}></th>
                <th style={{ width: '30%' }}></th>
                <th style={{ width: '30%' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="info-section">
          <div className="info-title">Info</div>
          <div className="info-content">
            <strong>Mesh layer:</strong><br />
            • Single layer is recommended, if possible
          </div>
        </div>
      </div>
    </div>
  )
}

export default StructureTab
