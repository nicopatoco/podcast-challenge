import { NavLink, Outlet } from 'react-router-dom';

export default function Episodes() {
  const episodes = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <div className="flex flex-col gap-2">
        {episodes.map((episode) => (
          <NavLink key={episode} to={`episode/${episode}`}>
            Episodes {episode}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
}
