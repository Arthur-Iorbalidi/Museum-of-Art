import images from '@constants/images';
import styles from './Footer.module.scss';
import authorInfo from '@constants/authorInfo';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.img_wrapper}>
          <img
            src={images.museumLogoDark}
            alt="logo"
            className={styles.museum_logo}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.author}>{authorInfo.name}</span>
          <div className={styles.links}>
            <a href={authorInfo.githubLink}>
              <img src={images.githubLogo} alt="github link" />
            </a>
            <a href={authorInfo.linkedLnLink}>
              <img src={images.linkedlnLogo} alt="linkedin link" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
