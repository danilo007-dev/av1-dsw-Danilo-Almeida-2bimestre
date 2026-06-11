import Header from "./components/Header"
import TarefasPage from "./Pages/TarefasPage"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="p-8">
        <TarefasPage />
      </main>
    </div>
  )
}