import { easeInOut, motion } from "framer-motion"

export default function AlertMessage({alertMsg}) {

    return (
        <motion.div 
        initial={{opacity: 0, y: -20, scale: 0.95}}
        animate={{opacity: 100, y: 0, scale: 1}}
        transition={{duration: 0.8, ease: "easeInOut"}}
        className="flex w-80 justify-center bg-white z-10 p-2 rounded-4xl font-semibold">

        <h2>{alertMsg}</h2>
        </motion.div>
    )
}