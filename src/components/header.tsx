import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <h1 className="text-xl font-extrabold text-blue-400">
        <Link to={'/'}>Podcaster</Link>
      </h1>
      <div className="my-4 border-t border-gray-200"></div>
    </>
  );
}
