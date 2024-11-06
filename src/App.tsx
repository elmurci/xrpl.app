import { useState } from 'react';
import { Card } from './components/Card';
import { Modal } from './components/Modal';
import { BlockchainAnimation } from './components/BlockchainAnimation';

const cards = [
  {
    title: 'XRP Ledger Validator',
    description: 'XRP Ledger Mainnet Validator, since 2024.',
    colorClass: 'bg-gradient-to-br from-purple-400 to-indigo-500',
    isPlaceholder: false,
    type: 'modal',
  },
  {
    title: 'XRP Ledger 101',
    description:
      'Quick intro to the XRP Ledger covering basic concepts to get started.',
    colorClass: 'bg-gradient-to-br from-pink-400 to-rose-500',
    isPlaceholder: false,
    type: 'link',
    link: 'https://arxiv.org/list/cs.NE/recent',
  },
  {
    title: 'Coming Soon',
    description:
      'New content is being crafted for this space. Stay tuned for mind-expanding discoveries.',
    colorClass: 'bg-gradient-to-br from-gray-400 to-gray-500',
    isPlaceholder: true,
  },
  {
    title: 'Coming Soon',
    description:
      'New content is being crafted for this space. Stay tuned for mind-expanding discoveries.',
    colorClass: 'bg-gradient-to-br from-gray-400 to-gray-500',
    isPlaceholder: true,
  },
  {
    title: 'Coming Soon',
    description: 'Another fascinating journey awaits. Check back for updates.',
    colorClass: 'bg-gradient-to-br from-gray-400 to-gray-500',
    isPlaceholder: true,
  },
];

function App() {
  const [selectedCard, setSelectedCard] = useState<(typeof cards)[0] | null>(
    null
  );

  return (
    <div className="min-h-screen animate-gradient">
      {/* Header */}
      <header className="fixed top-0 w-full z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
                <img src="images/logo/logo.png" width="50" alt="XRP Ledger" />
              </div>
            </div>
            <div className="hidden md:block">
              <BlockchainAnimation />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              colorClass={card.colorClass}
              isPlaceholder={card.isPlaceholder}
              onClick={
                card.type === 'modal' ? () => setSelectedCard(card) : undefined
              }
              link={card.type === 'link' ? card.link : undefined}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()}
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="mailto:admin@xrpl.app"
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
        title={selectedCard?.title ?? ''}
        description={selectedCard?.description ?? ''}
        colorClass={selectedCard?.colorClass ?? ''}
      />
    </div>
  );
}

export default App;
