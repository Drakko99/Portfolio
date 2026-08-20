import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/portfolioData';
import { FiArrowDown } from 'react-icons/fi';

export default function HeroSection() {
    const { scrollY } = useScroll();

    const yTitle = useTransform(scrollY, [0, 400], [0, 150]);
    const opacityTitle = useTransform(scrollY, [0, 350], [1, 0]);
    const scaleTitle = useTransform(scrollY, [0, 400], [1, 0.85]);

    return (
        <section className="min-h-screen flex items-center justify-start relative px-6 md:px-16 pt-24">
            {/* Neon Strip */}
            <motion.div
                className="neon-strip top-[20%] h-[60%]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.7, height: '60%' }}
                transition={{ duration: 1.5, delay: 0.3 }}
            />

            {/* Floating Orbs */}
            <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container rounded-full blur-[120px] opacity-30"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                className="absolute top-40 right-10 w-40 h-40 bg-secondary rounded-full blur-[100px] opacity-20"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="max-w-4xl relative z-10">
                {/* Handle */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="font-mono text-secondary text-sm tracking-[0.3em] mb-4"
                >
          // {profile.handle}
                </motion.div>

                {/* Main Title - NAME */}
                <motion.h1
                    style={{ y: yTitle, opacity: opacityTitle, scale: scaleTitle }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl font-bold burning-text mb-6 leading-tight"
                >
                    ADRIÁN<br />RODRÍGUEZ<br />DEL RÍO
                </motion.h1>

                {/* Role */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="font-mono text-primary text-lg md:text-xl mb-6"
                >
                    {profile.role}
                </motion.div>

                {/* Bio */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl border-l-2 border-secondary pl-4 py-3 bg-surface-container-high/30 backdrop-blur-sm"
                >
                    {profile.bio}
                </motion.p>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-8 flex items-center gap-2 text-secondary font-mono text-xs tracking-widest cursor-pointer group"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ y: 5 }}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <FiArrowDown />
                    </motion.div>
                    <span className="group-hover:text-secondary transition-colors">SCROLL TO EXPLORE</span>
                </motion.div>
            </div>
        </section>
    );
}
