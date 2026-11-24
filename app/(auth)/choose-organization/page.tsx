import { OrganizationList } from "@clerk/nextjs"
import { Suspense } from "react"

export default function ChooseOrganizationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense>
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/"
          afterCreateOrganizationUrl="/"
        />
      </Suspense>
    </div>
  )
}
