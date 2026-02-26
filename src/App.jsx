import { useState } from 'react'
import { ConfigProvider, Layout, Tabs, Button, Space, theme } from 'antd'
import {
  FolderOpenOutlined,
  SettingOutlined,
  BarChartOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import './App.css'
import StructureTab from './tabs/StructureTab'
import LoadingTab from './tabs/LoadingTab'
import DesignTab from './tabs/DesignTab'
import ResultsTab from './tabs/ResultsTab'

const { Header, Content } = Layout

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

  const tabItems = [
    { key: 'structure', label: 'Structure' },
    { key: 'loading',   label: 'Loading' },
    { key: 'design',    label: 'Design' },
    { key: 'results',   label: 'Results' },
  ]

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1565c0',
          colorLink: '#1565c0',
          borderRadius: 6,
          fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: 13,
          colorBgContainer: '#ffffff',
          colorBorder: '#e0e0e0',
          colorBgLayout: '#f0f2f5',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        },
        components: {
          Card: {
            boxShadowTertiary: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
          },
          Collapse: {
            borderRadiusLG: 8,
          },
          Table: {
            borderRadius: 8,
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        {/* Header toolbar */}
        <Header
          style={{
            background: '#1565c0',
            borderBottom: 'none',
            padding: '0 20px',
            height: 48,
            lineHeight: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(21,101,192,0.35)',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginRight: 24, letterSpacing: '0.03em' }}>
            SMI Composite Deck Calculator
          </span>
          <Space>
            <Button size="small" icon={<FolderOpenOutlined />} ghost>File</Button>
            <Button size="small" icon={<SettingOutlined />} ghost>Options</Button>
            <Button size="small" icon={<BarChartOutlined />} ghost>Analysis</Button>
            <Button size="small" icon={<QuestionCircleOutlined />} ghost>Help</Button>
          </Space>
        </Header>

        {/* Tab bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', padding: '0 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            style={{ marginBottom: 0 }}
            size="small"
          />
        </div>

        {/* Tab content */}
        <Content style={{ flex: 1, overflow: 'hidden' }}>
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
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
