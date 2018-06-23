import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './About.css'
import { AppearOnScrollReach } from '../../AppearOnScrollReach'
import { Container, Paragraph } from '../../__basic__'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let About = ({ mediaQueries }) => {
  if (!mediaQueries) return null

  const mobile = mediaQueries.small

  const wrapperClass = classNames({
    [style.wrapper]: !mobile,
    [style.mobile]: mobile
  })

  return (
    <div className={wrapperClass}>
      <div className={style.background}>
        <Container responsive={true}>
          <div className={style.inner}>
            <div className={style.text}>
              <div className={style.pHeading}>
                <h2>О нашей стоматологии</h2>
              </div>
              <div className={style.textWrapper}>
                <div className={style.textBackground}>
                  <div className={style.textInner}>
                    <Paragraph>
                      Наша стоматологическая клиника Мед-Дент начала свою работу в
                      Домодедово 28 июля 2011 г. Мы расположены в динамично
                      развивающемся центральном микрорайоне города, на первом
                      этаже многоквартирного дома с развитой инфраструктурой,
                      хорошим подъездом, что в наше время имеет немаловажное
                      значение. Опыт и квалификация наших врачей, широкий спектр
                      услуг по доступным ценам, удачное месторасположение — вот
                      главные составляющие, которые вы найдете в нашей
                      стоматологии. Мы хотим стать одними из лучших, и имеем для
                      этого все необходимое. Основной задачей, поставленной перед
                      персоналом нашей клиники - это индивидуальный подход к
                      каждому пациенту, здесь каждый, и взрослый и маленький
                      получит профессиональное лечение, комплексный подход и
                      деликатное отношение. Мы не хотим, чтобы люди откладывали
                      лечение из-за финансовых затруднений, именно поэтому в нашей
                      стоматологи предусмотрена оплата лечения в кредит и в
                      рассрочку. Кроме того, мы регулярно проводим различные
                      акции.
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>

            {!mobile &&
              <div className={style.pictureWrapper}>
                <AppearOnScrollReach
                  coefficient={0.3}
                  offset={{ x: 150 }}
                  duration={1000}
                >
                  <div className={style.picture} />
                </AppearOnScrollReach>
              </div>}
          </div>
        </Container>
      </div>
    </div>
  )
}


About = connect(mapStateToProps)(About)

export { About }
