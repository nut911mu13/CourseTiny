import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { translate } from 'react-i18next';
import Button from '../myComponents/Button';
import BankList from '../BankList';
import { fetchAsync } from '../../libs/helper';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../../libs/notification';

const FormItem = Form.Item;
const { Option } = Select;

class TicketBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleCheck = (e) => {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  }

  checkMobileNumber = (rule, value, callback) => {
    if (value && !/^[0-9]{10}$/.test(value)) {
      callback('invalid mobile phone number format!');
    } else {
      callback();
    }
  }

  handleCancel = async () => {
    await fetchAsync(`orders/${this.props.orderId}`, { method: 'DELETE' });
    Router.push('/courses');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const buyer = {
          firstName: fieldsValue.buyerFirstName,
          lastName: fieldsValue.buyerLastName,
          email: fieldsValue.buyerEmail,
          mobileNumber: fieldsValue.buyerMobileNumber,
        };
        const ticketBuyers = fieldsValue.same.map((item, i) => (
          {
            same: item,
            id: fieldsValue.id[i],
            firstName: fieldsValue.firstName && fieldsValue.firstName[i] ? fieldsValue.firstName[i] : '',
            lastName: fieldsValue.lastName && fieldsValue.lastName[i] ? fieldsValue.lastName[i] : '',
            email: fieldsValue.email && fieldsValue.email[i] ? fieldsValue.email[i] : '',
            mobileNumber: fieldsValue.mobileNumber && fieldsValue.mobileNumber[i] ? fieldsValue.mobileNumber[i] : '',
          }
        ));
        this.setState({ loading: true });
        try {
          const { status, data } = await fetchAsync(`orders/${this.props.orderId}`, {
            method: 'PATCH',
            body: {
              buyer,
              ticketBuyers,
            },
          });
          if (status === 200) {
            Router.push('/booking-success');
          } else {
            openNotification(NOTIFICTION_ERROR, 'confirm order failed', data.error);
          }
        } catch (error) {
          openNotification(NOTIFICTION_ERROR, 'error', error.message);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
  }

  checkTerm = (rule, value, callback) => {
    if (!value) {
      callback('Please accept the term of service!');
    } else {
      callback();
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
      tickets,
    } = this.props;
    const { loading } = this.state;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+66',
    })(<Select style={{ width: 70 }}><Option value="66">+66</Option></Select>);

    let uuid = 0;
    const BuyerForm = [];
    tickets.forEach((t) => {
      const orderTickets = t.orderTicketId.split(',');
      let count = 1;
      orderTickets.forEach((ot) => {
        BuyerForm.push(
          <Row gutter={24} key={uuid}>
            <h1 className="ticket-head-text">
              {`Tickets #${count} - ${t.name}`}
            </h1>
            {getFieldDecorator(`id[${uuid}]`, {
              rules: [{
                required: true, message: 'there is an error in your ticket id',
              }],
              initialValue: ot,
            })(<Input type="hidden" />)}
            <Col xs={24}>
              <FormItem style={{ marginBottom: '10px' }}>
                {getFieldDecorator(`same[${uuid}]`, {
                  rules: [{ type: 'boolean' }],
                  initialValue: false,
                  valuePropName: 'checked',
                })(
                  <Checkbox
                    onChange={this.handleCheck}
                  >
                    Use Ticket Buyer's Information
                  </Checkbox>
                )}
              </FormItem>
            </Col>
            {this.state[`same[${uuid}]`] === true
            ? null
            :
            <Col xs={24} md={12}>
              <FormItem label="First name">
                {getFieldDecorator(`firstName[${uuid}]`, {
                  rules: [{
                    required: this.state[`same[${uuid}]`] !== true, message: 'Please input your First name!',
                  }],
                })(<Input />)}
              </FormItem>
            </Col>
            }
            {this.state[`same[${uuid}]`] === true
            ? null
            :
            <Col xs={24} md={12}>
              <FormItem label="Last name">
                {getFieldDecorator(`lastName[${uuid}]`, {
                  rules: [{
                    required: this.state[`same[${uuid}]`] !== true, message: 'Please input your Last name!',
                  }],
                })(<Input />)}
              </FormItem>
            </Col>
            }
            {this.state[`same[${uuid}]`] === true
            ? null
            :
            <Col xs={24} md={12}>
              <FormItem label="E-mail">
                {getFieldDecorator(`email[${uuid}]`, {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: this.state[`same[${uuid}]`] !== true, message: 'Please input your E-mail!',
                  }],
                })(<Input type="email" />)}
              </FormItem>
            </Col>
            }
            {this.state[`same[${uuid}]`] === true
            ? null
            :
            <Col xs={24} md={12}>
              <FormItem label="Mobile">
                {getFieldDecorator(`mobileNumber[${uuid}]`, {
                  rules: [{ required: this.state[`same[${uuid}]`] !== true, message: 'Please input your mobile phone number!', whitespace: true }, {
                    validator: this.checkMobileNumber,
                  }],
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            }
            <style jsx>{`
              .ticket-head-text {
                  color: #29AAE3;
                  font-weight: 400;
                  margin-bottom: 10px;
              }
            `}</style>
          </Row>
        );
        count += 1;
        uuid += 1;
      });
    });

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row gutter={24} key={uuid}>
          <h1 className="ticket-head-text">
            Tickets Buyer
          </h1>
          <Col xs={24} md={12}>
            <FormItem label="First name">
              {getFieldDecorator('buyerFirstName', {
                rules: [{
                  required: true, message: 'Please input your First name!',
                }],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={24} md={12}>
            <FormItem label="Last name">
              {getFieldDecorator('buyerLastName', {
                rules: [{
                  required: true, message: 'Please input your Last name!',
                }],
              })(<Input />)}
            </FormItem>
          </Col>
          <Col xs={24} md={12}>
            <FormItem label="E-mail">
              {getFieldDecorator('buyerEmail', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(<Input type="email" />)}
            </FormItem>
          </Col>
          <Col xs={24} md={12}>
            <FormItem label="Mobile">
              {getFieldDecorator('buyerMobileNumber', {
                rules: [{ required: true, message: 'Please input your mobile phone number!', whitespace: true }, {
                  validator: this.checkMobileNumber,
                }],
              })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
        </Row>
        {BuyerForm}
        <BankList />
        <FormItem
          style={{
            textAlign: 'center',
            margin: '20px 0px 10px 0px'
          }}
        >
          {getFieldDecorator('agreement', {
            rules: [{
              type: 'boolean', required: true,
            }, {
              validator: this.checkTerm,
            }],
            initialValue: false,
            valuePropName: 'checked',
          })(
            <Checkbox
              style={{
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
              Term and condition agreement
            </Checkbox>
          )}
        </FormItem>
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <div
              style={{
                textAlign: 'justify',
                textJustify: 'distribute'
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </Col>
        </Row>
        <Row style={{ margin: '24px 0' }}>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 6 }}
          >
            <Button
              cancel
              height="8px"
              fullWidth
              type="button"
              onClick={this.handleCancel}
            >
              Cancel this Order
            </Button>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 6, offset: 12 }}
          >
            <Button
              success
              height="8px"
              fullWidth
              type="submit"
              loading={loading}
            >
              Confirm
            </Button>
          </Col>
        </Row>
        <style jsx>{`
        .ticket-head-text {
            color: #29AAE3;
            font-weight: 400;
            margin-bottom: 10px;
        }
        `}</style>
      </Form>
    );
  }
}

const TicketBuyerForm = Form.create()(TicketBuyer);

const TranslatedTicketBuyerForm = translate(['common'])(TicketBuyerForm);

export default TranslatedTicketBuyerForm;
