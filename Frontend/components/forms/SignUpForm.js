import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Checkbox, DatePicker, Radio, Select } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../../libs/helper';
import Button from '../myComponents/Button';
import { hideModalSign, changeModalKey } from '../../redux/actions/modal';
import { signedIn } from '../../redux/actions/auth';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;
const dateFormat = 'DD/MM/YYYY';

class SignUp extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.loading) {
      return;
    }
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          birthday: fieldsValue.birthday.format('YYYY-MM-DD'),
        };
        this.setState({ loading: true });
        try {
          const { status, data } = await fetchAsync('auth/signup', {
            method: 'POST',
            body: values,
          });
          if (status === 200) {
            this.props.form.resetFields();
            this.props.hideModalSign();
            this.props.signedIn(data);
            openNotification(NOTIFICTION_SUCCESS, 'create account successfully', 'your account was created. you can use our service now.');
          } else {
            openNotification(NOTIFICTION_ERROR, 'sign up failed', data.error);
          }
        } catch (error) {
          openNotification(NOTIFICTION_ERROR, 'error', error.message);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  checkTerm = (rule, value, callback) => {
    if (!value) {
      callback('Please accept the term of service!');
    } else {
      callback();
    }
  }

  checkMobileNumber = (rule, value, callback) => {
    if (value && !/^[0-9]{10}$/.test(value)) {
      callback('invalid mobile phone number format!');
    } else {
      callback();
    }
  }

  render() {
    const { t, changeModalKey, form: { getFieldDecorator } } = this.props;
    const { loading } = this.state;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '66',
    })(<Select style={{ width: 70 }}><Option value="66">+66</Option></Select>);

    return (
      <React.Fragment>
        <div style={{ textAlign: 'center' }}>
          <p>Already a member <a onClick={() => changeModalKey('signin')}>{t('signIn')}</a></p>
        </div>
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <FormItem
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
            label={t('password')}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Password is required and length is more than 6', min: 6,
              }, {
                validator: this.checkConfirm,
              }],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem
            label={t('confirmPassword')}
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </FormItem>
          <FormItem
            label={t('firstName')}
          >
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label={t('lastName')}
          >
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
            })(<Input />)}
          </FormItem>
          <FormItem
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
            label={t('birthday(Day/Month/Year)')}
          >
            {getFieldDecorator('birthday', {
              rules: [{ type: 'object', required: true, message: 'Please select your birthday!' }],
            })(<DatePicker format={dateFormat} style={{ width: '100%' }} />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: 'Please select your sex!' }],
            })(<Radio.Group>
              <Radio value="male">{t('male')}</Radio>
              <Radio value="female">{t('female')}</Radio>
            </Radio.Group>)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('agreement', {
              rules: [{
                type: 'boolean', required: true,
              }, {
                validator: this.checkTerm,
              }],
              initialValue: false,
              valuePropName: 'checked',
            })(<Checkbox><span className="ant-form-item-required">Accept</span> <a>Terms of Service</a></Checkbox>)}
          </FormItem>
          <FormItem style={{ textAlign: 'center' }}>
            <Button primary center fontWeight="600" type="submit" loading={loading}>
              {t('signUp')}
            </Button>
          </FormItem>
        </Form>
      </React.Fragment>
    );
  }
}

const SignUpForm = Form.create()(SignUp);
const TranslatedSignUpForm = translate(['common'])(SignUpForm);

const mapDispatchToProps = dispatch => ({
  hideModalSign: bindActionCreators(hideModalSign, dispatch),
  changeModalKey: bindActionCreators(changeModalKey, dispatch),
  signedIn: bindActionCreators(signedIn, dispatch),
});

export default connect(null, mapDispatchToProps)(TranslatedSignUpForm);
