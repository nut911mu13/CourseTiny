import { Row, Col, Form, Input, Select, Icon } from 'antd';
import { translate } from 'react-i18next'
import Button from '../myComponents/Button';
import FormTemplate from './FormTemplate';
import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

class ProfileBasic extends React.Component {

  state = {
    prefixWebsite: 'https://',
    loading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, fieldvalues) => {
      if (!err) {
        this.setState({ loading: true });
        const values = {
          ...fieldvalues,
          website: fieldvalues.website === '' ? '' : this.state.prefixWebsite + fieldvalues.website,
        };
        try {
          const { status, data } = await fetchAsync(`user/${this.props.userId}/basic`, {
            method: 'PATCH',
            body: values,
          });
          if (status === 200) {
            this.props.onUpdate(values);
            openNotification(NOTIFICTION_SUCCESS, 'update successfully', 'you have been updated basic profile');
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

  handleChange = (value) => {
    this.setState({ prefixWebsite: value });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { loading } = this.state;
    const selectBefore = (
      <Select value={this.state.prefixWebsite} style={{ width: 90 }} onChange={this.handleChange}>
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );

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

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <FormTemplate title="ข้อมูลเบื้องต้น">
              <FormItem
                {...formItemLayout}
                label="About Me"
              >
                {getFieldDecorator('aboutMe', {
                  rules: [{
                    required: true, message: 'Please input about me field',
                  }],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="My website"
              >
                {getFieldDecorator('website')(
                  <Input addonBefore={selectBefore} placeholder="mysite.com" />
                )}
              </FormItem>
            </FormTemplate>
          </Row>
          <Row>
            <Col xs={24}>
              <Button primary fullWidth borderRadius="0px" type="submit" loading={loading}>
                <Icon type="check" style={{ fontSize: '20px', fontWeight: 'bold' }} />&nbsp;
                บันทึกข้อมูลเบื้องต้น
              </Button>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    );
  }
}

const ProfileBasicForm = Form.create({
  mapPropsToFields(props) {
    return {
      aboutMe: Form.createFormField({
        value: props.aboutMe,
      }),
      website: Form.createFormField({
        value: props.website.replace(/^https?:\/\//, ''),
      }),
    };
  },
})(ProfileBasic);

const TranslatedProfileBasicForm = translate(['common'])(ProfileBasicForm);

export default TranslatedProfileBasicForm;
