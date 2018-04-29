import ErrorPage from 'next/error';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import { URL } from '../configs/app';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import Table from '../components/myComponents/Table';
import TimerBox from '../components/TimerBox';
import TicketBuyerForm from '../components/forms/TicketBuyerForm';

class Booking extends React.Component {

  render() {
    const { order, course, statusCode } = this.props;
    const { id } = this.props.url.query;

    if ((statusCode && statusCode !== 200) || order.orderStatusId !== 1) {
      return (<ErrorPage statusCode={statusCode} />);
    }

    const columns = [{
      title: 'Tickets',
      dataIndex: 'ticket',
      key: 'ticket',
      width: '40%',
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
    }, {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      width: '30%',
    }, {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: '15%',
    }];

    const data = order.tickets.map((t) => {
      const qty = t.orderTicketId.split(',').length;
      const subtotal = t.price * qty;
      return {
        key: t.id,
        ticket: t.name,
        price: t.price,
        qty,
        subtotal,
      };
    });

    data.push({
      key: 9999,
      ticket: '',
      price: '',
      qty: `VAT ${order.vat}% (included)`,
      subtotal: order.totalPriceVatIncl - order.totalPriceVatExcl,
    });

    data.push({
      key: 10000,
      ticket: '',
      price: '',
      qty: 'Total',
      subtotal: order.totalPriceVatIncl,
    });

    return (
      <MyLayout>
        <Head title="booking" />
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 3 }}>
            <div
              style={{ backgroundImage: `url(${URL}${course.cover})` }}
              className="cover-image"
            />
          </Col>
        </Row>
        <Row style={{ margin: '24px 0' }}>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 18, offset: 3 }}>

            <Row>
              <div>
                <div style={{ float: 'left' }}>
                  <h1 className="head-text">{course.title}</h1>
                  <h1 className="blue-head-text">{course.startDate}</h1>
                  <h2 className="place-text">{course.location}</h2>
                </div>
                {/* <div className="timer-box">
                  <div className="timer-head timer-text">Hold Tickets</div>
                  <div className="timer-body timer-text">{remainingTime}</div>
                </div> */}
                <TimerBox remainingTime={order.remainingTime}/>
              </div>
            </Row>

            <Row style={{ margin: '24px 0' }}>
              <h1 className="blue-head-text">{`Order #${id}`}</h1>
              <Table
                columns={columns}
                pagination={false}
                dataSource={data}
              />
            </Row>

            <TicketBuyerForm orderId={order.id} tickets={order.tickets} />
          </Col>
        </Row>
        <style jsx>{`
          .cover-image {
            width: 100%;
            height: 400px;
            background-color: lightgray;
            background-size: cover;
          }
          .head-text {
              color: rgba(0,0,0,.65);
          }
          .blue-head-text {
              color: #29AAE3;
              font-weight: 400;
          }
          .place-text {
              color: rgba(0,0,0,.65);
              font-weight: 400;
              margin-top: -15px;
          }
      `}</style>
      </MyLayout>
    );
  };
};

const TranslatedBooking = translate(['common'], { i18n, wait: process.browser })(Booking);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedBooking.getInitialProps = async ({ req, res, query }) => {
  const props = {};
  const id = query.id && query.id.split('-')[2];

  if (!id) {
    return { statusCode: 404 };
  }

  const { status, data: { order, course } } = await fetchAsync(`orders/${id}`, { method: 'GET' });
  if (status !== 200) {
    res.statusCode = status;
    return { statusCode: status };
  }
  props.order = order;
  props.course = course;
  if (req && !process.browser) return Object.assign(props, i18n.getInitialProps(req, ['common']));
  return props;
};


export default withRedux(initStore)(TranslatedBooking);
