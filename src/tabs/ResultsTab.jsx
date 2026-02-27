import { Card, Descriptions, Tag, Alert, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import BendingMomentDiagram from '../components/BendingMomentDiagram'
import ShearDiagram from '../components/ShearDiagram'
import DeflectionDiagram from '../components/DeflectionDiagram'

const { Title } = Typography

const PassTag = () => <Tag icon={<CheckCircleOutlined />} color="success">PASS</Tag>
const SatTag = () => <Tag icon={<CheckCircleOutlined />} color="cyan">SATISFACTORY</Tag>

const LABEL_STYLE = { width: 260, minWidth: 260, fontWeight: 500 }
const DESC_PROPS = { column: 1, size: 'small', bordered: true, labelStyle: LABEL_STYLE }

const ResultsTab = ({ formData }) => {
  return (
    <div className="split-container">
      {/* Left Panel */}
      <div className="left-panel">
        <Card size="small" title="Analysis Results" style={{ marginBottom: 16 }}>
          <Title level={5} style={{ marginTop: 0 }}>Construction Stage</Title>
          <Descriptions {...DESC_PROPS}>
            <Descriptions.Item label="Max Unity Factor">
              <span style={{ marginRight: 8 }}>0.85</span><PassTag />
            </Descriptions.Item>
          </Descriptions>

          <Title level={5} style={{ marginTop: 16 }}>Normal Stage</Title>
          <Descriptions {...DESC_PROPS}>
            <Descriptions.Item label="Max Unity Factor">
              <span style={{ marginRight: 8 }}>0.55</span><PassTag />
            </Descriptions.Item>
            <Descriptions.Item label="Shear Resistance">
              <span style={{ marginRight: 8 }}>54.86 kN/m</span><PassTag />
            </Descriptions.Item>
            <Descriptions.Item label="Shear Bond">
              <span style={{ marginRight: 8 }}>39.41 kN/m</span><PassTag />
            </Descriptions.Item>
            <Descriptions.Item label="Bending Moment">
              <span style={{ marginRight: 8 }}>45.93 kNm/m</span><PassTag />
            </Descriptions.Item>
          </Descriptions>

          <Title level={5} style={{ marginTop: 16 }}>Fire Condition</Title>
          <Descriptions {...DESC_PROPS}>
            <Descriptions.Item label="Unity Factor">
              <span style={{ marginRight: 8 }}>0.85</span><PassTag />
            </Descriptions.Item>
            <Descriptions.Item label="Fire Resistance">120 min</Descriptions.Item>
          </Descriptions>

          <Title level={5} style={{ marginTop: 16 }}>Serviceability</Title>
          <Descriptions {...DESC_PROPS}>
            <Descriptions.Item label="Deflection Check">
              <span style={{ marginRight: 8 }}>3.7 mm</span><SatTag />
            </Descriptions.Item>
            <Descriptions.Item label="Limit (L/360)">9.9 mm</Descriptions.Item>
            <Descriptions.Item label="Total Deflection">
              <span style={{ marginRight: 8 }}>4.2 mm</span><SatTag />
            </Descriptions.Item>
            <Descriptions.Item label="Natural Frequency">
              <span style={{ marginRight: 8 }}>9.93 Hz</span><SatTag />
            </Descriptions.Item>
            <Descriptions.Item label="Minimum Required">&gt; 5.00 Hz</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card size="small" title="Report Summary">
          <Descriptions {...DESC_PROPS}>
            <Descriptions.Item label="Construction Stage"><PassTag /></Descriptions.Item>
            <Descriptions.Item label="Normal Stage">
              <PassTag /> <span style={{ marginLeft: 8, color: '#555' }}>Max Unity Factor: 0.55</span>
            </Descriptions.Item>
            <Descriptions.Item label="Serviceability"><SatTag /></Descriptions.Item>
            <Descriptions.Item label="Fire"><PassTag /></Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <Card size="small" title="Bending Moment Diagram" style={{ marginBottom: 16 }}>
          <div className="graphics-container">
            <BendingMomentDiagram formData={formData} />
          </div>
        </Card>

        <Card size="small" title="Shear Force Diagram" style={{ marginBottom: 16 }}>
          <div className="graphics-container">
            <ShearDiagram formData={formData} />
          </div>
        </Card>

        <Card size="small" title="Deflection Diagram" style={{ marginBottom: 16 }}>
          <div className="graphics-container">
            <DeflectionDiagram formData={formData} />
          </div>
        </Card>

        <Alert
          type="success"
          showIcon
          message="Section Adequate"
          description="All checks have passed. The section is adequate for the specified loads and conditions."
        />
      </div>
    </div>
  )
}

export default ResultsTab
