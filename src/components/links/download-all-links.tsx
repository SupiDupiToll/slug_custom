"use client";

import { downloadAllLinks } from "@/server/actions/links";
import { Button } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";
import { useState } from "react";
import { toast } from "sonner";

const DownloadAllLinks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownloadLinks = async () => {
    setIsLoading(true);
    try {
      const links = await downloadAllLinks();
      const blob = new Blob([JSON.stringify(links)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slug-links.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Links exported successfully.");
    } catch (error) {
      toast.error("Failed to download links.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownloadLinks}
      disabled={isLoading}
    >
      {isLoading ? (
        <MaterialIcon
          name="progress_activity"
          size={14}
          className="animate-spin"
        />
      ) : (
        <MaterialIcon name="download" size={14} />
      )}
      <span>{isLoading ? "Exporting..." : "Export all links"}</span>
    </Button>
  );
};

export default DownloadAllLinks;
