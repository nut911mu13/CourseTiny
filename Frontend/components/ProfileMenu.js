import Link from 'next/link';
import { Row, Col, Icon, Spin } from 'antd';
import Button from './myComponents/Button';

const StatusButton = ({ status }) => (
  <React.Fragment>
    {status
    ? <Icon type="check-circle" style={{ fontSize: 20, color: '#4BAF4C' }} />
    : <Icon type="check-circle-o" style={{ fontSize: 20 }} />
    }
  </React.Fragment>
);

class ProfileMenu extends React.Component {
  render() {
    const { profileStatus, loading } = this.props;
    return (
      <Spin spinning={loading} size="large">
        <Row>
          <Col
            span={24}
            style={{
                      border: '1px solid lightgray',
                      padding: '10px',
                      background: 'white',
                  }}
          >
            <Row>
              <Col xs={24} style={{ fontWeight: '500' }}>
                              ข้อมูลเบื้องต้น
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                <div className="menu-check-list-text">
                  <Link href="/profile" replace>
                    <span className="link">ข้อมูลส่วนตัว</span>
                  </Link>
                </div>
                <div className="menu-icon">
                  <StatusButton status={profileStatus.primary} />
                </div>
              </Col>
              <Col
                xs={24}
                style={{
                              marginTop: '5px',
                              fontWeight: '500',
                          }}
              >
                              ข้อมูลสำหรับจัดการอบรม
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                <div className="menu-check-list-text">
                  <Link as="/profile/basic" href={{ pathname: '/profile', query: { tab: 'basic' } }}>
                    <span className="link">ข้อมูลเบื้องต้น</span>
                  </Link>
                </div>
                <div className="menu-icon">
                  <StatusButton status={profileStatus.basic} />
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                <div className="menu-check-list-text">
                  <Link as="/profile/resume" href={{ pathname: '/profile', query: { tab: 'resume' } }}>
                    <span className="link">การศึกษาและประสบการณ์</span>
                  </Link>
                </div>
                <div className="menu-icon">
                  <StatusButton status={profileStatus.resume} />
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                <div className="menu-check-list-text">
                  <Link as="/profile/idcard" href={{ pathname: '/profile', query: { tab: 'idcard' } }}>
                    <span className="link">บัตรประชาชน</span>
                  </Link>
                </div>
                <div className="menu-icon">
                  <StatusButton status={profileStatus.idcard} />
                </div>
              </Col>
              <Col xs={24} style={{ marginTop: '5px' }}>
                <div className="menu-check-list-text">
                  <Link as="/profile/bank" href={{ pathname: '/profile', query: { tab: 'bank' } }}>
                    <span className="link">บัญชีการเงิน</span>
                  </Link>
                </div>
                <div className="menu-icon">
                  <StatusButton status={profileStatus.bank} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            xs={24}
            style={{
                      marginTop: '12px',
                      border: '1px solid #29AAE3',
                      padding: '10px',
                  }}
          >
            <div className="info-head">
                          สำหรับจัดการอบรม
            </div>
            <div className="info-body">
                          กรุณากรอกข้อมูลในส่วนที่มีเครื่องหมาย&nbsp;
              <i className="far fa-check-circle fa-sm" />
                          ให้ครบถ้วนก่อนถึงจะสามารถจัดการสร้างการอบรมเองได้
            </div>
          </Col>
          <Col xs={24} style={{ marginTop: '12px' }}>
            <Link href="/create">
              <Button
                blueBorder
                borderSize="1px"
                fullWidth
                width="10px"
                height="5px"
                disabled={!(profileStatus.primary &&
                  profileStatus.basic &&
                  profileStatus.resume &&
                  profileStatus.idcard &&
                  profileStatus.bank)}
              >
                เริ่มต้นการสร้างคอร์สอบรม
              </Button>
            </Link>
          </Col>
        </Row>
        <style jsx>{`
          .menu-check-list {
            width: 100%;
            border: 1px solid lightgray;
            padding: 10px;
          }

          .menu-check-list-text {
            float: left;
            color: gray;
          }

          .menu-icon {
            float: right;
            margin-top: 1px;
            color: gray;
          }

          .info-head {
            font-size: 16px;
            font-weight: 500;
            color: #29AAE3;
            font-style: italic;
          }

          .info-body {
            font-size: 14px;
            font-weight: 300;
            color: gray;
          }

          .link {
            cursor: pointer;
          }
        `}
        </style>
      </Spin>
    );
  }
}

export default ProfileMenu;
