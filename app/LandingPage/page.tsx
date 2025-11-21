import React from 'react'


const LandingPage = () => {

return (
<div className="min-h-screen w-full bg-black text-white font-sans overflow-hidden min-h-screen bg-black text-white flex flex-col">

{/* NAVBAR */}
<nav className="w-full flex items-center justify-between px-8 py-6">
<h1 className="text-2xl font-extrabold text-purple-400">Studio<span className="text-white">Prompter</span></h1>


<ul className="hidden md:flex items-center gap-6 text-sm">
<li className="cursor-pointer hover:text-purple-400 transition fade-up">HOME</li>
<li className="cursor-pointer hover:text-purple-400 transition fade-up">FEATURES</li>
<li className="cursor-pointer hover:text-purple-400 transition fade-up">PRICING</li>
<li className="cursor-pointer hover:text-purple-400 transition fade-up">CONTACT</li>
</ul>


<button className="fade-up bg-purple-500 px-5 py-2 rounded-full text-xs font-semibold hover:bg-purple-600 transition">
REGISTER
</button>
</nav>


{/* HERO SECTION */}
<div className="flex flex-col max-w-3xl px-10 mt-28 md:mt-40">
<h2 className="text-4xl md:text-6xl font-extrabold leading-tight fade-up">
<span className="text-purple-400">READ</span> SMOOTH
</h2>
<h2 className="text-4xl md:text-6xl font-extrabold mt-2 fade-up">
RECORD <span className="text-purple-400">CONFIDENT</span>
</h2>


<p className="mt-6 text-sm max-w-lg fade-up text-zinc-300">
CLEAN, FAST AND SIMPLE TELEPROMPTER BUILT FOR CREATORS, SPEAKERS AND PROFESSIONALS
</p>


{/* BUTTONS */}
<div className="flex gap-4 mt-8 fade-up">
<button className="bg-purple-500 hover:bg-purple-600 transition px-6 py-2 rounded-full text-sm font-semibold">
GET STARTED →
</button>
<button className="border border-white px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition font-semibold">
LEARN MORE →
</button>
</div>
</div>


{/* BACKGROUND GRADIENT */}
<div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-700 opacity-30 blur-[150px] rounded-full -z-10" />
</div>
);
}

export default LandingPage

