import React from 'react';
import { User } from '../types';

interface UsersTableProps {
  users: User[];
  onEditUser?: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEditUser }) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
        <div className="p-2.5 xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            ID
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            이름
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            역할
          </h5>
        </div>
        <div className="p-2.5 text-center xl:p-5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            관리
          </h5>
        </div>
      </div>
      
      {users.map((user) => (
        <div key={user.id} className="grid grid-cols-4 border-b border-stroke dark:border-strokedark">
          <div className="flex items-center gap-3 p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{user.id}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <p className="text-black dark:text-white">{user.name}</p>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <span className={`inline-flex rounded-full bg-${user.roleClass} bg-opacity-10 py-1 px-3 text-sm font-medium text-${user.roleClass}`}>
              {user.role}
            </span>
          </div>
          <div className="flex items-center justify-center p-2.5 xl:p-5">
            <button 
              onClick={() => onEditUser && onEditUser(user.id)}
              className="inline-flex items-center justify-center rounded-md border border-primary py-2 px-4 text-center font-medium text-primary hover:bg-opacity-90"
            >
              수정
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTable; 