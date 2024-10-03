import styles from './Footer.module.scss';
import museumLogo from '@assets/icons/museum-logo-light.svg';
import githubLogo from '@assets/icons/github-logo.svg';
import linkedlnLogo from '@assets/icons/linkedln-logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img src={museumLogo} alt="logo" className={styles.museum_logo} />
        </div>
        <div className={styles.info}>
          <span className={styles.author}>Arthur Iorbalidi</span>
          <div className={styles.links}>
            <a href="https://github.com/Arthur-Iorbalidi">
              <img src={githubLogo} alt="github link" />
            </a>
            <a href="https://www.linkedin.com/in/arthur-iorbalidi-094340309/">
              <img src={linkedlnLogo} alt="linkedin link" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
