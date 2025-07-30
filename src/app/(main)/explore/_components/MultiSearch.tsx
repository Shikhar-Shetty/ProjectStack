'use client';

import { useTransition, useState } from 'react';
import { filteredUser } from '../../../../../actions/profile';
import Link from 'next/link';

type UserResult = {
  id: string;
  user: {
    image: string | null,
    name: string;
  };
};

function MultiSearch() {

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserResult[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(async () => {
      const result = await filteredUser(value);
      setUsers(
        result.map((user) => ({
          ...user,
          user: {
            name: user.user.name ?? '',
            image: user.user.image
          },
        }))
      );
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 px-4">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search GitHub usernames..."
        className="w-full p-3 text-gray-400 rounded-lg shadow-sm border border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      {isPending && <p className="mt-4 text-gray-500">Searching...</p>}

      {!isPending && users.length > 0 && (
        <ul className="mt-4  rounded-lg shadow divide-y divide-gray-100">
          {users.map((user) => (
            <Link key={user.id} href={`/profile/${user.user.name}`}>
              <li  className="flex items-center gap-3 p-3 my-1 rounded-lg bg-gray-900 transition">
                <img
                  src={user.user.image ?? '/default-avatar.png'}
                  alt={user.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium  text-gray-400">@{user.user.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}

      {!isPending && query.trim() && users.length === 0 && (
        <p className="mt-4 text-sm text-gray-400">No users found.</p>
      )}
    </div>
  )
}

export default MultiSearch
