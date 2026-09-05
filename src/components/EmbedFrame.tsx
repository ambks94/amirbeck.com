import styles from "./BrowserFrame.module.css";

// A prototype iframe in the same browser chrome as the home Work cards:
// a title bar with traffic-light dots and a URL pill, over the embed.
export default function EmbedFrame({ src, url }: { src: string; url?: string }) {
  return (
    <figure className={styles.frame}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {url && <span className={styles.url}>{url}</span>}
      </div>
      <div className={styles.embedViewport}>
        <iframe
          src={src}
          loading="lazy"
          allowFullScreen
          title="Interactive prototype"
        />
      </div>
    </figure>
  );
}
