import React from "react";
import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  as = "div",
  style = {},
  ...rest
}) {
  // Use framer-motion's dynamic component support if 'as' is a string (e.g., "div", "section")
  // If 'as' is a custom component, we would need motion(Component), but for valid HTML tags, this works.
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      style={{ willChange: "opacity, transform, filter", ...style }}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
