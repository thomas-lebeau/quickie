import { createRoot } from 'react-dom/client';

function App() {
    return '👋 Hello World!';
}

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
