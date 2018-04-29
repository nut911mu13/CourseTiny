import { Form, Input, Upload, Icon } from 'antd';
import { translate } from 'react-i18next';
import Button from '../myComponents/Button';
import { fetchAsyncForm } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';


const FormItem = Form.Item;

class AddEducation extends React.Component {
  state = {
    file: null,
    fileList: [],
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        const {
          university,
          facility,
          degree,
        } = fieldsValue;
        const formData = new FormData();
        formData.append('university', university);
        formData.append('facility', facility);
        formData.append('degree', degree);
        formData.append('educationPhoto', this.state.file);
        try {
          const { status, data } = (this.props.title === 'add education')
            ? await fetchAsyncForm(`user/${this.props.userId}/education`, formData)
            : await fetchAsyncForm(`user/${this.props.userId}/education/${this.props.education.id}`,
              formData, 'PATCH');
          if (status === 200) {
            const values = {
              id: data.insertId || this.props.education.id, // for edit mode: we use selected education id
              university,
              facility,
              degree,
            };
            this.props.onSubmit('edu', values);
            this.props.form.resetFields();
            this.setState({ file: null, fileList: [] });
          } else {
            openNotification(NOTIFICTION_ERROR, 'create or update failed', data.error);
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
    const { form: { getFieldDecorator }, t } = this.props;
    const { loading, fileList } = this.state;
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
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <FormItem
            label="มหาวิทยาลัย"
          >
            {getFieldDecorator('university', {
              rules: [{ required: true, message: 'กรุณากรอกชื่อมหาลัย' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="คณะ"
          >
            {getFieldDecorator('facility', {
              rules: [{ required: true, message: 'กรุณากรอกชื่อคณะ' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="ปริญญา"
          >
            {getFieldDecorator('degree', {
              rules: [{ required: true, message: 'กรุณากรอกชื่อปริญญา' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="อัพโหลดหลักฐานการศึกษา"
          >
            {getFieldDecorator('educationProof', {
              rules: [{ required: true, message: 'กรุณาอัพโหลดหลักฐานการศึกษา' }],
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
          <Button primary fullWidth borderRadius="0px" type="submit" loading={loading}>
            <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
            เพิ่มข้อมูล
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

const AddEducationForm = Form.create({
  mapPropsToFields(props) {
    const { education } = props;
    return {
      university: Form.createFormField({
        value: education && education.university,
      }),
      facility: Form.createFormField({
        value: education && education.facility,
      }),
      degree: Form.createFormField({
        value: education && education.degree,
      }),
    };
  },
})(AddEducation);

const TranslatedAddEducationForm = translate(['common'])(AddEducationForm);

export default TranslatedAddEducationForm;
