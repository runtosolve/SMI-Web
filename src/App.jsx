import { useState } from 'react'
import './App.css'
import StructureTab from './tabs/StructureTab'
import LoadingTab from './tabs/LoadingTab'
import DesignTab from './tabs/DesignTab'
import ResultsTab from './tabs/ResultsTab'

function App() {
  const [activeTab, setActiveTab] = useState('structure')
  const [formData, setFormData] = useState({
    // Structure data
    profile: 'ComFlor 60',
    thickness: '1.0',
    grade: 'S350',
    spanType: 'Double',
    span1: '3.5',
    span2: '3.5',
    supportWidth: '150',
    concreteGrade: 'C30',
    concreteType: 'Normal Wei',
    slabDepth: '150',
    wetDensity: '2400',
    dryDensity: '2350',
    meshType: 'A393',
    meshCover: '30',
    meshYield: '460',
    meshLayer: 'Singl',
    
    // Loading data
    imposed: '6',
    ceiling: '0.5',
    finishes: '0.5',
    partitions: '1',
    screedDepth: '0',
    screedDensity: '2000',
    parallelLoads: [],
    perpendicularLoads: [],
    pointLoads: [],
    
    // Design data
    fireMethod: 'Simple',
    fireResistance: '120',
    liveLoadProp: '0',
    shearMethod: 'm&k',
    deflectionLimits: {
      constructionNoPonding: { span: '180', or: '20' },
      constructionStage: { span: '130', or: '30' },
      imposedLoads: { span: '350', or: '20' },
      totalLoads: { span: '250', or: '30' }
    },
    partialLoadFactors: {
      dead: '1.4',
      imposed: '1.6',
      superImposed: '1.4',
      fi: '0.8'
    },
    naturalFrequency: '5',
    
    // Results
    maxUnityFactor: '0.85',
    normalStage: '0.55',
    serviceability: '0.5',
    fire: '0.85'
  })

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="app-header">
        <div className="toolbar">
          <button className="toolbar-btn">📁 File</button>
          <button className="toolbar-btn">⚙️ Options</button>
          <button className="toolbar-btn">📊 Analysis</button>
          <button className="toolbar-btn">❓ Help</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'structure' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('structure')}
        >
          Structure
        </button>
        <button 
          className={activeTab === 'loading' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('loading')}
        >
          Loading
        </button>
        <button 
          className={activeTab === 'design' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('design')}
        >
          Design
        </button>
        <button 
          className={activeTab === 'results' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'structure' && (
          <StructureTab formData={formData} updateFormData={updateFormData} />
        )}
        {activeTab === 'loading' && (
          <LoadingTab formData={formData} updateFormData={updateFormData} />
        )}
        {activeTab === 'design' && (
          <DesignTab formData={formData} updateFormData={updateFormData} />
        )}
        {activeTab === 'results' && (
          <ResultsTab formData={formData} />
        )}
      </div>
    </div>
  )
}

export default App
