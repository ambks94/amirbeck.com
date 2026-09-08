"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./Lightbox.module.css";
import ScrollHint from "./ScrollHint";

type ImageData = {
  src: string;
  width: number;
  height: number;
  alt: string;
  matte?: "white";
};

/** Matches .plate: min(available width, available height × aspect). */
function plateSizes(width: number, height: number) {
  return `min(calc(100vw - 32px), calc((100vh - 32px) * ${width} / ${height}))`;
}

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
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onCancel={onClose}
    >
      {image && image.width / image.height > 5 ? (
        <div className={styles.inner}>
          {/* Fitting a 13:1 board to the viewport leaves a ~100px sliver, so it
              opens at a readable height and scrolls instead. */}
          <div className={styles.panoFrame}>
            <ScrollHint className={styles.panoScroll} onClick={onClose}>
              <span
                className={
                  image.matte === "white" ? styles.panoPlate : undefined
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="2560px"
                  quality={100}
                  className={styles.panoImg}
                />
              </span>
            </ScrollHint>
          </div>
          <p className={styles.caption}>{image.alt}</p>
        </div>
      ) : image ? (
        <div className={styles.inner} onClick={onClose}>
          <span className={styles.media}>
            <span
              className={
                image.matte === "white" ? styles.plateWhite : styles.plate
              }
              style={
                {
                  "--ar-w": image.width,
                  "--ar-h": image.height,
                } as CSSProperties
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={plateSizes(image.width, image.height)}
                quality={100}
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </span>
          </span>
          <p className={styles.caption}>{image.alt}</p>
        </div>
      ) : null}
    </dialog>
  );
}
