import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon, Tooltip } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import Button from '../components/myComponents/Button';
import Table from '../components/myComponents/Table';
import FormTemplate from '../components/forms/FormTemplate';
import Modal from '../components/Modal';
import ModalTransfer from '../components/forms/ModalTransfer';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

class OrderHistory extends React.Component {
  state = {
    loading: false,
    orders: [],
  }
  async componentDidMount() {
    if (this.props.auth.userId) {
      this.fetchUserOrderHistory(this.props.auth.userId);
    }
  }

  async componentWillReceiveProps({ auth }) {
    if (auth.userId && auth.userId !== this.props.auth.userId) {
      this.fetchUserOrderHistory(auth.userId);
    } else if (!auth.userId) {
      openNotification(NOTIFICTION_ERROR, 'error', 'you are not authorized');
      this.setState({ orders: [] });
    }
  }

  fetchUserOrderHistory = async (userId) => {
    this.setState({ loading: true });
    try {
      const { status, data } = await fetchAsync(`user/${userId}/orders`, { method: 'GET' });
      if (status === 200) {
        const orders = data.orders.map((o) => {
          let status;
          let action;
          switch (o.status) {
            case 2:
              status = <span><Icon type="loading" /> Pending</span>;
              action = <Button blueBorder fullWidth borderRadius="5px" width="10px"><Icon type="upload" /> แนบหลักฐาน</Button>;
              break;
            case 3:
              status = <span><Icon type="check-circle" /> Success</span>;
              action = <Button fullWidth borderRadius="5px" width="10px"><Icon type="printer" /> พิมพ์</Button>;
              break;
            default:
              status = '';
              action = '';
          }
          return {
            key: o.id,
            item: o.title,
            date: o.date,
            expire: o.expire,
            qty: o.quantity,
            total: o.total,
            status: <div style={{ display: 'inline-block', color: '#3AB54A', fontFamily: 'prompt' }}>{status}</div>,
            action,
          };
      });
        this.setState({ orders });
      } else {
        openNotification(NOTIFICTION_ERROR, 'error', data.error);
        this.resetForm();
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { orders, loading } = this.state;
    const space = {
      style: {
        margin: '24px 0'
      }
    };

    const columns = [{
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
      width: '',
    }, {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '',
    }, {
      title: 'Expire',
      dataIndex: 'expire',
      key: 'expire',
      width: '',
    }, {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: '',
    }, {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: '',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '',
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '',
    }];

    return (
      <MyLayout>
        <Head title="profile - coursetiny" />
        <Row {...space}>
          <Col
            xs={{ span: 22, offset: 1 }}
            lg={{ span: 16, offset: 4 }}
          >
            <FormTemplate title="Order History" centerTitle>
              <Table
                loading={loading}
                columns={columns}
                pagination={false}
                dataSource={orders}
              />
            </FormTemplate>
            <ModalTransfer border noRadius bottomButton=" อัพเดทหลักฐานการโอนเงิน"></ModalTransfer>
          </Col>
        </Row>
      </MyLayout>
    );
  }
}

const TranslatedOrderHistory = translate(['common'], { i18n, wait: process.browser })(OrderHistory);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedOrderHistory.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['common']);
  return {};
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRedux(initStore, mapStateToProps)(TranslatedOrderHistory);
