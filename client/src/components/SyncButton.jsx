import { useState } from "react";

import {
  syncAllPlatforms,
} from "../services/platformService";

const SyncButton = ({
  onSuccess,
}) => {

  const [loading,
    setLoading] =
    useState(false);

  const handleSync =
    async () => {

      try {

        setLoading(true);

        await syncAllPlatforms();

        alert(
          "Platforms Synced Successfully"
        );

        if (onSuccess) {
          onSuccess();
        }

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Sync Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <button
      onClick={handleSync}
      disabled={loading}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {
        loading
          ? "Syncing..."
          : "Sync Platforms"
      }
    </button>
  );
};

export default SyncButton;