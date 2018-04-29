import { Row, Col, Form, Input, Select, Upload, TimePicker, Icon, DatePicker, Tooltip } from 'antd';
import { translate } from 'react-i18next'
import Button from '../myComponents/Button';
import FormTemplate from './FormTemplate';
import { fetchAsync } from '../../libs/helper';
import Modal from '../Modal';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class ModalTransfer extends React.Component {
    render(){
        const { form: { getFieldDecorator }, t, userId, profilePhoto } = this.props;

        const { border, noRadius, bottomButton } = this.props;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+66',
        })(
            <Select style={{ width: 70 }}>
            <Option value="55">+55</Option>
            <Option value="00">+00</Option>
            </Select>
        );

        const uploadProps = {
            name: 'transferSlip'
        };

        return(
            <React.Fragment>
                <Modal title="อัพโหลดหลัดฐานการโอนเงิน" borderBottom={border} borderRadius={noRadius} bottomButton={bottomButton}>
                    <Row>
                        <Col>
                            <React.Fragment>
                                <Form layout="vertical">

                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <div style={{ display: 'inline-block' }}>
                                            <Upload {...uploadProps}>
                                                <Button
                                                    type="button"
                                                    blueBorder
                                                    borderRadius="5px"
                                                    borderSize="1px"
                                                    width="10px"
                                                    style={{ marginBottom: '20%' }}
                                                >
                                                    <Icon type="camera" style={{ fontSize: '20px' }} />&nbsp;
                                                    เลือกไฟล์
                                                </Button>
                                            </Upload>
                                        </div>
                                        <div style={{
                                            fontSize: '16px',
                                            marginLeft: '10px',
                                            color: '#999999',
                                            display: 'inline-block',
                                        }}>
                                            <Tooltip title="เลือกไฟล์ภาพหลักฐานการชำระเงิน">
                                                <Icon type="question-circle" />
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <Row gutter={24}>
                                        <Col xs={24} md={12}>
                                            <FormItem
                                                label={t('Transfer date')}
                                            >
                                                {getFieldDecorator('transferDate', {
                                                    rules: [{ type: 'object', required: true, message: 'Please select your transfer date!' }],
                                                })(<DatePicker style={{ width: '100%' }} />)}
                                            </FormItem>
                                        </Col>

                                        <Col xs={24} md={12}>
                                            <FormItem
                                                label={t('Time')}
                                            >
                                                {getFieldDecorator('time', {
                                                    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
                                                })(<TimePicker style={{ width: '100%' }} />)}
                                            </FormItem>
                                        </Col>

                                        <Col xs={24}>
                                            <div className="hr" style={{ marginBottom: '24px' }}/>
                                        </Col>

                                        <Col xs={24}>
                                            <FormItem
                                                label={t('Bank')}
                                            >
                                                {getFieldDecorator('bankId', {
                                                    rules: [{
                                                        required: true, message: 'กรุณาเลือกธนาคาร',
                                                    }],
                                                })(
                                                <Select>
                                                    <Option value={1}>กรุงไทย</Option>
                                                    <Option value={2}>กสิกร</Option>
                                                    <Option value={3}>กรุงศรี</Option>
                                                </Select>
                                                )}
                                            </FormItem>
                                        </Col>

                                    </Row>
                                </Form>

                                <style jsx>{`
                                    body {
                                        font-family: prompt;
                                    }
                                    .ticket-head-text {
                                        color: #29AAE3;
                                        font-weight: 400;
                                        margin-bottom: 10px;
                                    }
                                `}</style>
                            </React.Fragment>
                        </Col>
                    </Row>
                </Modal>
            </React.Fragment>

        );
    };
};

const ModalTransferForm = Form.create()(ModalTransfer);

const TranslatedModalTransferForm = translate(['common'])(ModalTransferForm);

export default TranslatedModalTransferForm;

