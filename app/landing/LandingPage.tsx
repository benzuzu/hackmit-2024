export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-lg mb-8">Your one-stop solution for cool web experiences</p>
        <a
          href="#"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Get Started
        </a>
      </header>
    </div>
  )
}
