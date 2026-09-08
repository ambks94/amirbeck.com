"use client";

import { useState } from "react";
import styles from "./CaseActs.module.css";
import type { CaseStep } from "@/content/caseStudies";

export default function CaseSteps({ steps }: { steps: CaseStep[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <div className={styles.steps}>
      <div className={styles.stepTabs} role="tablist" aria-label="The flow">
        {steps.map((s, i) => (
          <button
            key={s.role}
            type="button"
            role="tab"
            id={`step-tab-${i}`}
            aria-selected={i === active}
            aria-controls="step-panel"
            className={styles.stepTab}
            onClick={() => setActive(i)}
          >
            <span className={styles.stepIndex}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {s.role}
          </button>
        ))}
      </div>
      <div
        className={styles.stepPanel}
        role="tabpanel"
        id="step-panel"
        aria-labelledby={`step-tab-${active}`}
      >
        <span className={styles.stepRole}>{step.role}</span>
        <h4 className={styles.stepTitle}>{step.title}</h4>
        <p className={styles.stepText}>{step.body}</p>
      </div>
    </div>
  );
}
