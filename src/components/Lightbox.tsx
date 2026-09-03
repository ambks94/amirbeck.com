"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

type ImageData = { src: string; width: number; height: number; alt: string };

export default function Lightbox({
  image,
  onClose,
}: {
  image: ImageData | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (image && !el.open) el.showModal();
    if (!image && el.open) el.close();
  }, [image]);

  return (
    <dialog ref={ref} className={styles.dialog} onClose={onClose} onCancel={onClose}>
      {image ? (
        <div className={styles.inner} onClick={onClose}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
          />
          <p className={styles.caption}>{image.alt}</p>
        </div>
      ) : null}
    </dialog>
  );
}
