export default function App() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl">

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-8">
          Sign in to continue
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none"
          />

          <button
            className="w-full bg-white text-black py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}