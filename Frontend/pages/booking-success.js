import Link from 'next/link';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon } from 'antd';
import { translate } from 'react-i18next';
import { fetchAsync } from '../libs/helper';
import i18n from '../i18n';
import { initStore } from '../redux/store';
import MyLayout from '../components/Layout';
import Head from '../components/Head';
import Button from '../components/myComponents/Button';
import { URL } from '../configs/app';
import {
  NOTIFICTION_SUCCESS,
  NOTIFICTION_ERROR,
  openNotification,
} from '../libs/notification';

const space = {
  style: {
    margin: '24px 0'
  }
}

const Congrants = () => (
  <MyLayout>
    <Head title="profile - coursetiny" />
    <Row {...space}>
      <Col
        xs={{ span: 22, offset: 1 }}
        lg={{ span: 16, offset: 4 }}
      >
        <Row gutter={12}>
          <div style={{
            fontSize: '160px',
            color: '#8CC63E',
            textAlign: 'center'
          }}>
            <Icon type="check-circle-o" />
          </div>
          <div style={{
            textAlign: 'center',
            margin: '0 0 30px 0'
          }}>
            <div style={{
                fontSize: '30px',
                fontWeight: 500
            }}>Congratuations</div>
            <div style={{
                fontSize: '24px',
                fontWeight: 500
            }}>Your Order Ticket is accepted.</div>
          </div>
          <div style={{
            textAlign: 'center'
          }}>
            <div style={{
                fontSize: '30px',
                color: '#29AAE3',
                fontWeight: 500
            }}>Next Step</div>
            <div className="text">ขั้นตอนต่อไปชำระเงินกับทางธนาคารและแนบไฟล์สลิปในระบบ</div>
            <div className="text">กรุณาชำระเงินภายใน 5 วันทำการ ถ้าเกินระบบจะทำการยกเลิกตั๋วอัตโนมัติ</div>
            <div style={{ height: '20px' }}/>
            <Link href="/order-history">
              <Button blueBorder fontSize="20px" height="10px" width="20px">
                Upload Payment
              </Button>
            </Link>
          </div>
        </Row>
      </Col>
    </Row>

    <style jsx>{`
      .text {
        font-family: prompt;
        font-size: 20px;
      }
    `}</style>
  </MyLayout>
);

const TranslatedCongrants = translate(['common'], { i18n, wait: process.browser })(Congrants);

// Passing down initial translations
// use req.i18n instance on serverside to avoid overlapping requests set the language wrong
TranslatedCongrants.getInitialProps = async ({ req }) => {
  if (req && !process.browser) return i18n.getInitialProps(req, ['common']);
  return {};
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRedux(initStore, mapStateToProps)(TranslatedCongrants);
