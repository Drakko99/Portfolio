import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="w-full py-6 px-6 md:px-16 border-t border-primary/20 bg-surface-container-lowest/80 backdrop-blur-md flex flex-col items-center justify-center gap-2 relative z-10">
            {/* Copyright - Solo texto */}
            <motion.div
                className="font-mono text-secondary text-xs tracking-wider opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                © {new Date().getFullYear()} ADRIÁN RODRÍGUEZ DEL RÍO // SYSTEM_ACTIVE
            </motion.div>

            <motion.div
                className="font-mono text-[10px] tracking-widest opacity-40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                BUILT WITH REACT + THREE.JS + FRAMER MOTION
            </motion.div>
        </footer>
    );
}
