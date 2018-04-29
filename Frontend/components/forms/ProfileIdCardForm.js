import { Row, Col, Form, Input, Select, Upload, Icon } from 'antd';
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
const { TextArea } = Input;
const { Option } = Select;

class ProfileIdCard extends React.Component {
  state = {
    loading: false,
    nameTitles: [],
    maritalStatus: [],
    file: null,
    fileList: [],
  }
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const { status, data: { nameTitles, maritalStatus } } = await fetchAsync('forms/idcard', { method: 'GET' });
      if (status === 200) {
        this.setState({ nameTitles, maritalStatus });
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        const {
          number,
          titleId,
          firstName,
          lastName,
          maritalStatusId,
          currentAddress,
          idCardAddress,
        } = fieldsValue;
        const formData = new FormData();
        formData.append('number', number);
        formData.append('titleId', titleId);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('maritalStatusId', maritalStatusId);
        formData.append('currentAddress', currentAddress);
        formData.append('idCardAddress', idCardAddress);
        formData.append('idCardPhoto', this.state.file);
        try {
          const { status, data } = await fetchAsyncForm(`user/${this.props.userId}/idcard`, formData);
          if (status === 200) {
            this.props.onUpdate(fieldsValue);
            this.setState({ file: null, fileList: [] });
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated your id card');
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
    const { loading, nameTitles, maritalStatus, fileList } = this.state;

    const formItemLayout = {
      style: {
        marginBottom: '6px'
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
            <FormTemplate title="บัตรประชาชน">
              <FormItem
                {...formItemLayout}
                label="เลขบัตรประชาชน"
              >
                {getFieldDecorator('number', {
                  rules: [{
                    required: true, message: 'Please input your id',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="คำนำหน้าชื่อ"
              >
                {getFieldDecorator('titleId', {
                  rules: [{
                    required: true, message: 'Please input about me field',
                  }],
                })(
                  <Select>
                    {nameTitles.map(n => (<Option key={n.id} value={n.id}>{n.th}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="ชื่อจริง"
              >
                {getFieldDecorator('firstName', {
                  rules: [{
                    required: true, message: 'Please input your first name',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="นามสกุล"
              >
                {getFieldDecorator('lastName', {
                  rules: [{
                    required: true, message: 'Please input your last name',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="สถานภาพ"
              >
                {getFieldDecorator('maritalStatusId', {
                  rules: [{
                    required: true, message: 'Please input your marital status',
                  }],
                })(
                  <Select>
                    {maritalStatus.map(m => (<Option key={m.id} value={m.id}>{m.th}</Option>))}
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="ที่อยู่ตามบัตรประชาชน"
              >
                {getFieldDecorator('idCardAddress', {
                  rules: [{
                    required: true, message: 'Please input your address in ID card',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="รูปบัตรประชาชน"
              >
                {getFieldDecorator('idCardPhoto', {
                  rules: [{ required: true, message: 'กรุณาอัพโหลดภาพถ่ายบัตรประชาชน' }],
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
              <FormItem
                {...formItemLayout}
                label="ที่อยู่ปัจจุบัน"
              >
                {getFieldDecorator('currentAddress', {
                  rules: [{
                    required: true, message: 'โปรดกรอกที่อยู่ปัจจุบัน',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
            </FormTemplate>
          </Row>
          <Row>
            <Col xs={24}>
              <Button primary fullWidth borderRadius="0px" loading={loading} type="submit">
                <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
                อัพเดทข้อมูลบัตรประชาชน
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const ProfileIdCardForm = Form.create({
  mapPropsToFields(props) {
    return {
      number: Form.createFormField({
        value: props.idCardNumber,
      }),
      titleId: Form.createFormField({
        value: props.idCardTitle,
      }),
      firstName: Form.createFormField({
        value: props.idCardFirstName,
      }),
      lastName: Form.createFormField({
        value: props.idCardLastName,
      }),
      maritalStatusId: Form.createFormField({
        value: props.idCardMaritalStatusId,
      }),
      idCardAddress: Form.createFormField({
        value: props.idCardCurrentAddress,
      }),
      currentAddress: Form.createFormField({
        value: props.idCardAddress,
      }),
    };
  },
})(ProfileIdCard);

const TranslatedProfileIdCardForm = translate(['common'])(ProfileIdCardForm);

export default TranslatedProfileIdCardForm;
