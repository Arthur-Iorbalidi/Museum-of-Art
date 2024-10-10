import styles from './Footer.module.scss';
import museumLogo from '@assets/icons/museum-logo-light.svg';
import githubLogo from '@assets/icons/github-logo.svg';
import linkedlnLogo from '@assets/icons/linkedln-logo.svg';
import authorInfo from '@constants/authorInfo';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img src={museumLogo} alt="logo" className={styles.museum_logo} />
        </div>
        <div className={styles.info}>
          <span className={styles.author}>{authorInfo.name}</span>
          <div className={styles.links}>
            <a href={authorInfo.githubLink}>
              <img src={githubLogo} alt="github link" />
            </a>
            <a href={authorInfo.linkedLnLink}>
              <img src={linkedlnLogo} alt="linkedin link" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
