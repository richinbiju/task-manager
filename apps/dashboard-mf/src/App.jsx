const cards = [
  {
    title: "Tasks",
    value: "24",
  },
  {
    title: "Completed",
    value: "18",
  },
  {
    title: "Pending",
    value: "6",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-green-950 text-white p-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-green-900 p-8 rounded-2xl"
            >
              <h2 className="text-xl text-green-200">
                {card.title}
              </h2>

              <p className="text-5xl font-bold mt-4">
                {card.value}
              </p>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}