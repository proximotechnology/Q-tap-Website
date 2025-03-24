import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"


export const routing = defineRouting({
    locales: ["en", "ar"],
    defaultLocale: "ar"
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)