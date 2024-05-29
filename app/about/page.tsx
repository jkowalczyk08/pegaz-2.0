export default function About() {
  return (
    <main>
      <div className="p-8 flex flex-col space-y-2">
        <h1 className="text-5xl font-bold tracking-tight pb-4">
          About
        </h1>
        <p>
          Pegaz 2.0 is a university e-learing platform based on <a href="https://pegaz.uj.edu.pl/" className="text-blue-500 hover:underline">pegaz.uj.edu.pl</a>.
        </p>
        <p>
          It has less functionality, but a nicer UI 😊
        </p>
      </div>
    </main>
  )
}