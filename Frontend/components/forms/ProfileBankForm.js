import { Form, Input, Select, Icon, Upload, Row, Col } from 'antd';
import { translate } from 'react-i18next';
import Button from '../myComponents/Button';
import FormTemplate from './FormTemplate';
import { fetchAsync, fetchAsyncForm } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;

class ProfileBank extends React.Component {
  state = {
    loading: false,
    file: null,
    fileList: [],
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        const {
          bankId,
          branch,
          accountNo,
        } = fieldsValue;
        const formData = new FormData();
        formData.append('bankId', bankId);
        formData.append('branch', branch);
        formData.append('accountNo', accountNo);
        formData.append('bookPhoto', this.state.file);
        try {
          const { status, data } = await fetchAsyncForm(`user/${this.props.userId}/bank`, formData);
          if (status === 200) {
            this.props.onUpdate(fieldsValue);
            this.setState({ file: null, fileList: [] });
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated your bank');
          } else {
            openNotification(NOTIFICTION_ERROR, 'update failed', data.error);
          }
        } catch (error) {
          openNotification(NOTIFICTION_ERROR, 'error', error.message);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  handleUploadChange = (info) => {
    let { fileList } = info;
    fileList = info.fileList.slice(0, 1);
    this.setState({ fileList });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { loading, fileList } = this.state;
    const formItemLayout = {
      style: {
        marginBottom: '6px',
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const uploadProps = {
      name: 'file',
      onChange: this.handleUploadChange,
      beforeUpload: (file) => {
        this.setState({ file });
        return false;
      },
    };

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormTemplate title="บัญชีการเงิน">
              <FormItem
                {...formItemLayout}
                label="ธนาคาร"
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

              <FormItem
                {...formItemLayout}
                label="สาขา"
              >
                {getFieldDecorator('branch', {
                  rules: [{
                    required: true, message: 'กรุณากรอกสาขา',
                  }],
                })(
                  <Input placeholder="Branch" />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="หมายเลขบัญชี"
              >
                {getFieldDecorator('accountNo', {
                  rules: [{
                    required: true, message: 'กรุณากรอกหมายเลขบัญชี',
                  }],
                })(
                  <Input placeholder="Account number" />
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="ภาพหน้าแรกสมุด"
              >
                {getFieldDecorator('bookPhoto', {
                  rules: [{ required: true, message: 'กรุณาอัพโหลดภาพหน้าแรกของสมุดธนาคาร' }],
                  valuePropName: 'file',
                })(
                  <Upload {...uploadProps} fileList={fileList}>
                    <Button
                      blueBorder
                      borderRadius="5px"
                      borderSize="1px"
                      width="10px"
                      height="3px"
                      type="button"
                    >
                      <Icon type="camera" style={{ fontSize: '20px' }} />&nbsp;
                      Select file
                    </Button>
                  </Upload>)}
              </FormItem>
            </FormTemplate>
          </Row>
          <Row>
            <Col xs={24}>
              <Button primary fullWidth borderRadius="0px" loading={loading} type="submit">
                <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
                อัพเดทข้อมูลการเงิน
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  };
};

const ProfileBankForm = Form.create({
  mapPropsToFields(props) {
    return {
      bankId: Form.createFormField({
        value: props.bankId,
      }),
      branch: Form.createFormField({
        value: props.branch,
      }),
      accountNo: Form.createFormField({
        value: props.accountNo,
      }),
    };
  },
})(ProfileBank);

const TranslatedProfileBankForm = translate(['common'])(ProfileBankForm);

export default TranslatedProfileBankForm;
