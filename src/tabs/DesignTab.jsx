import { useState } from 'react'
import CrossSectionGraphic from '../components/CrossSectionGraphic'
import GeneralArrangementGraphic from '../components/GeneralArrangementGraphic'

const DesignTab = ({ formData, updateFormData }) => {
  const [collapsed, setCollapsed] = useState({
    fire: false,
    deflection: false,
    partial: false,
    shear: false,
    vibration: false
  })

  const toggleSection = (section) => {
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="split-container">
      {/* Left Panel - Form */}
      <div className="left-panel">
        {/* Fire design Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Fire design</span>
            <button className="collapse-btn" onClick={() => toggleSection('fire')}>
              {collapsed.fire ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.fire && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Design method:</label>
                <select className="form-select">
                  <option>Simple</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Fire resistance p.:</label>
                <select className="form-select">
                  <option>60</option>
                  <option>90</option>
                  <option>120</option>
                  <option>180</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label">Proportion of live.:</label>
                <input type="number" className="form-input" defaultValue="0" />
                <span className="form-unit">%</span>
              </div>
            </div>
          )}
        </div>

        {/* Shear method Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Shear method</span>
            <button className="collapse-btn" onClick={() => toggleSection('shear')}>
              {collapsed.shear ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.shear && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Design met.:</label>
                <select className="form-select">
                  <option>m&k</option>
                  <option>Partial</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Deflection limit Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Deflection limit</span>
            <button className="collapse-btn" onClick={() => toggleSection('deflection')}>
              {collapsed.deflection ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.deflection && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Construction stage(no pon.:</label>
                <span>sp.:</span>
                <input type="number" className="form-input" defaultValue="180" style={{ width: '60px' }} />
                <span>Or</span>
                <input type="number" className="form-input" defaultValue="20" style={{ width: '60px' }} />
                <span className="form-unit">m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Construction stage :</label>
                <span>sp.:</span>
                <input type="number" className="form-input" defaultValue="130" style={{ width: '60px' }} />
                <span>Or</span>
                <input type="number" className="form-input" defaultValue="30" style={{ width: '60px' }} />
                <span className="form-unit">m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Imposed loads :</label>
                <span>sp.:</span>
                <input type="number" className="form-input" defaultValue="350" style={{ width: '60px' }} />
                <span>Or</span>
                <input type="number" className="form-input" defaultValue="20" style={{ width: '60px' }} />
                <span className="form-unit">m..</span>
              </div>
              <div className="form-row">
                <label className="form-label">Total loads:</label>
                <span>sp.:</span>
                <input type="number" className="form-input" defaultValue="250" style={{ width: '60px' }} />
                <span>Or</span>
                <input type="number" className="form-input" defaultValue="30" style={{ width: '60px' }} />
                <span className="form-unit">m..</span>
              </div>
            </div>
          )}
        </div>

        {/* Partial load factors Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Partial load factors</span>
            <button className="collapse-btn" onClick={() => toggleSection('partial')}>
              {collapsed.partial ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.partial && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Dead loads:</label>
                <input type="number" className="form-input" defaultValue="1.4" step="0.1" />
                <label className="form-label" style={{ marginLeft: '20px' }}>Fi.:</label>
                <input type="number" className="form-input" defaultValue="0.8" step="0.1" />
              </div>
              <div className="form-row">
                <label className="form-label">Imposed loads:</label>
                <input type="number" className="form-input" defaultValue="1.6" step="0.1" />
              </div>
              <div className="form-row">
                <label className="form-label">Super imposed dead.:</label>
                <input type="number" className="form-input" defaultValue="1.4" step="0.1" />
              </div>
            </div>
          )}
        </div>

        {/* Vibration Section */}
        <div className="form-section">
          <div className="section-header">
            <span>Vibration</span>
            <button className="collapse-btn" onClick={() => toggleSection('vibration')}>
              {collapsed.vibration ? '▼' : '▲'}
            </button>
          </div>
          {!collapsed.vibration && (
            <div className="section-content">
              <div className="form-row">
                <label className="form-label">Natural frequenc.:</label>
                <input type="number" className="form-input" defaultValue="5" />
                <span className="form-unit">H</span>
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
          <div className="info-title">Fire loading partial safety factor:</div>
          <div className="info-content">
            • Applicable to (0.6 * Q + 1.0 for permanent loads) (1.0 for permanent beds)<br />
            • Program default is conservative<br />
            • For environments other than escape stairs and lobbies BS5950 permits 0.8<br />
            • For general office environments BS5950 permits 0.5
          </div>
        </div>
      </div>
    </div>
  )
}

export default DesignTab
