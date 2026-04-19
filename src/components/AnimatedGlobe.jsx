import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AnimatedGlobe = () => {
    // Checkmark positions distributed around the globe
    const checks = [
        { top: '18%', left: '50%', delay: 0, size: 16 },
        { top: '35%', left: '22%', delay: 0.3, size: 14 },
        { top: '35%', left: '78%', delay: 0.6, size: 14 },
        { top: '55%', left: '28%', delay: 0.9, size: 16 },
        { top: '55%', left: '72%', delay: 1.2, size: 14 },
        { top: '72%', left: '50%', delay: 1.5, size: 16 },
        { top: '45%', left: '50%', delay: 0.4, size: 18 },
    ];

    return (
        <motion.div
            className="globe-container"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        >
            {/* Outer glow */}
            <div className="globe-glow" />

            {/* Globe sphere */}
            <div className="globe-sphere">
                {/* Rotating wireframe group */}
                <div className="globe-wireframe">
                    {/* Equator */}
                    <div className="globe-ring globe-ring-equator" />
                    {/* Tilted ring 1 */}
                    <div className="globe-ring globe-ring-tilt1" />
                    {/* Tilted ring 2 */}
                    <div className="globe-ring globe-ring-tilt2" />
                    {/* Vertical ring (meridian) */}
                    <div className="globe-ring globe-ring-meridian" />
                    {/* Another meridian */}
                    <div className="globe-ring globe-ring-meridian2" />
                    {/* Latitude rings */}
                    <div className="globe-ring globe-ring-lat1" />
                    <div className="globe-ring globe-ring-lat2" />
                </div>

                {/* Checkmarks inside the globe */}
                {checks.map((check, index) => (
                    <motion.div
                        key={index}
                        className="globe-check"
                        style={{
                            top: check.top,
                            left: check.left,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 1.0 + check.delay,
                            ease: 'backOut',
                        }}
                    >
                        <motion.div
                            className="globe-check-inner"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: check.delay,
                                ease: 'easeInOut',
                            }}
                        >
                            <Check size={check.size} strokeWidth={3} />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Orbiting dot particles */}
            <div className="globe-particles">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="globe-particle"
                        style={{
                            animationDelay: `${i * 1.2}s`,
                            animationDuration: `${6 + i * 0.8}s`,
                        }}
                    />
                ))}
            </div>

            <style>{`
                .globe-container {
                    position: relative;
                    width: 320px;
                    height: 320px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (min-width: 768px) {
                    .globe-container {
                        width: 420px;
                        height: 420px;
                    }
                }

                .globe-glow {
                    position: absolute;
                    inset: -30px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(53, 172, 204, 0.15) 0%, rgba(53, 172, 204, 0.05) 50%, transparent 70%);
                    animation: globe-pulse 4s ease-in-out infinite;
                }

                .globe-sphere {
                    position: relative;
                    width: 260px;
                    height: 260px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 35% 35%, rgba(53, 172, 204, 0.08) 0%, rgba(10, 14, 39, 0.6) 60%, rgba(10, 14, 39, 0.9) 100%);
                    border: 1.5px solid rgba(53, 172, 204, 0.2);
                    box-shadow:
                        inset 0 0 60px rgba(53, 172, 204, 0.06),
                        0 0 40px rgba(53, 172, 204, 0.1),
                        0 0 80px rgba(53, 172, 204, 0.05);
                    overflow: hidden;
                }

                @media (min-width: 768px) {
                    .globe-sphere {
                        width: 340px;
                        height: 340px;
                    }
                }

                .globe-wireframe {
                    position: absolute;
                    inset: 0;
                    animation: globe-spin 20s linear infinite;
                }

                .globe-ring {
                    position: absolute;
                    inset: 8%;
                    border-radius: 50%;
                    border: 1px solid rgba(53, 172, 204, 0.15);
                }

                .globe-ring-equator {
                    transform: rotateX(75deg);
                    border-color: rgba(53, 172, 204, 0.25);
                }

                .globe-ring-tilt1 {
                    transform: rotateX(75deg) rotateY(60deg);
                }

                .globe-ring-tilt2 {
                    transform: rotateX(75deg) rotateY(-60deg);
                }

                .globe-ring-meridian {
                    transform: rotateY(0deg);
                    border-color: rgba(53, 172, 204, 0.2);
                }

                .globe-ring-meridian2 {
                    transform: rotateY(90deg);
                    border-color: rgba(53, 172, 204, 0.12);
                }

                .globe-ring-lat1 {
                    inset: 22%;
                    transform: rotateX(75deg);
                    border-color: rgba(53, 172, 204, 0.1);
                }

                .globe-ring-lat2 {
                    inset: -8%;
                    transform: rotateX(75deg);
                    border-color: rgba(53, 172, 204, 0.08);
                }

                .globe-check {
                    position: absolute;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                }

                .globe-check-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(16, 185, 129, 0.15);
                    border: 1.5px solid rgba(16, 185, 129, 0.4);
                    color: #34d399;
                    backdrop-filter: blur(4px);
                    box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
                }

                @media (min-width: 768px) {
                    .globe-check-inner {
                        width: 38px;
                        height: 38px;
                    }
                }

                .globe-particles {
                    position: absolute;
                    inset: 0;
                    animation: globe-spin-reverse 30s linear infinite;
                }

                .globe-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: rgba(53, 172, 204, 0.6);
                    box-shadow: 0 0 8px rgba(53, 172, 204, 0.4);
                    animation: globe-orbit linear infinite;
                }

                .globe-particle:nth-child(1) { top: 10%; left: 50%; }
                .globe-particle:nth-child(2) { top: 30%; left: 85%; }
                .globe-particle:nth-child(3) { top: 60%; left: 90%; }
                .globe-particle:nth-child(4) { top: 85%; left: 55%; }
                .globe-particle:nth-child(5) { top: 70%; left: 15%; }
                .globe-particle:nth-child(6) { top: 25%; left: 10%; }

                @keyframes globe-spin {
                    from { transform: rotateY(0deg); }
                    to { transform: rotateY(360deg); }
                }

                @keyframes globe-spin-reverse {
                    from { transform: rotateZ(0deg); }
                    to { transform: rotateZ(-360deg); }
                }

                @keyframes globe-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.08); opacity: 1; }
                }

                @keyframes globe-orbit {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.8); }
                }
            `}</style>
        </motion.div>
    );
};

export default AnimatedGlobe;
