// // AboutSection.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Code, Cpu, Rocket, ShieldCheck } from 'lucide-react';
// import {
//     fadeIn,
//     slideInFromLeft,
//     slideInFromRight,
//     staggerContainer,
//     statItem
// } from './animations';

// const AboutSection = () => {
//     const milestones = [
//         { year: "2015", title: "Company Founded", desc: "Started with 3 developers in a small office" },
//         { year: "2017", title: "First Enterprise Client", desc: "Landed $100k contract with Fortune 500 company" },
//         { year: "2019", title: "AI Division Launched", desc: "Expanded into machine learning solutions" },
//         { year: "2022", title: "Global Expansion", desc: "Opened offices in 3 countries" },
//         { year: "2023", title: "Award Winning", desc: "Recognized as Top Tech Innovator" }
//     ];

//     const features = [
//         {
//             icon: <Rocket size={24} className="text-blue-400" />,
//             title: "From Humble Beginnings",
//             desc: "Founded in 2015 as a small team of passionate developers, we've grown into a full-service technology partner for businesses worldwide."
//         },
//         {
//             icon: <Cpu size={24} className="text-blue-400" />,
//             title: "Technical Excellence",
//             desc: "We've mastered over 50 technologies across web, mobile, cloud, and AI domains. Our team of 20+ certified experts stays ahead through continuous learning."
//         },
//         {
//             icon: <ShieldCheck size={24} className="text-blue-400" />,
//             title: "Proven Results",
//             desc: "With 95% on-time delivery and 100% client satisfaction across 200+ projects, we've established a reputation for reliability and quality."
//         }
//     ];

//     return (
//         <motion.section
//             id="about"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={fadeIn}
//             className="pt-16 pb-20 bg-slate-900"
//         >
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <motion.div
//                     variants={staggerContainer}
//                     className="text-center mb-16"
//                 >
//                     <motion.h2 variants={slideInFromLeft} className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-blue-400">Tech Journey</span>
//                     </motion.h2>
//                     <motion.div variants={slideInFromRight} className="w-20 h-1 bg-blue-500 mx-auto"></motion.div>
//                 </motion.div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     {/* Left Column */}
//                     <motion.div
//                         variants={staggerContainer}
//                         className="space-y-8"
//                     >
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 variants={slideInFromLeft}
//                                 className="flex items-start gap-6"
//                             >
//                                 <div className="bg-blue-600/20 p-3 rounded-full">
//                                     {feature.icon}
//                                 </div>
//                                 <div>
//                                     <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
//                                     <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
//                                 </div>
//                             </motion.div>
//                         ))}

//                         <motion.div
//                             variants={slideInFromLeft}
//                             className="pt-6"
//                         >
//                             <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex items-center gap-2">
//                                 <Code size={18} />
//                                 Our Technology Stack
//                             </button>
//                         </motion.div>
//                     </motion.div>

//                     {/* Right Column */}
//                     <motion.div
//                         variants={slideInFromRight}
//                         className="relative"
//                     >
//                         <div className="relative z-10 bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
//                             <div className="p-6 bg-gradient-to-b from-slate-800 to-slate-900">
//                                 <h3 className="text-2xl font-bold text-white mb-6">Milestones Achieved</h3>

//                                 <div className="space-y-6">
//                                     {milestones.map((item, index) => (
//                                         <motion.div
//                                             key={index}
//                                             initial={{ opacity: 0, x: 20 }}
//                                             whileInView={{ opacity: 1, x: 0 }}
//                                             viewport={{ once: true, margin: "-50px" }}
//                                             transition={{ delay: index * 0.1 }}
//                                             className="flex gap-4"
//                                         >
//                                             <div className="flex flex-col items-center">
//                                                 <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
//                                                 {index !== milestones.length - 1 && (
//                                                     <div className="w-0.5 h-12 bg-blue-500/50"></div>
//                                                 )}
//                                             </div>
//                                             <div className="pb-6">
//                                                 <div className="text-blue-400 font-medium">{item.year}</div>
//                                                 <h4 className="text-white font-semibold">{item.title}</h4>
//                                                 <p className="text-gray-400 text-sm">{item.desc}</p>
//                                             </div>
//                                         </motion.div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 0.2 }}
//                             transition={{ duration: 1.5 }}
//                             className="absolute -inset-2 bg-blue-600/20 blur-lg rounded-2xl z-0"
//                         ></motion.div>
//                     </motion.div>
//                 </div>
//             </div>
//         </motion.section>
//     );
// };

