import { Row, Col } from 'antd';

const CourseService = () => (
  <div style={{ marginBottom: '40px' }}>
    <Row>
      <Col span={20} offset={2}>
        <Row gutter={24} type="flex" align="middle">

          <Col xs={24} md={12} lg={8}>
            <div className="service-image" />
          </Col>
          <Col xs={24} md={12} lg={{ span: '12', offset: '4' }} >
            <div className="service-name">สร้างคอร์สอบรมได้เอง</div>
            <div className="service-detail">
                        เราเป็นผู้ให้บริการฟรีสำหรับทุกท่านที่ต้องการสร้างคอร์สด้วยตนเอง ไม่ว่าคอร์สอะไรก็ตามคุณสามารถจัดการทุกอย่างเพียงแค่ไม่กี่คลิกเท่านั้น โดยระบบของเราได้ถูกออกแบบมาเพื่อให้การสร้างคอร์สนั้นเป็นเรื่องง่าย ซึ่งคอร์สของคุณจะกลายเป็นคอร์สที่มีผู้ใช้สนใจเป็นจำนวนมากอย่างแน่นอน
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="service-name">สร้างคอร์สอบรมได้เอง</div>
            <div className="service-detail">
                        เราเป็นผู้ให้บริการฟรีสำหรับทุกท่านที่ต้องการสร้างคอร์สด้วยตนเอง ไม่ว่าคอร์สอะไรก็ตามคุณสามารถจัดการทุกอย่างเพียงแค่ไม่กี่คลิกเท่านั้น โดยระบบของเราได้ถูกออกแบบมาเพื่อให้การสร้างคอร์สนั้นเป็นเรื่องง่าย ซึ่งคอร์สของคุณจะกลายเป็นคอร์สที่มีผู้ใช้สนใจเป็นจำนวนมากอย่างแน่นอน
            </div>
          </Col>
          <Col xs={24} md={12} lg={{ span: '8', offset: '4' }}>
            <div className="service-image" />
          </Col>

          <Col xs={24} md={12} lg={8}>
            <div className="service-image" />
          </Col>
          <Col xs={24} md={12} lg={{ span: '12', offset: '4' }} >
            <div className="service-name">สร้างคอร์สอบรมได้เอง</div>
            <div className="service-detail">
                        เราเป็นผู้ให้บริการฟรีสำหรับทุกท่านที่ต้องการสร้างคอร์สด้วยตนเอง ไม่ว่าคอร์สอะไรก็ตามคุณสามารถจัดการทุกอย่างเพียงแค่ไม่กี่คลิกเท่านั้น โดยระบบของเราได้ถูกออกแบบมาเพื่อให้การสร้างคอร์สนั้นเป็นเรื่องง่าย ซึ่งคอร์สของคุณจะกลายเป็นคอร์สที่มีผู้ใช้สนใจเป็นจำนวนมากอย่างแน่นอน
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className="service-name">สร้างคอร์สอบรมได้เอง</div>
            <div className="service-detail">
                        เราเป็นผู้ให้บริการฟรีสำหรับทุกท่านที่ต้องการสร้างคอร์สด้วยตนเอง ไม่ว่าคอร์สอะไรก็ตามคุณสามารถจัดการทุกอย่างเพียงแค่ไม่กี่คลิกเท่านั้น โดยระบบของเราได้ถูกออกแบบมาเพื่อให้การสร้างคอร์สนั้นเป็นเรื่องง่าย ซึ่งคอร์สของคุณจะกลายเป็นคอร์สที่มีผู้ใช้สนใจเป็นจำนวนมากอย่างแน่นอน
            </div>
          </Col>
          <Col xs={24} md={12} lg={{ span: '8', offset: '4' }}>
            <div className="service-image" />
          </Col>

        </Row>
      </Col>
    </Row>

    <style jsx>{`

            .service-image {
                width: 320px;
                height: 320px;
                margin: auto;
                border-radius: 50%;
                background-color: #dbdbdb;
                margin-bottom: 30px;
            }

            .service-name {
                color: #29aae3;
                font-size: 24px;
                font-weight: bold;
            }

            .service-detail {
                width: 100%;
                font-size: 24px;
                font-weight: 300;
                margin-bottom: 30px;
            }

        `}
    </style>
  </div>
);

export default CourseService;
