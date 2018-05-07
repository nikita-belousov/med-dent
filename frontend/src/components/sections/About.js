import React from 'react'
import styles from './../../styles/components/sections/About.css'
import Container from './../Container'
import Paragraph from './../common/Paragraph'
import PositionLabel from './../common/PositionLabel'

const About = (props) => (
  <div className={styles['wrapper']}>
    <div className={styles['bg']}>
      <Container>
        <div className={styles['inner']}>
          <div className={styles['about-us']}>
            <div className={styles['p-heading']}>
              <h2>О стоматологии «Мед-Дент»</h2>
            </div>
            <div className={styles['p-wrapper']}>
              <div className={styles['p-background']}>
                <div className={styles['p-inner']}>
                  <Paragraph>
                    Наша стоматологическая клиника Мед-Дент начала свою работу в
                    Домодедово 28 июля 2011 г. Мы расположены в динамично
                    развивающемся центральном микрорайоне города, на первом
                    этаже многоквартирного дома с развитой инфраструктурой,
                    хорошим подъездом, что в наше время имеет немаловажное
                    значение. Опыт и квалификация наших врачей, широкий спектр
                    услуг по доступным ценам, удачное месторасположение - вот
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
          <div className={styles['picture']}></div>
        </div>
      </Container>
    </div>
  </div>
)

export default About
