import { Row, Col } from 'antd';
import Button from './myComponents/Button';

class BankList extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <React.Fragment>
        <Row gutter={12}>
          <h1 className="blue-head-text">
            Payment
          </h1>
          <Col xs={24} md={12}>
            <Button primary fullWidth width="10px" borderRadius="5px">
              Bank Transfer
            </Button>
          </Col>
          <Col xs={24} md={12}>
            <Button fullWidth width="10px" borderRadius="5px">
              Credit Card / Debit Card
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: '30px' }}>
          <div className="bank-box">
            <div className="bank-head bank-text">
              Bank Account
            </div>
            <div className="each-bank-box">
              <div
                className="bank-image"
                style={{
                  backgroundImage: "url('http://www.theshoppesgrandrama9.com/public/uploads/shop_list/5_Bangkok_Bank1.jpg')"
                }}
              />
              <div className="bank-info">
                <div>ธนาคารกรุงเทพ</div>
                <div>ชื่อบัญชี : xxxxxxxxxxxxx</div>
                <div>x-xxx-xxxx</div>
              </div>
            </div>
            <div className="hr" />
            <div className="each-bank-box">
              <div
                className="bank-image"
                style={{
                  backgroundImage: "url('https://www.matichon.co.th/wp-content/uploads/2017/11/%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89-KTB.jpg')"
                }}
              />
              <div className="bank-info">
                <div>ธนาคารกรุงไทย</div>
                <div>ชื่อบัญชี : xxxxxxxxxxxxx</div>
                <div>x-xxx-xxxx</div>
              </div>
            </div>
          </div>
        </Row>
        <div
          style={{
            fontSize: '18px',
            padding: '10px 0',
            marginTop: '10px'
          }}
        >
          * กรุณาชำระเงินภายใน 5 วัน นับจากคำสั่งซื้อสำเร็จ ถ้าเกินเวลาคำสั่งซื้อนี้จะถูกยกเลิกทันที
        </div>
        <style jsx>{`
          .blue-head-text {
            color: #29AAE3;
            font-weight: 400;
          }
          .bank-head {
            color: white;
            background-color: #29AAE3;
          }
          .bank-text {
              font-size: 25px;
              font-weight: 300;
              padding-left: 10px;
          }
          .each-bank-box {
              width: 100%;
              padding: 10px;
              display: inline-block;
          }
          .bank-image {
              width: 80px;
              height: 80px;
              display: inline-block;
              float: left;
              background-color: lightgray;
              background-size: cover;
          }
          .bank-info {
              font-size: 18px;
              display: inline-block;
              float: left;
              padding-left: 10px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default BankList;
