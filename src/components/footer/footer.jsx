import { FooterLink } from './footer-link/footer-link';
import Facebook from './img/facebook.png';
import Instagram from './img/inst.png';
import LinkedIn from './img/linkedin.png';
import VK from './img/vk.png';

import './footer.scss';

const footerLinksDB = [
  { href: 'https://www.facebook.com/clevertec.ru/', src: Facebook, alt: 'Facebook' },
  { href: 'https://www.facebook.com/clevertec.ru/', src: Instagram, alt: 'Instagram' },
  { href: 'https://www.facebook.com/clevertec.ru/', src: VK, alt: 'VK' },
  { href: 'https://www.facebook.com/clevertec.ru/', src: LinkedIn, alt: 'LinkedIn' },
];

export const Footer = () => {
  const footerLinks = footerLinksDB.map(({ href, src, alt }) => <FooterLink href={href} src={src} alt={alt} />);

  return (
    <section className='footer-section'>
      <footer>
        <div className='footer'>
          <div className='footer-left'>
            <div className='rights'>© 2020-2023 Cleverland. Все права защищены.</div>
          </div>
          <div className='footer-right'>{footerLinks}</div>
        </div>
      </footer>
    </section>
  );
};
