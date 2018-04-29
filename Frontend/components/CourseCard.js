import Link from 'next/link';
import { Icon } from 'antd';
import styled from 'styled-components';
import Button from './myComponents/Button';

const CourseCard = ({
  title,
  startDate,
  location,
  imgSrc,
}) => (
  <div style={{ marginBottom: 20 }}>
    <Link as={`/courses/${title}`} href={`/course-overview?title=${title}`}>
      <div className="card-image" />
    </Link>
    <div className="card-body">
      <div className="card-body-top">
        <div className="card-name">
          {title}
        </div>
        <Link as={`/courses/${title}`} href={`/course-overview?title=${title}`}>
          <Button
            blueBorder
            width="10px"
            fontSize="14px"
            style={{
              float: 'right',
            }}
          >
            Buy Tickets
          </Button>
        </Link>
      </div>
      <div>
        <div style={{ marginBottom: '10px' }}>
          <Icon
            type="calendar"
            style={{
              color: 'gray',
              fontSize: '24px',
              verticalAlign: 'top',
            }}
          />
          <span className="card-body-text">&nbsp;&nbsp;{startDate}</span>
        </div>
        <div>
          <Icon
            type="environment-o"
            style={{
              color: 'gray',
              fontSize: '24px',
              verticalAlign: 'top',
            }}
          />
          <span className="card-body-text">&nbsp;&nbsp;{location}</span>
        </div>
      </div>
    </div>

    <style jsx>{`
            .card-image {
              cursor: pointer
              width: 100%;
              height: 200px;
              background-image: url("${imgSrc}");
              background-repeat: no-repeat;
              background-size: cover;
              background-color: #29aae3;
            }

            .card-body {
                padding: 10px 10px 15px 10px;
                width: 100%;
                hegiht: 200px;
                background-color: #e9e9e9;
            }

            .card-name {
                display: inline-block;
                vertical-align: middle;
                padding-top: 5px;
            }

            .card-body-top{
                margin-bottom: 16px;
            }

            .card-body-text {
                color: gray;
                vertical-align: top;
            }

        `}
    </style>

  </div>
);

export default styled(CourseCard) `
    button {
        color:red;

    }

    ant-btn-primary {
        color:green;
    }
`;
