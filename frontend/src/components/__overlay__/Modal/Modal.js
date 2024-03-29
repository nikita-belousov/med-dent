import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import style from './Modal.css'
import { Container } from '../../__basic__'
import { AppearAnimation } from '../../AppearAnimation'
import { ClosesOnExternalClick }  from '../../ClosesOnExternalClick'


export class Modal extends Component {
  render() {
    const { heading, children, renderFooter, onClose } = this.props

    return (
      <div className={style.wrapper}>
        <div
          className={style.shadowBg}
          style={{ top: window.scrollY }}
        >
          <Container responsive={true}>
            <AppearAnimation>
              <div className={style.window}>
                <ClosesOnExternalClick onClose={onClose}>
                  <div>
                    <div className={style.heading}>
                      <div className={style.inner}>
                        <div
                          className={style.closer}
                          onClick={onClose}
                        >
                          <div className={style.crossIcon}>
                            <FontAwesome name='times' />
                          </div>
                        </div>
                        <h3 className={style.headingText}>
                          {heading}
                        </h3>
                      </div>
                    </div>
                    <div className={style.content}>
                      <div className={style.inner}>
                        {children}
                      </div>
                    </div>
                    <div className={style.footer}></div>
                  </div>
                </ClosesOnExternalClick>
              </div>
            </AppearAnimation>
          </Container>
        </div>
      </div>
    )
  }
}
