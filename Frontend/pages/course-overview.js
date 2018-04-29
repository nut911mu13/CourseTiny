import Router from 'next/router';
import ErrorPage from 'next/error';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import { translate } from 'react-i18next';
import { URL } from '../configs/app';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import Button from '../components/myComponents/Button';
import Ticket from '../components/TicketTier';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

class CourseOverview extends React.Component {
  state = {
    tickets: [],
    loading: false,
  }

  async componentDidMount() {
    if (!this.props.course) {
      return;
    }
    this.setState({ loading: true });
    try {
      const {
        status,
        data: { tickets },
      } = await fetchAsync(`courses/${this.props.course.id}/tickets`, { method: 'GET' });
      if (status === 200) {
        this.setState({ tickets });
      } else {
        openNotification(NOTIFICTION_ERROR, 'get ticket information failed', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleChange = (e) => {
    this.setState({
      tickets: this.state.tickets.map(t => (
        (t.id === +e.target.name)
          ? {
            ...t,
            amount: +e.target.value,
          }
          : t
      )),
    });
  }

  handleBuyTicket = async () => {
    this.setState({ loading: true });
    try {
      const { status, data } = await fetchAsync('orders', {
        method: 'POST',
        body: {
          tickets: this.state.tickets,
        },
      });
      if (status === 200) {
        Router.push(`/booking?id=${data.order.id}`, `/booking/${data.order.id}`);
      } else {
        openNotification(NOTIFICTION_ERROR, 'cannot buy tickets', data.error);
      }
    } catch (error) {
      openNotification(NOTIFICTION_ERROR, 'error', error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { course, statusCode } = this.props;
    const { loading } = this.state;

    if (statusCode && statusCode !== 200) {
      return (<ErrorPage statusCode={statusCode} />);
    }

    const tickets = this.state.tickets.map(t => (
      <Ticket
        key={t.id}
        id={t.id}
        name={t.name}
        price={t.price}
        remaining={t.remaining}
        onChange={this.handleChange}
      >
        <span>1. บัตรนี้ไม่สามารถเปลี่ยนเป็นเงินสดได้</span>
      </Ticket>
    ));

    const disableBuyButton = this.state.tickets.every(t => !t.amount);
    return (
      <MyLayout>
        <Head title="course-overview" />
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 18, offset: 3 }}>
            <div style={{ backgroundImage: `url(${URL}${course.cover})` }} className="cover-image" />
          </Col>
        </Row>
        <Row style={{ margin: '24px 0' }}>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 14, offset: 1 }} lg={{ span: 9, offset: 3 }}>
            <h1 className="head-text">{course.title}</h1>
            <div className="content">{course.description}</div>
          </Col>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 7, offset: 1 }} lg={{ span: 7, offset: 2 }}>
            <h1 className="date-text">{course.startDate}</h1>
            <h2 className="place-text">{course.location}</h2>
            <div className="ticket-box">
              <div className="ticket-box-head">Tickets</div>
              <div className="ticket-box-hr" />
              {tickets}
            </div>
            <div style={{
              marginTop: '30px',
              textAlign: 'center'
            }}>
              <Button
                blueBorder
                width="20px"
                fontSize="18px"
                type="button"
                disabled={disableBuyButton}
                onClick={this.handleBuyTicket}
                loading={loading}
              >
                Buy Tickets
              </Button>
            </div>
          </Col>
        </Row>

        <style jsx>{`
            .body {
                font-family: prompt;
            }
            .cover-image {
                width: 100%;
                height: 400px;
                background-color: lightgray;
                background-size: cover;
            }
            .head-text {
                color: rgba(0,0,0,.65);
            }
            .content {
                font-size: 16px;
                font-weight: 300;
                text-align: justify;
                text-justify: distribute;
                margin-bottom: 20px;
            }
            .date-text {
                color: #29AAE3;
            }
            .place-text {
                color: rgba(0,0,0,.65);
                font-weight: 400;
                margin-top: -15px;
            }
            .ticket-box {
                margin-top: 30px;
            }
            .ticket-box-head {
                font-size: 20px;
                font-weight: 500;
                color: #29AAE3;
            }
            .ticket-box-hr {
                width: 100%;
                height: 2px;
                background-color: lightgray;
            }
        `}</style>
      </MyLayout>
    );
  };
};

const TranslatedCourseOverview = translate(['common'], { i18n, wait: process.browser })(CourseOverview);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedCourseOverview.getInitialProps = async ({ req, res, query }) => {
  const props = {};
  const { status, data: { course } } = await fetchAsync(`courses/${encodeURIComponent(query.title)}`, { method: 'GET' });
  if (status !== 200) {
    res.statusCode = status;
    return { statusCode: status };
  }
  props.course = course;

  if (req && !process.browser) return Object.assign(props, i18n.getInitialProps(req, ['common']));
  return props;
};

export default withRedux(initStore)(TranslatedCourseOverview);
