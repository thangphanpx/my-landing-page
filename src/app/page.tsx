import React from "react";

export default function Home() {
  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00D2FF]" data-icon="blur_on">
              blur_on
            </span>
            <span className="text-xl font-black tracking-widest text-[#00D2FF] drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] font-headline">
              NEON_NOCTURNE
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 font-label uppercase tracking-widest text-[10px]">
            <a className="text-[#00D2FF] border-b-2 border-[#00D2FF] pb-1" href="#hero">
              Hero
            </a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors duration-300" href="#about">
              About
            </a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors duration-300" href="#services">
              Services
            </a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors duration-300" href="#portfolio">
              Portfolio
            </a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors duration-300" href="#contact">
              Contact
            </a>
          </div>
          <button className="md:hidden text-[#00D2FF]">
            <span className="material-symbols-outlined" data-icon="menu">
              menu
            </span>
          </button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="min-h-screen flex items-center pt-20 px-8 relative overflow-hidden bg-gradient-to-br from-surface via-surface to-surface-container-low"
          id="hero"
        >
          {/* Signature Texture Ambient Glow */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-container/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 blur-[100px] rounded-full"></div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full z-10">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-primary-container/10 border border-primary-container/20">
                <span className="font-label text-primary text-xs uppercase tracking-[0.2em]">
                  Available for projects
                </span>
              </div>
              <h1 className="font-headline font-extrabold text-7xl lg:text-8xl text-on-surface leading-tight tracking-tighter">
                Crafting <span className="text-primary-container drop-shadow-[0_0_15px_rgba(0,210,255,0.3)]">Digital</span> Experiences.
              </h1>
              <p className="text-on-surface-variant text-xl max-w-lg font-body leading-relaxed">
                I am the Digital Curator, blending futuristic neon aesthetics with high-performance engineering to build the next generation of the web.
              </p>
              <div className="flex gap-6 pt-4">
                <button className="bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-headline font-bold py-4 px-10 rounded-xl hover:scale-[1.02] transition-transform">
                  View Portfolio
                </button>
                <button className="bg-surface-variant/20 backdrop-blur-md border border-outline-variant/15 text-on-surface font-headline font-bold py-4 px-10 rounded-xl hover:bg-surface-variant/40 transition-all">
                  Let&apos;s Talk
                </button>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full p-2 bg-gradient-to-tr from-primary-container via-transparent to-secondary-container shadow-[0_0_60px_rgba(0,210,255,0.15)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface-container">
                  <img
                    alt="Avatar"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDpmK-Xft1cG2PH1_bX1ZMEJ7BUnNN70pKj-5Po8uUylFLDbuiHU1JdDVvFczQDpks8lebCqKswdzqjAssXe8fDleYBlgHjJg-qnbAHqeEvI28Cf6rTDG2QT0a2lvSMgsjQ8oAztmxf3qqRlYKf4vAPlrPD8OyrqAT8yVB0kEvbV8JYX17OPCWfsjoqBoubmZE7djyps9sAbNv4KYC7TC_cRQybESitVw0sWCPuCZUOEiug4F-SQVjOQBQb5paxlOsS16W-lQQCO4"
                  />
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-primary-container/40 rounded-tr-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-secondary-container/40 rounded-bl-3xl"></div>
            </div>
          </div>
        </section>

        {/* About Me */}
        <section className="py-24 bg-surface-container-low" id="about">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20">
              <h2 className="font-label text-primary-container text-sm tracking-[0.3em] uppercase mb-4">Identity</h2>
              <h3 className="font-headline text-5xl text-on-surface font-bold">Behind the Screen</h3>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Bento Style Card */}
              <div className="lg:col-span-2 bg-surface-container-high rounded-xl p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group">
                <div className="z-10">
                  <h4 className="font-headline text-3xl text-on-surface mb-6">Driven by Precision</h4>
                  <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
                    With over 8 years in the digital space, I&apos;ve curated experiences for global brands and boutique startups. My philosophy is simple: technology should be felt, not just seen. I specialize in high-fidelity interfaces that prioritize user intuition while pushing the boundaries of modern aesthetics.
                  </p>
                </div>
                <div className="mt-12 flex gap-12 z-10">
                  <div>
                    <div className="text-4xl font-headline font-extrabold text-primary-container">08+</div>
                    <div className="font-label text-[10px] uppercase tracking-widest mt-2">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-4xl font-headline font-extrabold text-secondary">150+</div>
                    <div className="font-label text-[10px] uppercase tracking-widest mt-2">Projects Delivered</div>
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
              </div>
              {/* Skills Side Card */}
              <div className="bg-surface-container-highest rounded-xl p-8 border border-white/5 space-y-6">
                <h4 className="font-label text-xs uppercase tracking-widest text-primary-container border-b border-primary-container/20 pb-4">Core Arsenal</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-surface-container flex flex-col items-center gap-3 hover:bg-surface-variant transition-colors group">
                    <span className="material-symbols-outlined text-primary-container" data-icon="terminal">terminal</span>
                    <span className="font-label text-[10px] uppercase tracking-wider">Frontend</span>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container flex flex-col items-center gap-3 hover:bg-surface-variant transition-colors group">
                    <span className="material-symbols-outlined text-primary-container" data-icon="draw">draw</span>
                    <span className="font-label text-[10px] uppercase tracking-wider">UI/UX</span>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container flex flex-col items-center gap-3 hover:bg-surface-variant transition-colors group">
                    <span className="material-symbols-outlined text-primary-container" data-icon="database">database</span>
                    <span className="font-label text-[10px] uppercase tracking-wider">System</span>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container flex flex-col items-center gap-3 hover:bg-surface-variant transition-colors group">
                    <span className="material-symbols-outlined text-primary-container" data-icon="bolt">bolt</span>
                    <span className="font-label text-[10px] uppercase tracking-wider">Motion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Services */}
        <section className="py-24 bg-surface" id="services">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="font-label text-secondary text-sm tracking-[0.3em] uppercase mb-4">Capabilities</h2>
                <h3 className="font-headline text-5xl text-on-surface font-bold">Solutions for the Future</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-0 border border-white/5 rounded-xl overflow-hidden">
              {/* Service Card 1 */}
              <div className="p-12 bg-surface-container border-r border-white/5 group hover:bg-surface-container-high transition-all duration-500">
                <div className="w-12 h-1 w-0 bg-primary-container group-hover:w-full transition-all duration-500 mb-8 glow-indicator"></div>
                <span className="material-symbols-outlined text-primary-container text-4xl mb-6" data-icon="web">web</span>
                <h4 className="font-headline text-2xl text-on-surface mb-4">Visual Architecture</h4>
                <p className="text-on-surface-variant leading-relaxed">Developing robust, scalable web architectures that serve as the backbone for your digital presence.</p>
              </div>
              {/* Service Card 2 */}
              <div className="p-12 bg-surface-container border-r border-white/5 group hover:bg-surface-container-high transition-all duration-500">
                <div className="w-12 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-500 mb-8 shadow-[0_0_15px_rgba(237,177,255,0.5)]"></div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6" data-icon="palette">palette</span>
                <h4 className="font-headline text-2xl text-on-surface mb-4">Brand Curation</h4>
                <p className="text-on-surface-variant leading-relaxed">Crafting unique identities that resonate in a saturated market through strategic visual storytelling.</p>
              </div>
              {/* Service Card 3 */}
              <div className="p-12 bg-surface-container group hover:bg-surface-container-high transition-all duration-500">
                <div className="w-12 h-1 w-0 bg-primary-container group-hover:w-full transition-all duration-500 mb-8 glow-indicator"></div>
                <span className="material-symbols-outlined text-primary-container text-4xl mb-6" data-icon="auto_awesome">auto_awesome</span>
                <h4 className="font-headline text-2xl text-on-surface mb-4">AI Integration</h4>
                <p className="text-on-surface-variant leading-relaxed">Leveraging cutting-edge AI tools to enhance productivity and create smarter user experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-24 bg-surface-container-low" id="portfolio">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-16 text-center">
              <h2 className="font-label text-primary-container text-sm tracking-[0.3em] uppercase mb-4">Archive</h2>
              <h3 className="font-headline text-5xl text-on-surface font-bold">Selected Works</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <div className="lg:col-span-2 relative group rounded-xl overflow-hidden aspect-[16/9]">
                <img
                  alt="Project 1"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnYWfM96z8j7Typ1IpbtY6vQpDADOqtehKE7ShiG1u23mxkBaWK-Om2ASUUma7pDs9lQD4V2VUW-N66Gz0eTkSK-tx7gDxqSyHNF26xQCYX2jZ-Ot9kWfixydrciUUQKSP-8b_4NjY-bekcsFu0n0EPYZPtPhYhebzFvq2a-qWOd8MTP4F-jpNlKDr0Fxa8Cd5mI57WgQFq0eeN_OXgy3vk7UAyvsjjwraWf9a9cY-AGxjBkwdZ-9ZMra0WJyt0nW7D7tb8KziwFE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full flex justify-between items-end">
                  <div>
                    <span className="font-label text-primary text-xs uppercase tracking-widest mb-2 block">Fintech 2024</span>
                    <h4 className="font-headline text-3xl text-on-surface">Nexus Dashboard</h4>
                  </div>
                  <button className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-primary-container hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined" data-icon="arrow_outward">arrow_outward</span>
                  </button>
                </div>
              </div>
              {/* Project 2 */}
              <div className="relative group rounded-xl overflow-hidden aspect-[4/5]">
                <img
                  alt="Project 2"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB87hDdYqDrCCL9gIZFAvXg6EWvZ-euXU7jQ9KlgWaZrqMXor5aYqTrQRGEiHBnsC6LZf2foYgoZA6FZpCq6s_ILNnN5GZExVETNsbJQiRtc3nONt6FvhK4XCUMbR3hDCT9O1XpshEq4jT4ShlivJkja5R7Ex1vvtbbYSLA3FZR3rMd9VWLXa9vdTbZdLAgnZoIKdvIXaDdyweNtDMDNDb7g7Ca6nSPPYWzvUsN3HcR9-fofadfL4gqZdrtyoMgwh8ScvbU6eR5OCE"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="font-label text-secondary text-xs uppercase tracking-widest mb-2 block">E-Commerce</span>
                  <h4 className="font-headline text-2xl text-on-surface">Lumina Store</h4>
                </div>
              </div>
              {/* Project 3 */}
              <div className="relative group rounded-xl overflow-hidden aspect-[4/5]">
                <img
                  alt="Project 3"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG4njV4hZeD_cZAffnXRqrWOVOujYQHK26YltNcYtFYoKe9rJNIhX9wZpeaD0Ck4SXVb4axbJnws0dGDoKj7hWNaAN3NqpP-iQPSGMgjBfSD57Q6DT1-OEw_7Fwz6RixsgZFu6RyfHUaKkfBroR_OtaGVp_LJSwl_1UAFFjDJI29DfCIt9ICdNp_wlXx5MVOWiOcd4eGnB_EjGu6qoKAPBo2u5qmeDDo2CQmwyoZlIPiHlX5B1HkiZNAhjJNhCgZc7TUTE3lLo8eQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="font-label text-primary text-xs uppercase tracking-widest mb-2 block">AI SaaS</span>
                  <h4 className="font-headline text-2xl text-on-surface">Synapse AI</h4>
                </div>
              </div>
              {/* Project 4 */}
              <div className="lg:col-span-2 relative group rounded-xl overflow-hidden aspect-[16/9]">
                <img
                  alt="Project 4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN5xTfatltFMrPkFA9YWWJiODSQ3c4X2W13vwyTnhKHBHR-J4IHOJNhPfaV5fbJOW-yt4JIftEUJU8cnP6FhQzyetsyL3KHkenROt7DIcOgIi3LWJo2qZp0vc9nADN2L1iszlFF_kqvfUsT29SRuL23v7Bif0f6rThxQE7E3txfdvOoK-ED0VhfcEvWBFR69WsmtqMLtBLNV5z3LEKhLI45K2yjIAb_2Z48lIsu32fjyM9ql42RwLK04WSQi5mwIFECzXTeZi9q_g"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full flex justify-between items-end">
                  <div>
                    <span className="font-label text-secondary text-xs uppercase tracking-widest mb-2 block">Web3 Platform</span>
                    <h4 className="font-headline text-3xl text-on-surface">Ether Flow</h4>
                  </div>
                  <button className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-secondary hover:text-on-secondary transition-all">
                    <span className="material-symbols-outlined" data-icon="arrow_outward">arrow_outward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-surface relative overflow-hidden" id="contact">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-container/5 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="max-w-3xl mx-auto px-8 relative z-10 text-center">
            <h2 className="font-label text-primary-container text-sm tracking-[0.3em] uppercase mb-4">Connection</h2>
            <h3 className="font-headline text-5xl text-on-surface font-bold mb-12">Initiate Collaboration</h3>
            <form className="space-y-6 text-left">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Full Name</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all"
                    placeholder="Your Name"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Email Address</label>
                  <input
                    className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant ml-2">Project Brief</label>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/15 rounded-xl py-4 px-6 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/20 transition-all"
                  placeholder="Tell me about your vision..."
                  rows={5}
                ></textarea>
              </div>
              <button className="w-full bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-headline font-bold py-5 rounded-xl hover:scale-[1.01] transition-transform shadow-[0_10px_25px_-5px_rgba(0,210,255,0.4)]">
                Send Message
              </button>
            </form>
            <div className="mt-16 flex justify-center gap-12 border-t border-white/5 pt-12">
              <a className="text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined text-sm" data-icon="mail">mail</span>
                <span className="font-label text-xs uppercase tracking-widest">hello@nocturne.io</span>
              </a>
              <a className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-2" href="#">
                <span className="material-symbols-outlined text-sm" data-icon="chat">chat</span>
                <span className="font-label text-xs uppercase tracking-widest">Schedule Call</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#131313] w-full py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[#00D2FF] font-bold font-headline tracking-widest">NEON_NOCTURNE</span>
            <p className="font-label text-[10px] text-on-surface-variant tracking-tighter uppercase">
              © 2024 DIGITAL CURATOR. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex gap-8">
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors font-label text-xs uppercase tracking-widest" href="#">LinkedIn</a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors font-label text-xs uppercase tracking-widest" href="#">GitHub</a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors font-label text-xs uppercase tracking-widest" href="#">Dribbble</a>
            <a className="text-[#BBC9CF] hover:text-[#00D2FF] transition-colors font-label text-xs uppercase tracking-widest" href="#">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
