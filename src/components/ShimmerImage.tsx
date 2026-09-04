"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import styles from "./ShimmerImage.module.css";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

// Large images (multi-MB masters) get a shimmer skeleton that a Motion sweep
// crosses until the image decodes, then the image fades in over it.
export default function ShimmerImage({
  src,
  alt,
  sizes,
  priority,
  objectFit = "cover",
  objectPosition = "center",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      {!loaded && (
        <span className={styles.skeleton} aria-hidden="true">
          {!reduce && (
            <motion.span
              className={styles.sweep}
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            />
          )}
        </span>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={styles.img}
        data-loaded={loaded}
        style={{ objectFit, objectPosition }}
      />
    </>
  );
}
