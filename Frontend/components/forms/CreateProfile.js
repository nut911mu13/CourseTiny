import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Input, Select, Upload, Icon, Row, Col, DatePicker, Radio } from 'antd';
import { translate } from 'react-i18next';
import moment from 'moment';
import { URL, API_URL } from '../../configs/app';
import { updateProfilePhoto } from '../../redux/actions/auth';
import Button from '../myComponents/Button';
import FormTemplate from './FormTemplate';
import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class CreateProfile extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        this.setState({ loading: true });
        const values = {
          ...fieldsValue,
          birthday: fieldsValue.birthday.format('YYYY-MM-DD'),
        };
        try {
          const { status, data } = await fetchAsync(`user/${this.props.userId}`, {
            method: 'PATCH',
            body: values,
          });
          if (status === 200) {
            this.props.onUpdate(values);
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated your profile');
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
    if (info.file.status === 'done') {
      this.props.onUpdateProfilePhoto(info.file.response.profilePhoto);
      this.props.updateProfilePhoto(info.file.response.profilePhoto);
    }
  }

  render() {
    const { form: { getFieldDecorator }, t, userId, profilePhoto } = this.props;
    const { loading } = this.state;
    const button = {
      style: {
        margin: '10px 0'
      }
    }
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

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '66',
    })(<Select style={{ width: 70 }}><Option value="66">+66</Option></Select>);

    const uploadProps = {
      name: 'profilePhoto',
      action: `${API_URL}user/${userId}/profile-photo`,
      onChange: this.handleUploadChange,
      showUploadList: false,
    };

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormTemplate title="ข้อมูลส่วนตัว">
              <div className="profile-image" style={{ backgroundImage: `url("${URL}${profilePhoto}")`, backgroundSize: 'cover' }} />
              <div style={{ width: '100%', textAlign: 'center' }}>
                <Upload {...uploadProps}>
                  <Button
                    type="button"
                    blueBorder
                    borderRadius="5px"
                    borderSize="1px"
                    width="10px"
                    style={{ marginTop: '3px', marginBottom: '10px' }}
                  >
                    <Icon type="camera" style={{ fontSize: '20px' }} />&nbsp;
                    เปลี่ยนรูปโปรไฟล์
                  </Button>
                </Upload>
              </div>
              <FormItem
                {...formItemLayout}
                label={t('firstName')}
              >
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
                })(<Input />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={t('lastName')}
              >
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
                })(<Input />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Username"
              >
                {getFieldDecorator('username', {
                  rules: [{
                    required: true, message: 'Please input your Username!'
                  }],
                })(
                  <Input type="text" />
                )}
              </FormItem>

              <Row {...button}>
                <Col xs={18} offset={6}>
                  <Button blueBorder borderRadius="5px" borderSize="1px" width="10px">
                    <Icon type="key" style={{ fontSize: '20px' }} />&nbsp;
                    แก้ไข Password
                              </Button>
                </Col>
              </Row>

              <FormItem
                {...formItemLayout}
                label={t('email')}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(<Input />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={t('mobilePhoneNumber')}
              >
                {getFieldDecorator('mobileNumber', {
              rules: [{ required: true, message: 'Please input your mobile phone number!', whitespace: true }, {
                validator: this.checkMobileNumber,
              }],
              })(<Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder="0891231234"
              />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={t('birthday(Day/Month/Year)')}
              >
                {getFieldDecorator('birthday', {
                  rules: [{ type: 'object', required: true, message: 'Please select your birthday!' }],
                })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="Sex"
              >
                {getFieldDecorator('sex', {
                  rules: [{ required: true, message: 'Please select your sex!' }],
                })(<Radio.Group>
                  <Radio value="male">{t('male')}</Radio>
                  <Radio value="female">{t('female')}</Radio>
                </Radio.Group>)}
              </FormItem>

              <style jsx>{`
                .profile-image {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    background-color: lightgray;
                    margin: 16px auto;
                }
              `}</style>
            </FormTemplate>
          </Row>
          <Row>
            <Col xs={24}>
              <Button primary fullWidth borderRadius="0px" type="submit" loading={loading}>
                <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
                บันทึกข้อมูลโปรไฟล์
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  };
};

const CreateProfileForm = Form.create({
  mapPropsToFields(props) {
    return {
      email: Form.createFormField({
        value: props.email,
      }),
      firstName: Form.createFormField({
        value: props.firstName,
      }),
      lastName: Form.createFormField({
        value: props.lastName,
      }),
      username: Form.createFormField({
        value: props.username,
      }),
      birthday: Form.createFormField({
        value: moment(props.birthday),
      }),
      sex: Form.createFormField({
        value: props.sex,
      }),
      mobileNumber: Form.createFormField({
        value: props.mobileNumber,
      }),
    };
  },
})(CreateProfile);

const TranslatedCreateProfileForm = translate(['common'])(CreateProfileForm);

const mapDispatchToProps = dispatch => ({
  updateProfilePhoto: bindActionCreators(updateProfilePhoto, dispatch),
});

export default connect(null, mapDispatchToProps)(TranslatedCreateProfileForm);
