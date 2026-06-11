export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center md:justify-start">
        <a href="/" className="flex title-font font-bold items-center text-white mb-4 md:mb-0 cursor-pointer transform transition hover:scale-105">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-blue-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-2xl tracking-wide">Tarefas<span className="text-blue-200">App</span></span>
        </a>
      </div>
    </header>
  )
}