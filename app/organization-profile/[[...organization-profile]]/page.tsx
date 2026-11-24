import { OrganizationProfile } from "@clerk/nextjs"

export default function OrganizationProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <OrganizationProfile path="/organization-profile" routing="path" />
    </div>
  )
}
