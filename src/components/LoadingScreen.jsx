import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center gap-5">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-extrabold text-white shadow-xl shadow-indigo-200">
        J
        <motion.span
          className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-400"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      </div>

      <div className="text-center">
        <p className="font-bold text-slate-800">Finding your next opportunity</p>
        <p className="mt-1 text-sm text-slate-500">Please wait a moment...</p>
      </div>

      <motion.div
        className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full rounded-full bg-indigo-600"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}