import { useState } from 'react'
import LoadingDiagramGraphic from '../components/LoadingDiagramGraphic'

const LoadingTab = ({ formData, updateFormData }) => {
  const [collapsed, setCollapsed] = useState({
    udl: false,
    parallel: false,
    perpendicular: false,
    point: false
  })

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="split-container">
      {/* Left Panel - Form */}
      <div className="left-panel">
        {/* UDL Loading Section */}
        <div className="form-section">
          <div className="section-header">
            <span>UDL Loading</span>
            <button className="collapse-btn" onClick={() => toggleSection('udl')}>
              {collapsed.udl ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.udl && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Imposed:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.imposed}
                  onChange={(e) => updateFormData({ imposed: e.target.value })}
                />
                <span className="form-unit">kN/m²</span>
                <label className="form-label" style={{ marginLeft: '40px' }}>Screed de.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.screedDepth}
                  onChange={(e) => updateFormData({ screedDepth: e.target.value })}
                />
                <span className="form-unit">mm</span>
              </div>
              <div className="form-row">
                <label className="form-label">Ceiling /Serv.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.ceiling}
                  onChange={(e) => updateFormData({ ceiling: e.target.value })}
                />
                <span className="form-unit">kN/m²</span>
                <label className="form-label" style={{ marginLeft: '40px' }}>Screed de.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.screedDensity}
                  onChange={(e) => updateFormData({ screedDensity: e.target.value })}
                />
                <span className="form-unit">kg/m³</span>
              </div>
              <div className="form-row">
                <label className="form-label">Finishes:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.finishes}
                  onChange={(e) => updateFormData({ finishes: e.target.value })}
                />
                <span className="form-unit">kN/m²</span>
              </div>
              <div className="form-row">
                <label className="form-label">Partitions:</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={formData.partitions}
                  onChange={(e) => updateFormData({ partitions: e.target.value })}
                />
                <span className="form-unit">kN/m²</span>
              </div>
            </div>
          )}
        </div>

        {/* Parallel Loading Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Parallel Loading</span>
            <button className="collapse-btn" onClick={() => toggleSection('parallel')}>
              {collapsed.parallel ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.parallel && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Number of parallel load.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue="0"
                  style={{ width: '60px' }}
                />
              </div>
              <table className="loads-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Superimposed dead component</th>
                    <th>Live component (</th>
                    <th>Width (mm)</th>
                    <th>Start distance (m</th>
                    <th>End distance (</th>
                    <th>Thickness of finishes (</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#999' }}>
                      No loads defined
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Perpendicular Loading Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Perpendicular Loading</span>
            <button className="collapse-btn" onClick={() => toggleSection('perpendicular')}>
              {collapsed.perpendicular ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.perpendicular && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Number of perpendicul.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue="0"
                  style={{ width: '60px' }}
                />
              </div>
              <table className="loads-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Superimposed dead component</th>
                    <th>Live component (</th>
                    <th>Width (mm)</th>
                    <th>Thickness of finishes (m</th>
                    <th>Location of load (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: '#999' }}>
                      No loads defined
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Point Loading Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Point Loading</span>
            <button className="collapse-btn" onClick={() => toggleSection('point')}>
              {collapsed.point ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.point && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Number of point loa.:</label>
                <input 
                  type="number" 
                  className="form-input"
                  defaultValue="0"
                  style={{ width: '60px' }}
                />
              </div>
              <table className="loads-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Superimposed dead component</th>
                    <th>Live component (</th>
                    <th>Width (mm)</th>
                    <th>Length (mm)</th>
                    <th>Location of load (m</th>
                    <th>Thickness of finishes (</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#999' }}>
                      No loads defined
                    </td>
                  </tr>
                </tbody>
              </table>
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
          <div className="graphics-title">Loading Diagram</div>
          <div className="graphics-container">
            <LoadingDiagramGraphic formData={formData} />
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
          <div className="info-title">Width of point load:</div>
          <div className="info-content">
            • Width of point load perpendicular to span
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingTab
