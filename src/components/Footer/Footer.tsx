import styles from './Footer.module.scss';
import museumLogo from '../../assets/icons/museum-logo-light.svg';
import githubLogo from '../../assets/icons/github-logo.svg';
import linkedlnLogo from '../../assets/icons/linkedln-logo.svg';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={`${styles.wrapper} wrapper`}>
        <img src={museumLogo} alt="" />
        <div className={styles.info}>
          <span className={styles.author}>Arthur Iorbalidi</span>
          <div className={styles.links}>
            <a href="https://github.com/Arthur-Iorbalidi">
              <img src={githubLogo} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/arthur-iorbalidi-094340309/">
              <img src={linkedlnLogo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
