import { ArrowDown } from "lucide-react";
import LoopVideo from "./LoopVideo";
import CaseShot from "./CaseShot";
import Shot from "./Shot";
import EmbedFrame from "./EmbedFrame";
import PhoneScroll from "./PhoneScroll";
import styles from "./CaseStudy.module.css";
import type { CaseBlock, CaseImage } from "@/content/caseStudies";

export function shouldStack(imgs: CaseImage[]) {
  if (imgs.length < 2) return false;
  // Browser chrome needs the full column — its bar and URL pill go unreadable
  // at half width.
  if (imgs.some((i) => i.browser)) return true;
  const frames = new Set(imgs.map((i) => i.frame ?? "full"));
  return (
    frames.has("wide") ||
    frames.has("pano") ||
    (frames.has("phone") && frames.size > 1)
  );
}

export function Video({
  src,
  caption,
  browser,
}: {
  src: string;
  caption?: string;
  browser?: string;
}) {
  const video = <LoopVideo src={src} label={caption} browser={browser} />;
  if (!caption) return video;
  return (
    <figure className={styles.figure}>
      {video}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

export default function BlockMedia({ block }: { block: CaseBlock }) {
  if (block.phones) return <PhoneScroll phones={block.phones} />;
  if (block.embed) {
    return <EmbedFrame src={block.embed} url={block.browser} />;
  }
  if (block.video)
    return (
      <Video
        src={block.video}
        caption={block.caption}
        browser={block.browser}
      />
    );
  const imgs = block.images ?? [];
  if (!imgs.length) return null;
  if (block.beforeAfter && imgs.length >= 2) {
    return (
      <div className={styles.beforeAfter}>
        <CaseShot
          image={imgs[0]}
          caption={block.captions?.[0]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
        <span className={styles.arrow} aria-hidden="true">
          <ArrowDown size={22} strokeWidth={1.5} />
        </span>
        <CaseShot
          image={imgs[1]}
          caption={block.captions?.[1]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
      </div>
    );
  }
  if (imgs.length === 1) {
    if (block.enlarge) return <Shot image={imgs[0]} />;
    return (
      <CaseShot
        image={imgs[0]}
        caption={block.captions?.[0]}
        sizes="(max-width: 1120px) 100vw, 1040px"
      />
    );
  }
  if (shouldStack(imgs)) {
    return (
      <div className={styles.stack}>
        {imgs.map((im, i) => (
          <CaseShot
            key={im.src}
            image={im}
            caption={block.captions?.[i]}
            sizes="(max-width: 1120px) 100vw, 1040px"
          />
        ))}
      </div>
    );
  }
  return (
    <div className={imgs.length >= 3 ? styles.grid3 : styles.grid2}>
      {imgs.map((im, i) => (
        <CaseShot
          key={im.src}
          image={im}
          caption={block.captions?.[i]}
          sizes="(max-width: 760px) 100vw, 500px"
        />
      ))}
    </div>
  );
}