// export default AboutSection;


// TechJourneyScroll.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, Code, Cpu, Globe, Award } from 'lucide-react';

const AboutSection = () => {
    const containerRef = useRef(null);
    const [activeChapter, setActiveChapter] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });

    // Generate path coordinates for the wavy timeline
    const generatePathCoordinates = () => {
        const coordinates = [];
        const chapterCount = 5;
        const widthSpacing = 300;
        const startY = 100;

        for (let i = 0; i < chapterCount; i++) {
            coordinates.push({
                x: 100 + (i * widthSpacing),
                y: startY + (i % 2 === 0 ? -50 : 50) // Creates wave effect
            });
        }
        return coordinates;
    };

    const pathCoordinates = generatePathCoordinates();

    // Generate SVG path data
    const generatePathData = () => {
        let path = `M ${pathCoordinates[0].x} ${pathCoordinates[0].y}`;

        for (let i = 1; i < pathCoordinates.length; i++) {
            const prev = pathCoordinates[i - 1];
            const curr = pathCoordinates[i];
            const controlX = (prev.x + curr.x) / 2;
            const controlY = i % 2 === 0 ? 50 : 150;

            path += ` Q ${controlX} ${controlY} ${curr.x} ${curr.y}`;
        }

        return path;
    };

    const pathData = generatePathData();

    // Chapters data
    const chapters = [
        {
            year: "2015",
            title: "The Genesis",
            icon: <Rocket className="text-blue-400" size={28} />,
            description: "Three engineers in a garage dreamed of making enterprise tech accessible to all.",
            stats: [
                { value: "12", label: "Pioneer Clients" },
                { value: "100%", label: "Retention" }
            ],
            point: pathCoordinates[0]
        },
        {
            year: "2017",
            title: "First Breakthrough",
            icon: <Code className="text-blue-400" size={28} />,
            description: "Developed our rapid deployment framework that cut development cycles by 40%.",
            stats: [
                { value: "3x", label: "Revenue Growth" },
                { value: "40%", label: "Faster Delivery" }
            ],
            point: pathCoordinates[1]
        },
        {
            year: "2019",
            title: "AI Revolution",
            icon: <Cpu className="text-blue-400" size={28} />,
            description: "Launched AI division with predictive analytics solutions.",
            stats: [
                { value: "5", label: "AI Patents" },
                { value: "78%", label: "Accuracy Boost" }
            ],
            point: pathCoordinates[2]
        },
        {
            year: "2022",
            title: "Global Expansion",
            icon: <Globe className="text-blue-400" size={28} />,
            description: "Opened offices in London, Singapore, and New York.",
            stats: [
                { value: "3", label: "Continents" },
                { value: "50+", label: "Team Members" }
            ],
            point: pathCoordinates[3]
        },
        {
            year: "2023",
            title: "Industry Recognition",
            icon: <Award className="text-blue-400" size={28} />,
            description: "Named 'Most Innovative Tech Partner' by TechWorld Awards.",
            stats: [
                { value: "97%", label: "Satisfaction" },
                { value: "ISO", label: "27001 Certified" }
            ],
            point: pathCoordinates[4]
        }
    ];

    // Handle scroll to update active chapter
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isScrolling) return;

            const containerHeight = container.clientHeight;
            const scrollPosition = container.scrollTop + containerHeight / 2;
            const chapterHeight = container.scrollHeight / chapters.length;
            const newChapter = Math.floor(scrollPosition / chapterHeight);

            if (newChapter !== activeChapter) {
                setActiveChapter(newChapter);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [activeChapter, isScrolling]);

    // Auto-scroll to chapter when activeChapter changes
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isScrolling) return;

        const chapterHeight = container.scrollHeight / chapters.length;
        container.scrollTo({
            top: activeChapter * chapterHeight,
            behavior: 'smooth'
        });

        const timer = setTimeout(() => setIsScrolling(false), 1000);
        return () => clearTimeout(timer);
    }, [activeChapter, isScrolling]);

    // Animation for path progress
    const pathProgress = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1]
    );

    return (
        <div className="relative h-screen w-full overflow-hidden bg-slate-900">
            {/* SVG Path Background */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                viewBox="0 0 1600 200"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>

                {/* Base Path */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    strokeOpacity="0.3"
                    strokeDasharray="10 5"
                />

                {/* Animated Progress Path */}
                <motion.path
                    d={pathData}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                        pathLength: pathProgress,
                        opacity: pathProgress
                    }}
                />

                {/* Chapter Points */}
                {chapters.map((chapter, index) => (
                    <motion.circle
                        key={index}
                        cx={chapter.point.x}
                        cy={chapter.point.y}
                        r="10"
                        fill="#3b82f6"
                        initial={{ scale: 0 }}
                        animate={{
                            scale: activeChapter >= index ? 1 : 0.6,
                            fill: activeChapter >= index ? "#3b82f6" : "#64748b"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                ))}
            </svg>

            {/* Scrollable Chapters Container */}
            <div
                ref={containerRef}
                className="relative z-10 h-full w-full overflow-y-auto snap-y snap-mandatory"
                onScroll={() => setIsScrolling(false)}
            >
                {chapters.map((chapter, index) => (
                    <section
                        key={index}
                        className="h-full w-full flex items-center justify-center snap-start"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: activeChapter === index ? 1 : 0.3,
                                y: activeChapter === index ? 0 : 30,
                                scale: activeChapter === index ? 1 : 0.95
                            }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className={`max-w-2xl mx-auto p-8 rounded-3xl backdrop-blur-lg ${activeChapter === index ? 'bg-slate-800/80 border border-blue-500/30 shadow-xl' : 'bg-slate-800/20'}`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-blue-900/30 rounded-xl">
                                    {chapter.icon}
                                </div>
                                <div>
                                    <div className="text-blue-400 font-mono">{chapter.year}</div>
                                    <h3 className="text-3xl font-bold text-white">{chapter.title}</h3>
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg mb-8">{chapter.description}</p>

                            <div className="flex gap-4">
                                {chapter.stats.map((stat, statIndex) => (
                                    <motion.div
                                        key={statIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: activeChapter === index ? 1 : 0 }}
                                        transition={{ delay: statIndex * 0.1 + 0.3 }}
                                        className="bg-slate-700/50 px-6 py-3 rounded-lg border border-slate-600/50"
                                    >
                                        <div className="text-blue-400 font-bold text-2xl">{stat.value}</div>
                                        <div className="text-gray-400 text-sm">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
                {chapters.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setActiveChapter(index);
                            setIsScrolling(true);
                        }}
                        className="focus:outline-none"
                    >
                        <motion.div
                            animate={{
                                scale: activeChapter === index ? 1.2 : 1,
                                backgroundColor: activeChapter === index ? "#3b82f6" : "#475569"
                            }}
                            transition={{ type: "spring", stiffness: 500 }}
                            className="w-3 h-3 rounded-full cursor-pointer"
                        />
                    </button>
                ))}
            </div>

            {/* Scroll Indicator */}
            <AnimatePresence>
                {activeChapter < chapters.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-600 flex items-center gap-2 z-20"
                    >
                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5
                            }}
                        >
                            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                        <span className="text-gray-300 text-sm">Scroll to continue</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutSection;