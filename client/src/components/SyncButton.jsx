import { useState } from "react";
import { RefreshCw } from "lucide-react";

import { syncAllPlatforms } from "../services/platformService";

const SyncButton = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    try {
      setLoading(true);

      await syncAllPlatforms();

      alert("Platforms Synced Successfully");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

      alert("Sync Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="
      inline-flex
      items-center
      gap-2

      bg-blue-600
      hover:bg-blue-700

      disabled:bg-blue-400
      disabled:cursor-not-allowed

      text-white
      font-medium

      px-5
      py-3

      rounded-xl

      transition-all
      shadow-sm
      "
    >
      <RefreshCw
        size={18}
        className={loading ? "animate-spin" : ""}
      />

      {loading
        ? "Syncing Platforms..."
        : "Sync Platforms"}
    </button>
  );
};

export default SyncButton;