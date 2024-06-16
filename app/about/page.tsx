export default function About() {
  return (
    <main>
      <div className="px-12 py-6 flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight pb-4">
          About Pegaz-2.0
        </h1>
        <p>
          Pegaz 2.0 is a university e-learing platform based on <a href="https://pegaz.uj.edu.pl/" className="text-blue-500 hover:underline">pegaz.uj.edu.pl</a>.
        </p>
        <p>
          It has less functionality, but a nicer UI 😊
        </p>
        <p>
          The app is built using Next.js 14, Tailwind CSS, Prisma and Neon.
        </p>
      </div>
    </main>
  )
}