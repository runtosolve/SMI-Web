import {
  Card, Collapse, Form, Select, InputNumber, Space, Typography,
  Row, Col, Statistic, Table, Alert
} from 'antd'
import CrossSectionGraphic from '../components/CrossSectionGraphic'
import GeneralArrangementGraphic from '../components/GeneralArrangementGraphic'

const { Text } = Typography
const { Panel } = Collapse

const LABEL_WIDTH = 200

const DesignTab = ({ formData, updateFormData }) => {
  const resultItems = [
    { label: 'Max Unity Factor', value: formData.maxUnityFactor, color: '#1565c0' },
    { label: 'Normal Stage',     value: formData.normalStage,    color: '#2e7d32' },
    { label: 'Serviceability',   value: formData.serviceability, color: '#e65100' },
    { label: 'Fire',             value: formData.fire,           color: '#b71c1c' },
  ]

  const formProps = {
    layout: 'horizontal',
    size: 'small',
    className: 'mui-form',
    labelCol: { style: { width: LABEL_WIDTH, textAlign: 'left' } },
    wrapperCol: { flex: 1 },
    colon: false,
  }

  const deflLimits = [
    { key: '1', condition: 'Construction (no ponding)', span: 180, or: 20 },
    { key: '2', condition: 'Construction stage',        span: 130, or: 30 },
    { key: '3', condition: 'Imposed loads',             span: 350, or: 20 },
    { key: '4', condition: 'Total loads',               span: 250, or: 30 },
  ]

  return (
    <div className="split-container">
      {/* Left Panel */}
      <div className="left-panel">
        <Collapse
          defaultActiveKey={['fire','shear','deflection','partial','vibration']}
          bordered={false}
          className="mui-collapse"
        >
          <Panel header="Fire Design" key="fire" className="panel-red">
            <Form {...formProps}>
              <Form.Item label="Design Method">
                <Select defaultValue="Simple" style={{ width: 110 }}>
                  <Select.Option value="Simple">Simple</Select.Option>
                  <Select.Option value="Advanced">Advanced</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Fire Resistance Period">
                <Space>
                  <Select defaultValue="120" style={{ width: 80 }}>
                    {['60','90','120','180'].map(o => <Select.Option key={o}>{o}</Select.Option>)}
                  </Select>
                  <Text type="secondary">min</Text>
                </Space>
              </Form.Item>
              <Form.Item label="Proportion of Live Load">
                <Space>
                  <InputNumber defaultValue={0} min={0} max={100} style={{ width: 80 }} />
                  <Text type="secondary">%</Text>
                </Space>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Shear Method" key="shear" className="panel-orange">
            <Form {...formProps}>
              <Form.Item label="Design Method">
                <Select defaultValue="m&k" style={{ width: 110 }}>
                  <Select.Option value="m&k">m &amp; k</Select.Option>
                  <Select.Option value="Partial">Partial</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Deflection Limits" key="deflection" className="panel-green">
            <Table
              size="small"
              dataSource={deflLimits}
              pagination={false}
              columns={[
                { title: 'Condition', dataIndex: 'condition', key: 'condition', width: '50%' },
                {
                  title: 'Span / N',
                  dataIndex: 'span',
                  key: 'span',
                  render: v => <InputNumber defaultValue={v} style={{ width: 70 }} size="small" />,
                },
                {
                  title: 'Or (mm)',
                  dataIndex: 'or',
                  key: 'or',
                  render: v => <InputNumber defaultValue={v} style={{ width: 70 }} size="small" />,
                },
              ]}
            />
          </Panel>

          <Panel header="Partial Load Factors" key="partial" className="panel-blue">
            <Form {...formProps}>
              <Form.Item label="Dead Loads">
                <InputNumber defaultValue={1.4} step={0.1} style={{ width: 90 }} />
              </Form.Item>
              <Form.Item label="Imposed Loads">
                <InputNumber defaultValue={1.6} step={0.1} style={{ width: 90 }} />
              </Form.Item>
              <Form.Item label="Super-imposed Dead">
                <InputNumber defaultValue={1.4} step={0.1} style={{ width: 90 }} />
              </Form.Item>
              <Form.Item label="fi">
                <InputNumber defaultValue={0.8} step={0.1} style={{ width: 90 }} />
              </Form.Item>
            </Form>
          </Panel>

          <Panel header="Vibration" key="vibration" className="panel-teal">
            <Form {...formProps}>
              <Form.Item label="Natural Frequency Limit">
                <Space>
                  <InputNumber defaultValue={5} style={{ width: 90 }} />
                  <Text type="secondary">Hz</Text>
                </Space>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>

        {/* Results Summary */}
        <Card size="small" title="Results Summary" style={{ marginTop: 4, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <Row gutter={[16, 12]}>
            {resultItems.map(r => (
              <Col span={12} key={r.label}>
                <Statistic title={r.label} value={r.value} valueStyle={{ color: r.color, fontSize: 20, fontWeight: 700 }} />
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <Card size="small" title="Cross Section" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <div className="graphics-container">
            <CrossSectionGraphic formData={formData} />
          </div>
        </Card>

        <Card size="small" title="General Arrangement" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <div className="graphics-container">
            <GeneralArrangementGraphic formData={formData} />
          </div>
        </Card>

        <Card size="small" title="Errors & Warnings" style={{ marginBottom: 12, borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>
          <Table
            size="small"
            dataSource={[]}
            columns={[
              { title: 'Type', dataIndex: 'type', key: 'type' },
              { title: 'Description', dataIndex: 'desc', key: 'desc' },
            ]}
            locale={{ emptyText: 'No errors or warnings' }}
            pagination={false}
          />
        </Card>

        <Alert
          type="info"
          showIcon
          message="Fire Loading Partial Safety Factor"
          description={
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>Applicable to (0.6 × Q + 1.0 for permanent loads)</li>
              <li>Program default is conservative</li>
              <li>BS5950 permits 0.8 for non-escape stair environments</li>
              <li>BS5950 permits 0.5 for general office environments</li>
            </ul>
          }
        />
      </div>
    </div>
  )
}

export default DesignTab
