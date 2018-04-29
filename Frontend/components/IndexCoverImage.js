import { Row, Col, Carousel  } from 'antd';
import styled from 'styled-components';

const IndexCoverImage = () => (
    <React.Fragment>
        <Carousel autoplay>
            <div className="index-cover">
                <div className="caption">
                    <span>Welcome to Coursetiny</span>
                </div>
            </div>
            <div className="index-cover">
                <div className="caption">
                    <span>Welcome to Coursetiny</span>
                </div>
            </div>
            <div className="index-cover">
                <div className="caption">
                    <span>Welcome to Coursetiny</span>
                </div>
            </div>
        </Carousel>

        <style jsx>{`
            .index-cover {
                width: 100%;
                height: 400px;
                background: url(https://i.imgur.com/SvnuN4M.png);
                background-attachment: fixed;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
            }
        `}</style>
    </React.Fragment>
);

export default styled(IndexCoverImage)`
    .ant-carousel .slick-slide {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        overflow: hidden;
    }

    .ant-carousel .slick-slide h3 {
        color: #fff;
    }

    .ant-carousel .slick-track {
        height: 400px;
    }
`;
