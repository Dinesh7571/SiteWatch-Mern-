import React from 'react'

const Feature = () => {
  return (
    <div className="bg-black">
    <section id="features" className="relative block px-6 py-10 md:py-20 md:px-10 border-t border-b border-neutral-900 bg-neutral-900/30">
      <div className="relative mx-auto max-w-5xl text-center">
        <span className="text-gray-400 my-3 flex items-center justify-center font-medium uppercase tracking-wider">
          Why choose us
        </span>
        <h2 className="block w-full bg-gradient-to-b from-white to-gray-400 bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
          Build a Website That Your Customers Love
        </h2>
        <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-400">
          Our templates allow for maximum customization. No technical skills required – our intuitive design tools let you get the job done easily.
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl z-10 grid grid-cols-1 gap-10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-md border border-neutral-800 bg-neutral-900/50 p-8 text-center shadow">
          <div className="button-text mx-auto flex h-12 w-12 items-center justify-center rounded-md border"
            style={{ backgroundImage: 'linear-gradient(rgb(80, 70, 229) 0%, rgb(43, 49, 203) 100%)', borderColor: 'rgb(93, 79, 240)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-color-swatch" width="24"
              height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
              strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
              <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
              <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
              <line x1="17" y1="17" x2="17" y2="17.01"></line>
            </svg>
          </div>
          <h3 className="mt-6 text-gray-400">Customizable</h3>
          <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400">Tailor your landing page's look and feel, from the color scheme to the font size, to the design of the page.</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
        style={{ backgroundImage: 'linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}>
      </div>
      <div className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
        style={{ backgroundImage: 'linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}>
      </div>
    </section>
  </div>
  )
}

export default Feature