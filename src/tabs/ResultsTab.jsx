import BendingMomentDiagram from '../components/BendingMomentDiagram'
import ShearDiagram from '../components/ShearDiagram'
import DeflectionDiagram from '../components/DeflectionDiagram'

const ResultsTab = ({ formData }) => {
  return (
    <div className="split-container">
      {/* Left Panel - Results Data */}
      <div className="left-panel">
        <div className="form-section">
          <div className="section-header">
            <span>Analysis Results</span>
          </div>
          <div className="section-content">
            <h3 style={{ marginBottom: '16px', fontSize: '15px' }}>Construction Stage</h3>
            <div className="form-row">
              <label className="form-label">Max Unity Factor:</label>
              <span className="result-value">0.85</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            
            <h3 style={{ marginTop: '20px', marginBottom: '16px', fontSize: '15px' }}>Normal Stage</h3>
            <div className="form-row">
              <label className="form-label">Max Unity Factor:</label>
              <span className="result-value">0.55</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            <div className="form-row">
              <label className="form-label">Shear Resistance:</label>
              <span className="result-value">54.86 kN/m</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            <div className="form-row">
              <label className="form-label">Shear Bond:</label>
              <span className="result-value">39.41 kN/m</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            <div className="form-row">
              <label className="form-label">Bending Moment:</label>
              <span className="result-value">45.93 kNm/m</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            
            <h3 style={{ marginTop: '20px', marginBottom: '16px', fontSize: '15px' }}>Fire Condition</h3>
            <div className="form-row">
              <label className="form-label">Unity Factor:</label>
              <span className="result-value">0.85</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>PASS</span>
            </div>
            <div className="form-row">
              <label className="form-label">Fire Resistance:</label>
              <span className="result-value">120 min</span>
            </div>
            
            <h3 style={{ marginTop: '20px', marginBottom: '16px', fontSize: '15px' }}>Serviceability</h3>
            <div className="form-row">
              <label className="form-label">Deflection Check:</label>
              <span className="result-value">3.7 mm</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>SATISFACTORY</span>
            </div>
            <div className="form-row">
              <label className="form-label">Limit (L/360):</label>
              <span className="result-value">9.9 mm</span>
            </div>
            <div className="form-row">
              <label className="form-label">Total Deflection:</label>
              <span className="result-value">4.2 mm</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>SATISFACTORY</span>
            </div>
            <div className="form-row">
              <label className="form-label">Natural Frequency:</label>
              <span className="result-value">9.93 Hz</span>
              <span style={{ marginLeft: '10px', color: '#4caf50', fontWeight: 'bold' }}>SATISFACTORY</span>
            </div>
            <div className="form-row">
              <label className="form-label">Minimum Required:</label>
              <span className="result-value">&gt; 5.00 Hz</span>
            </div>
          </div>
        </div>

        {/* Results Sum */}
        <div className="results-sum" style={{ marginTop: '20px' }}>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 'bold' }}>Report Summary</h3>
          <div className="form-row">
            <label className="form-label">Construction Stage:</label>
            <span className="result-value" style={{ background: '#4caf50', color: 'white' }}>PASS</span>
          </div>
          <div className="form-row">
            <label className="form-label">Normal Stage:</label>
            <span className="result-value" style={{ background: '#4caf50', color: 'white' }}>PASS</span>
            <label className="form-label" style={{ marginLeft: '20px' }}>Max Unity Factor:</label>
            <span className="result-value">0.55</span>
          </div>
          <div className="form-row">
            <label className="form-label">Serviceability:</label>
            <span className="result-value" style={{ background: '#4caf50', color: 'white' }}>SATISFACTORY</span>
          </div>
          <div className="form-row">
            <label className="form-label">Fire:</label>
            <span className="result-value" style={{ background: '#4caf50', color: 'white' }}>PASS</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Graphics */}
      <div className="right-panel">
        <div className="graphics-section">
          <div className="graphics-title">Bending Moment Diagram</div>
          <div className="graphics-container">
            <BendingMomentDiagram formData={formData} />
          </div>
        </div>

        <div className="graphics-section">
          <div className="graphics-title">Shear Force Diagram</div>
          <div className="graphics-container">
            <ShearDiagram formData={formData} />
          </div>
        </div>

        <div className="graphics-section">
          <div className="graphics-title">Deflection Diagram</div>
          <div className="graphics-container">
            <DeflectionDiagram formData={formData} />
          </div>
        </div>

        <div className="info-section">
          <div className="info-title">*** SECTION ADEQUATE ***</div>
          <div className="info-content" style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            All checks have passed. The section is adequate for the specified loads and conditions.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsTab
