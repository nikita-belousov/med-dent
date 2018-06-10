import React, { Component } from 'react'
import classNames from 'classnames'
import { fromEvent } from 'rxjs'
import { mapTo, filter, startWith } from 'rxjs/operators'

import style from './../../styles/components/sections/About.css'
import Container from './../Container'
import Paragraph from './../common/Paragraph'
import PositionLabel from './../common/PositionLabel'


class About extends Component {
  state = { scrollReached: false }

  componentDidMount() {
    const reachedBreakpoint = window.innerHeight * 0.4

    this.scrollStream = fromEvent(window, 'scroll')
      .pipe(
        mapTo(this.getWrapperTop()),
        filter(val => val <= reachedBreakpoint)
      ).subscribe(() => this.onReached())
  }

  componentWillUnmount() {
    this.scrollStream.unsubscribe()
  }

  getWrapperTop() {
    return this.wrapperNode.getBoundingClientRect().top
  }

  onReached = () => {
    this.setState({ scrollReached: true })
    this.scrollStream.unsubscribe()
  }

  render() {
    const wrapperCls = classNames({
      [style.wrapper]: true,
      [style.wrapperReached]: this.state.scrollReached
    })

    return (
      <div
        className={wrapperCls}
        ref={node => this.wrapperNode = node}
      >
        <div className={style['bg']}>
          <Container>
            <div className={style['inner']}>
              <div className={style['about-us']}>
                <div className={style['p-heading']}>
                  <h2>О стоматологии «Мед-Дент»</h2>
                </div>
                <div className={style['p-wrapper']}>
                  <div className={style['p-background']}>
                    <div className={style['p-inner']}>
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
              <div className={style['picture']}></div>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}


export default About
