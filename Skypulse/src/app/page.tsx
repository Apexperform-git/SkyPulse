"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Globe, Layers, Plane, Zap, ShieldCheck, ChevronDown, CheckCircle2, Star, Smartphone, Code, Github } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-[#F18E22] selection:text-white overflow-hidden font-sans">
            {/* Background ambient glow */}
            <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none opacity-50 z-0">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#0D4D82]/30 via-[#0D4D82]/10 to-transparent blur-[120px] rounded-full" />
                <div className="absolute top-[100px] right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#F18E22]/10 to-transparent blur-[150px] rounded-full" />
            </div>

            <main className="relative z-10">
                {/* Navbar */}
                <nav className="fixed top-0 inset-x-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all">
                    <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Image src="/logo.svg" alt="SkyPulse 3D Live Flight Tracker Logo" width={40} height={40} className="drop-shadow-lg" />
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                                SkyPulse
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
                            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
                        </div>
                        <a href="#download" className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all">
                            Get the App
                        </a>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-40 pb-20 sm:pt-48 sm:pb-32 px-6 lg:px-8 max-w-[1440px] mx-auto">
                    <div className="lg:flex lg:items-center lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="lg:w-[50%] text-center lg:text-left z-20"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0D4D82]/40 to-[#0D4D82]/10 border border-[#0D5587]/50 text-[#F18E22] text-sm font-medium mb-8 shadow-inner shadow-[#0D5587]/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F18E22] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F79220]"></span>
                                </span>
                                #1 3D Live Aviation Radar
                            </div>
                            <h1 className="text-5xl sm:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-6 leading-[1.1]">
                                Track live flights <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F18E22] via-[#F79220] to-[#FFB75E]">
                                    in stunning 3D.
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                                Transform your device into a powerful live aviation radar. Watch thousands of aircraft move in real-time with precise altitude visualization and comprehensive ADS-B telemetry data.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <a
                                    href="#download"
                                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-[#F79220] to-[#E57E15] px-8 py-4 text-lg font-bold text-[#050505] hover:scale-105 hover:shadow-[0_0_40px_-10px_#F18E22] transition-all w-full sm:w-auto ring-1 ring-white/20 ring-inset whitespace-nowrap"
                                >
                                    <Smartphone className="w-6 h-6 opacity-90 text-[#050505]" />
                                    Download for Android
                                </a>
                                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4 sm:mt-0 font-medium">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#050505] flex items-center justify-center">
                                                <Star className="w-3 h-3 text-[#F18E22] fill-[#F18E22]" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="ml-2">Loved by aviation geeks</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Hero Graphic / Interactive Element */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="mt-20 lg:mt-0 lg:w-[50%] relative z-10 hidden lg:block"
                        >
                            <motion.div style={{ y: yHeroImage }} className="relative w-full aspect-square rounded-[2.5rem] bg-gradient-to-b from-white/5 to-white/[0.01] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl p-2 md:p-4">
                                <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay"></div>
                                <div className="h-full w-full rounded-[2rem] bg-black/50 overflow-hidden relative flex flex-col items-center justify-center group border border-white/5">
                                    {/* App Screenshot */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0D4D82]/30 to-transparent pointer-events-none mix-blend-overlay z-20"></div>
                                    <img
                                        src="/mockup-app.png"
                                        alt="SkyPulse App Interface 3D Map"
                                        className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Mock UI Elements floating */}
                                    <div className="absolute bottom-10 left-6 right-6 h-20 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
                                        <div className="w-12 h-12 rounded-xl bg-[#0D4D82]/50 flex items-center justify-center">
                                            <Plane className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold">DAL302</div>
                                            <div className="text-white/60 text-xs">A330-300 • 34,000 ft</div>
                                        </div>
                                        <div className="ml-auto text-right">
                                            <div className="text-[#F18E22] font-mono font-bold">482 kts</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Social Proof / Trusted Partners */}
                <section className="py-10 border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
                        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
                            Powered by global aviation data networks
                        </p>
                        <div className="flex flex-wrap justify-center gap-12 sm:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for OpenSky, ADS-B Exchange, etc. if you want logos later */}
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-xl font-bold font-mono"><Globe className="w-6 h-6" /> OpenSky Network</div>
                                <span className="text-xs mt-1">Live Flight Data</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-xl font-bold font-mono"><Layers className="w-6 h-6" /> MapTiler & OSM</div>
                                <span className="text-xs mt-1">Global Base Maps</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-2 text-xl font-bold font-mono"><Zap className="w-6 h-6" /> deck.gl</div>
                                <span className="text-xs mt-1">3D Rendering Engine</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Z-Pattern Deep Dive Features */}
                <section id="features" className="py-32 relative">
                    <div className="max-w-[1440px] mx-auto px-6 lg:px-8 space-y-32">

                        {/* Feature 1 */}
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2 order-2 lg:order-1">
                                <div className="aspect-square rounded-[2rem] bg-gradient-to-tr from-[#0D4D82]/20 to-transparent border border-[#0D5587]/30 p-8 relative overflow-hidden group flex items-center justify-center">
                                    <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay"></div>
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        {/* Logo Representation */}
                                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center perspective-[1000px]">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#0D4D82]/40 blur-[80px] rounded-full group-hover:bg-[#F18E22]/20 transition-colors duration-700" />
                                            <Image
                                                src="/logo.svg"
                                                alt="SkyPulse App Logo"
                                                width={200}
                                                height={200}
                                                className="drop-shadow-[0_0_30px_rgba(241,142,34,0.3)] z-10 group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 order-1 lg:order-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                                    <Layers className="w-4 h-4 text-[#F18E22]" /> Depth Perception
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Truly Understand <span className="text-[#F18E22]">Altitude</span>.</h2>
                                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                    Traditional 2D flight trackers plot planes on a flat map. SkyPulse breaks the mold by rendering the entire globe in 3D. When you pan and tilt the camera, you instantly see the literal layering of aircraft stacked in the airspace above you.
                                </p>
                                <ul className="space-y-4">
                                    {['Interactive 3D globe visualization', 'Color-coded altitude gradients', 'Intuitive camera controls (tilt & rotate)'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-[#0D5587]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6">
                                    <Zap className="w-4 h-4 text-[#F18E22]" /> Live Telemetry
                                </div>
                                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Data updated the <span className="text-[#F18E22]">second</span> it broadcasts.</h2>
                                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                    Powered by a global network of ADS-B receivers, SkyPulse doesn't just show you where a plane is; it shows you what it's doing. Tap any aircraft to reveal a comprehensive flight dashboard.
                                </p>
                                <ul className="space-y-4">
                                    {['Live speed & heading calculations', 'Vertical climb/descent rate monitoring', 'Flight origin, destination, and callsigns'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle2 className="w-5 h-5 text-[#0D5587]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:w-1/2">
                                <div className="aspect-square rounded-[2rem] bg-gradient-to-bl from-[#F18E22]/10 to-transparent border border-[#F18E22]/20 p-8 relative overflow-hidden group">
                                    <Zap className="absolute -top-10 -right-10 w-64 h-64 text-[#F18E22]/10 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="relative z-10 h-full w-full flex flex-col gap-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-[#050505]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-between transform transition-transform hover:scale-105 cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                                        <Plane className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm">KLM123</div>
                                                        <div className="text-xs text-gray-500">B737 &bull; AMS &rarr; LHR</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[#0D5587] font-mono text-sm font-bold">420 kts</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Open Source Section */}
                <section id="opensource" className="py-24 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#F18E22]/50 to-transparent top-0"></div>
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                        <div className="w-16 h-16 rounded-full bg-[#0D4D82]/30 border border-[#0D5587]/50 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_-5px_#0D5587]">
                            <Code className="w-8 h-8 text-[#F18E22]" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Proudly Open Source</h2>
                        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
                            SkyPulse is licensed under the <strong>AGPLv3 License</strong>. We believe in transparency and community collaboration. You can view, audit, and contribute to our source code.
                        </p>
                        <a
                            href="https://github.com/skypulse/skypulse"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-white/5 border border-white/20 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            View Source on GitHub
                        </a>
                    </div>
                </section>

                {/* FAQ Section for Long Tail SEO */}
                <section id="faq" className="py-24 bg-white/[0.02] border-t border-white/5">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-400">Everything you need to know about tracking flights with SkyPulse.</p>
                        </div>
                        <div className="space-y-4">
                            <FAQItem
                                question="Is the airplane tracking data actually real-time?"
                                answer="Yes. SkyPulse connects to robust ADS-B (Automatic Dependent Surveillance–Broadcast) networks. Aircraft constantly broadcast their GPS position, speed, and altitude. We parse this raw telemetry and render it on your screen with minimal latency."
                            />
                            <FAQItem
                                question="Does this flight radar app show private jets?"
                                answer="SkyPulse tracks any aircraft broadcasting unblocked ADS-B signals. While many commercial flights are visible globally, the visibility of private or military aircraft depends on their transponder settings and regional regulations."
                            />
                            <FAQItem
                                question="Why should I use a 3D flight tracker over a 2D map?"
                                answer="Aviation operates in three dimensions. 2D maps fail to convey altitude, often making congested airspace look like overlapping icons. Our 3D visualization lets you tilt the map to literally see planes stacked at different flight levels, offering a much more accurate understanding of the sky."
                            />
                            <FAQItem
                                question="Is SkyPulse available on iOS/iPhone?"
                                answer="Currently, SkyPulse is launched exclusively as an Android application. We are focusing on optimizing the 3D WebGL performance for Android devices first. An iOS version is planned for the future."
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section id="download" className="py-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0D4D82]/20" />
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-bold mb-8">Ready to take control of the sky?</h2>
                        <p className="text-xl text-gray-400 mb-10">Download the ultimate companion for aviation enthusiasts, spotters, and frequent flyers today.</p>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-lg font-bold text-[#050505] hover:bg-gray-200 hover:scale-105 transition-all shadow-xl whitespace-nowrap"
                        >
                            <Smartphone className="w-6 h-6 text-[#050505]" />
                            Get SkyPulse Free on Android
                        </a>
                        <p className="mt-6 text-sm text-gray-500">Requires Android 8.0 or higher. Free to use with ads.</p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 bg-[#020202] pt-16 pb-8">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Image src="/logo.svg" alt="SkyPulse Logo" width={32} height={32} />
                                    <span className="text-xl font-bold text-white">SkyPulse</span>
                                </div>
                                <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                                    The next generation of flight tracking. Experience live aviation data with unparalleled 3D depth and accuracy.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Application</h4>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#download" className="hover:text-white transition-colors">Android App</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                    <li><a href="mailto:support@skypulse.live" className="hover:text-white transition-colors">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
                            <p>© {new Date().getFullYear()} SkyPulse. All rights reserved.</p>
                            <p className="mt-2 md:mt-0">Flight data is provided for informational purposes only. Do not use for navigation.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden transition-colors hover:bg-white/[0.03]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-semibold text-lg text-gray-200">{question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                    {answer}
                </div>
            </div>
        </div>
    )
}
