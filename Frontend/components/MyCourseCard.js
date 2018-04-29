import { Row, Col, Icon } from 'antd';
import ToolbarButton from './myComponents/Button';

const color = '#29AAE3';

const MyCourseCard = ({ title, imgSrc }) => (
  <React.Fragment>
    <div className="mycourse-card">
      <div className="mycourse-cover">
        <div className="mycourse-edit">
          <Icon type="form" />
        </div>
        <div className="mycourse-status online">
          online
        </div>
      </div>
      <div className="mycourse-title">
        {title}
      </div>
      <div className="hr" />
      <div style={{ padding: '0 5px' }}>
        <span className="mycourse-sell">
          S: 20
        </span>
        <span className="mycourse-buy">
          B: 20
        </span>
      </div>
    </div>
    <style jsx>{`
      .mycourse-card {
          border: 1px solid lightgray;
          height: 190px;
          margin-bottom: 16px;
      }

      .mycourse-cover {
          position: relative;
          height: 120px;
          width: 100%;
          background-image: url("${imgSrc}");
          background-repeat: no-repeat;
          background-size: cover;
          background-color: #ddd;
      }

      .mycourse-edit {
          color: white;
          text-align: center;
          vertical-align: middle;
          width: 28px;
          height: 22px;
          background-color: #666666;
          position: absolute;
          left: 0;
      }

      .mycourse-status {
          color: white;
          text-align: center;
          vertical-align: middle;
          width: 80px;
          height: 22px;
          position: absolute;
          right: 0;
      }

      .online {
          background-color: #8CC63E;
      }

      .close {
          background-color: #666666;
      }

      .mycourse-title {
          padding: 10px;
      }

      .mycourse-money {
          padding: 10px;
      }

      .mycourse-sell {
      }

      .mycourse-buy {
          float: right;
      }
    `}</style>
  </React.Fragment>
);

export default MyCourseCard;

