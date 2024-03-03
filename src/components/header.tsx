import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <h1 className="text-xl text-blue-400 font-extrabold">
        <Link to={'/'}>Podcaster</Link>
      </h1>
      <div className="border-t border-gray-200 my-4"></div>
    </>
  );
}
