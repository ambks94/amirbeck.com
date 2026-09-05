import Image from "next/image";
import styles from "./BrowserFrame.module.css";
import type { CaseImage } from "@/content/caseStudies";

export default function BrowserFrame({
  image,
  url,
  priority,
  sizes = "(max-width: 900px) 100vw, 900px",
}: {
  image: CaseImage;
  url?: string;
  priority?: boolean;
  sizes?: string;
}) {
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
      <div className={styles.shot}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={100}
          preload={priority}
        />
      </div>
    </figure>
  );
}
