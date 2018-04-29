import { Layout, Row, Col } from 'antd';
import CheckAuthentication from './CheckAuthentication';
import Navbar from '../components/Navbar';
import SignModal from './SignModal';

const {
  Header,
} = Layout;

const AppLayout = props => (
  <Layout style={{
      background: 'white',
      marginBottom: '-7px',
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: '260px',
    }}
  >
    <Header style={{
        position: 'fixed',
        width: '100%',
        height: '73px',
        background: 'white',
        borderBottom: '1px solid #e8e8e8',
        zIndex: '1000',
    }}
    >
      <Navbar />
    </Header>
    <div id="container" style={{ marginTop: 73 }}>
      {props.children}
    </div>
    <div id="footer" style={{ position: 'absolute', bottom: 0, height: 260 }}>
      <div className="brand-logo-box">
        {/* '#1da1f2' */}
        <i className="fab fa-twitter-square fa-2x in-block" />
        {/* '#3b5998' */}
        <i className="fab fa-facebook-square fa-2x in-block" style={{ marginLeft: '15px' }} />
      </div>
      <div>Copyright © Computer Systems Integration Co.,Ltd. ©2017</div>
      <div>76 Soi Rattanathibet28, Rattanathibet Rd.,</div>
      <div>
            Bangkrasaw, Mueang Nonthaburi District, Nonthaburi 11000 Thailand
      </div>
      <div className="line" />
      <Row>
        <Col span={6} offset={6}>
          <a>เงื่อนไขการให้บริการ</a>
          <br />
          <a>ช่องทางการชำระเงิน</a>
        </Col>
        <Col span={6}>
          <a>เงื่อนไขการให้บริการ</a>
          <br />
          <a>ช่องทางการชำระเงิน</a>
        </Col>
      </Row>
    </div>
    <SignModal />
    <CheckAuthentication />

    <style jsx>{`

        .container {
            margin-top: 70px;
            width: 100%;
        }

        .notification {
            font-weight: 300;
            bottom: 0;
            right: 0;
            border-radius: 0;
            position: fixed;
            margin: 0 20px 20px 0;
        }

        #footer {
            font-size: 18px;
            font-weight: 300;
            color: #ffffff;
            text-align: center;
            background: red;
            bottom: 0;
            width: 100%;
            height: 260px;
            background-color: #29aae3;
        }

        .line {
            height: 1px;
            width: 600px;
            margin: 15px auto;
            background-color: #ffffff;
        }

        #footer a {
            color: #ffffff;
        }

        #footer a:hover {
            color: #444444;
        }

        .brand-logo-box {
            width: 400px;
            height: 60px;
            margin: auto;
            padding-top: 13px;
        }

    `}
    </style>
  </Layout>
);

export default AppLayout;
