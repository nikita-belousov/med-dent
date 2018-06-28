import { Subject, interval, fromEvent, empty, merge } from 'rxjs'
import { debounceTime, bufferCount, switchMap, distinctUntilChanged, map, filter, pairwise, takeUntil, tap, share, refCount } from 'rxjs/operators'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import style from './About.css'
import { AppearOnScrollReach } from '../../AppearOnScrollReach'
import { Container, Paragraph } from '../../__basic__'


const mapStateToProps = state => ({ mediaQueries: state.common.mediaQueries })


let About = class extends Component {
  constructor(props) {
    super(props)
    this.unsubscribe = []
    this.AUTO_SCROLL_SPEED = 50
  }

  componentDidMount() {
    let isHovering = false

    const animateScroll = () => this.scrollable.scrollTop += 1

    const animate$ = new Subject().pipe(
        distinctUntilChanged(),
        switchMap(val => {
          if (val === 'pause') {
            return empty()
          }
          if (val === 'start') {
            return interval(this.AUTO_SCROLL_SPEED)
          }
        })
      )

    const scroll$ = interval(this.AUTO_SCROLL_SPEED).pipe(
      map(() => this.scrollable.scrollTop)
    )

    const reachedEnd$ = scroll$.pipe(
      bufferCount(10),
      filter((values) => values.reduce((acc, val) => {
        if (typeof acc === 'undefined') return val
        if (!acc) return acc
        if (val !== acc) return false
        return val
      }, undefined))
    )

    const canScroll$ = scroll$.pipe(
      filter(() => !isHovering),
      pairwise(),
      filter(([ val1, val2 ]) => val1 > val2),
    )

    const mouseleave$ = fromEvent(this.scrollable, 'mouseleave')
      .pipe(tap(() => isHovering = false))

    const mouseenter$ = fromEvent(this.scrollable, 'mouseenter')
      .pipe(tap(() => isHovering = true))

    const start$ = merge(canScroll$, mouseleave$)
    const pause$ = merge(reachedEnd$, mouseenter$)

    pause$.subscribe(() => animate$.next('pause'))
    start$.subscribe(() => animate$.next('start'))

    animate$.subscribe(animateScroll)
    animate$.next('start')
  }

  render() {
    const { mediaQueries } = this.props
    if (!mediaQueries) return null

    const medium = mediaQueries.medium

    const wrapperClass = classNames({
      [style.wrapper]: !medium,
      [style.medium]: medium
    })

    return (
      <div className={wrapperClass}>
        <div className={style.background}>
          <Container responsive={true}>
            <div className={style.inner}>
              <div className={style.text}>
                <h2 className={style.heading}>
                  О нашей стоматологии
                </h2>
                <div className={style.textWrapper}>
                  <div className={style.textBackground}>
                    <div ref={node => this.scrollable = node} className={style.textInner}>
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

              {!medium &&
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
}


About = connect(mapStateToProps)(About)

export { About }
