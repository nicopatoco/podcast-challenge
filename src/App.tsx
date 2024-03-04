import Header from './components/header';
import Podcasts from './pages/Podcasts';

export default function App() {
  return (
    <>
      <div className="container mx-auto bg-white">
        <Header />
        <Podcasts />
      </div>
    </>
  );
}
