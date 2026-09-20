import { MotionConfig, motion } from "motion/react";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-stone-50 p-6 text-stone-900">
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Storm Steps
        </motion.h1>
        <p className="mt-2 text-lg">
          Setup check: styles, font, and animation are working.
        </p>
      </main>
    </MotionConfig>
  );
}