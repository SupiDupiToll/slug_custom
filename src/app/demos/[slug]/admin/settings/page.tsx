import type { Metadata } from "next";

import { Button } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";
import Alert from "@/ui/alert";
import SettingsCard from "@/components/settings/card";
import { Input } from "@/ui/input";
import { getDemoData } from "@/components/demo/demo-data";

export const metadata: Metadata = {
  title: "Demo Admin - Settings",
};

interface DemoAdminSettingsPageProps {
  params: { slug: string };
}

const DemoAdminSettingsPage = async ({
  params,
}: DemoAdminSettingsPageProps) => {
  const slug = decodeURIComponent(params.slug);
  const { user } = getDemoData(slug);

  return (
    <div className="flex w-full flex-col space-y-4 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <Alert variant="info">
        <p>
          <strong>Demo-Modus:</strong> Diese Ansicht enthält ausschließlich
          Dummy-Daten. Änderungen sind nicht möglich.
        </p>
      </Alert>
      <SettingsCard
        title="General"
        description="Update your personal information:"
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">Your name:</p>
            <Input defaultValue={user.name ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Your username:</p>
            <Input defaultValue={user.username ?? ""} disabled />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Your email:</p>
            <Input defaultValue={user.email ?? ""} disabled />
            <p className="flex items-center gap-2 pl-1 text-sm text-slate-500">
              <MaterialIcon name="info" size={14} />
              <span>Email address is managed by your OAuth provider.</span>
            </p>
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" disabled>
              <MaterialIcon name="lock" size={16} />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </SettingsCard>
      <SettingsCard title="Account" description="Update your account settings:">
        <div className="mb-5 flex w-52 flex-col space-y-2">
          <p>Export links:</p>
          <Button variant="outline" size="sm" disabled>
            <MaterialIcon name="lock" size={14} />
            <span>Export all links</span>
          </Button>
        </div>
        <div className="flex w-52 flex-col space-y-2">
          <p>Delete account:</p>
          <Button variant="destructive" size="sm" disabled>
            <MaterialIcon name="lock" size={14} />
            <span>Delete Account</span>
          </Button>
        </div>
      </SettingsCard>
    </div>
  );
};

export default DemoAdminSettingsPage;
