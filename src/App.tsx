import { useState } from 'react';
import { Card } from './components/Card';
import { Modal } from './components/Modal';

const cards = [
  {
    title: "XRP Ledger Validator",
    description: "XRP Ledger Mainnet Validator, since 2024.",
    colorClass: "bg-gradient-to-br from-purple-400 to-indigo-500",
    isPlaceholder: false
  },
  {
    title: "Coming Soon",
    description: "New content is being crafted for this space. Stay tuned for mind-expanding discoveries.",
    colorClass: "bg-gradient-to-br from-gray-400 to-gray-500",
    isPlaceholder: true
  },
  {
    title: "Coming Soon",
    description: "New content is being crafted for this space. Stay tuned for mind-expanding discoveries.",
    colorClass: "bg-gradient-to-br from-gray-400 to-gray-500",
    isPlaceholder: true
  },
  {
    title: "Coming Soon",
    description: "Another fascinating journey awaits. Check back for updates.",
    colorClass: "bg-gradient-to-br from-gray-400 to-gray-500",
    isPlaceholder: true
  },
  {
    title: "Coming Soon",
    description: "A new dimension of understanding is under construction.",
    colorClass: "bg-gradient-to-br from-gray-400 to-gray-500",
    isPlaceholder: true
  },
  {
    title: "Coming Soon",
    description: "The future holds endless possibilities. Watch this space.",
    colorClass: "bg-gradient-to-br from-gray-400 to-gray-500",
    isPlaceholder: true
  },
];

function App() {
  const [selectedCard, setSelectedCard] = useState<typeof cards[0] | null>(null);

  return (
    <div className="min-h-screen animate-gradient">
      {/* Header */}
      <header className="fixed top-0 w-full backdrop-blur-lg z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/images/logo/logo.png"
                alt="xrpl.app logo"
                width="100"
              />
              <span className="hidden text-2xl font-bold text-white">xrpl.app</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              colorClass={card.colorClass}
              isPlaceholder={card.isPlaceholder}
              onClick={() => !card.isPlaceholder && setSelectedCard(card)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()}
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="mailto: admin@xrpl.app"
                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <span className="text-sm">Contact</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        isOpen={selectedCard !== null}
        onClose={() => setSelectedCard(null)}
        title={selectedCard?.title ?? 'asda'}
        description={selectedCard?.description ?? ''}
        colorClass={selectedCard?.colorClass ?? ''}
      />
    </div>
  );
}

export default App;