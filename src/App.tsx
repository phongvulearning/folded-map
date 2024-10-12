import { useState } from "react";
import "./index.css";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionStyle,
  useMotionValueEvent,
} from "framer-motion";

function App() {
  return (
    <>
      <FoldableMap />
    </>
  );
}

export default App;

function FoldableMap() {
  const dragX = useMotionValue(0);
  const [isFolded, setIsFolded] = useState(true);
  const xLeftSection = useTransform(dragX, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(dragX, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(dragX, [150, 300], [0, 1]);
  const centerBrightness = useTransform(dragX, [150, 300], [0.2, 1]);

  useMotionValueEvent(dragX, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  return (
    <div className="overflow-x-clip">
      <motion.div
        animate={isFolded ? "folded" : "open"}
        variants={{
          open: { scale: 1 },
          folded: { scale: 0.9 },
        }}
        initial="folded"
        className="relative flex flex-col items-center"
      >
        <motion.div
          variants={{
            open: {
              rotate: 0,
            },
            hovering: { rotate: 0 },
          }}
          whileHover="hovering"
          initial={{
            rotate: 3,
          }}
          className="grid aspect-video max-h-[80vh] w-full min-w-[600px] p-8"
        >
          <div className="grid grid-cols-3 [grid-area:1/1]">
            <motion.div
              style={{
                x: xLeftSection,
                skewY: "-1deg",
              }}
              className="map-image origin-bottom-right border-r border-[rgba(255,255,255,.1)] shadow-2xl"
            />
            <motion.div
              style={
                {
                  scaleX: centerScale,
                  "--brightness": centerBrightness,
                } as MotionStyle
              }
              className="map-image brightness-[--brightness ]"
            />
            <motion.div
              style={{
                x: xRightSection,
                skewY: "1deg",
              }}
              className="map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-2xl"
            />
          </div>
          <motion.div
            drag="x"
            _dragX={dragX}
            style={{ x: dragX }}
            dragTransition={{
              modifyTarget(v) {
                return v > 150 ? 300 : 0;
              },
              timeConstant: 50,
            }}
            dragConstraints={{
              left: 0,
              right: 300,
            }}
            className="relative z-10 cursor-grab [grid-area:1/1] active:cursor-grabbing"
          />
        </motion.div>
        <motion.div
          variants={{
            folded: {
              opacity: 0,
              scale: 0.9,
              y: 30,
            },
            open: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          animate={isFolded ? "folded" : "open"}
          className="flex w-full justify-center text-xl font-semibold md:text-4xl"
        >
          <p className="rounded-2xl bg-white px-12 py-5 text-[hsl(73_69%_26%)]">
            Phong Vu Frontend Developer{" "}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
