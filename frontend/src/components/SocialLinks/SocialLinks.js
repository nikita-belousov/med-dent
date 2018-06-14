import React from 'react'
import InlineSVG from 'svg-inline-react'
import FontAwesome from '@fortawesome/react-fontawesome'

import style from './SocialLinks.css'
import { SOCIAL_LINKS } from '../../constants/config'
import facebookIcon from '../../assets/images/icons/facebook.svg'
import instagramIcon from '../../assets/images/icons/instagram.svg'


export const SocialLinks = () =>
  <div className={style.wrapper}>
    <a target='_blank' href={SOCIAL_LINKS.vk} className={style.linkVk}>
      <FontAwesome icon={['fab', 'vk']} />
    </a>
    <a target='_blank' href={SOCIAL_LINKS.instagram} className={style.linkInstagram}>
      <InlineSVG src={instagramIcon} />
    </a>
    <a target='_blank' href={SOCIAL_LINKS.facebook} className={style.linkFacebook}>
      <InlineSVG src={facebookIcon} />
    </a>
  </div>
