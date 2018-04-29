import { Row, Col } from 'antd';
import { translate } from 'react-i18next';

class TicketTier extends React.Component {
  render() {
    const {
      id,
      children,
      remaining,
      onChange,
    } = this.props;
    const maxTicket = 10;
    const ticketOptions = Array.from({ length: maxTicket + 1 }, (_, i) => (
      <option key={i} value={i} disabled={i > remaining}>
        {i}
      </option>
    ));
    let alertLabel = '';
    if (remaining === 0) {
      alertLabel = 'ขายหมดแล้ว'
    } else if (remaining <= maxTicket) {
      alertLabel = `เหลืออีกแค่ ${remaining} ใบเท่านั้น !`;
    }
    return (
      <React.Fragment>
        <Row style={{ marginTop: '16px' }}>
          <Col xs={24} lg={14} >
            <div className="ticket-name">
              {this.props.name}
            </div>
          </Col>
          <Col xs={24} lg={10}>
            <div className="f-right">
              <div className="in-block">
                <span className="ticket-price">{this.props.price}</span>
                <span className="ticket-price">&nbsp;B</span>
              </div>
              <div className="ticket-select in-block">
                <label className="custom-select" htmlFor="styledSelect1">
                  <div className="caret" />
                  <select
                    name={id}
                    onChange={onChange}
                    disabled={remaining === 0}
                  >
                    {ticketOptions}
                  </select>
                </label>
              </div>
            </div>
          </Col>
          <Col xs={24}>
            <span style={{ color: 'red' }}>
              {alertLabel}
            </span>
            <div className="ticket-condition">เงื่อนไข</div>
            <div className="ticket-condition">
              {children}
            </div>
          </Col>
        </Row>

        <style jsx>{`
          .ticket-text-box {
              position: inline-block;
          }
          .ticket-left-box {
              float: left;
          }
          .ticket-name {
              font-size: 16px;
              margin-top: 5px;
          }
          .ticket-price {
              font-size: 18px;
              font-weight: 500;
              color: #29AAE3;
          }
          .ticket-select {
              margin-left: 10px;
          }
          .ticket-condition {
              color: gray;
              font-weight: 300;
          }
          .ticket-right-box {
              float: right;
          }

          .custom-select {
              position: relative;
              display: block;
              height: 25px;
              margin: 0 auto;
              background-color: #29AAE3;
              z-index: 10;
              border-radius: 5px;
          }
          .custom-select select {
              border: none;
              outline: none;
              background: transparent;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              border-radius: 5px;
              margin: 0;
              display: block;
              width: 100%;
              padding: 1px 30px 0px 10px;
              font-size: 16px;
              font-weight: 500;
              color: white;
              background-color: #29AAE3;
          }
          .caret {
            position: absolute;
            right: 25px;
            top: 10px;
          }

          .caret:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border-top: 6px solid white;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
          }

          .caret:after {
            content: '';
            position: absolute;
            left: 8px;
            top: 0;
            border-top: -2px solid #fff;
            border-left: -2px solid transparent;
            border-right: -2px solid transparent;
          }
      `}</style>
      </React.Fragment>
    );
  };
};

export default TicketTier;
