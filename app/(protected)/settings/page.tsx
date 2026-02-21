"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

 

const SettingsPage = () => {

  const onClick = () => {
    logout();
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <form>
        <button onClick={onClick}>
          Sign Out
          </button>
      </form>
    </div>
  );
}

export default SettingsPage;