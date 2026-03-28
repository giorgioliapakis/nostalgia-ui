import {
  RetroNavigationMenu,
  RetroNavigationMenuList,
  RetroNavigationMenuItem,
  RetroNavigationMenuTrigger,
  RetroNavigationMenuContent,
  RetroNavigationMenuLink,
} from "@/registry/new-york/ui/retro-navigation-menu"

export default function NavigationMenuPreview() {
  return (
    <main className="min-h-screen p-8 space-y-10">
      <h1 className="font-[family-name:var(--font-heading)] text-[14px] tracking-[0.42px]">
        retro-navigation-menu
      </h1>

      {/* ---- Full-width navigation menu ---- */}
      <section className="space-y-2">
        <h2 className="font-[family-name:var(--font-heading)] text-[12px] tracking-[0.42px]">
          Default
        </h2>

        <RetroNavigationMenu className="w-full">
          <RetroNavigationMenuList>
            <RetroNavigationMenuItem>
              <RetroNavigationMenuTrigger>
                Getting Started
              </RetroNavigationMenuTrigger>
              <RetroNavigationMenuContent>
                <ul className="grid gap-[4px] w-[320px]">
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Introduction - An overview of nostalgia-ui and its retro
                      Mac OS 9 design system.
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Installation - How to install and set up nostalgia-ui in
                      your project.
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Typography - Charcoal and Geneva font usage and
                      configuration.
                    </RetroNavigationMenuLink>
                  </li>
                </ul>
              </RetroNavigationMenuContent>
            </RetroNavigationMenuItem>

            <RetroNavigationMenuItem>
              <RetroNavigationMenuTrigger>
                Components
              </RetroNavigationMenuTrigger>
              <RetroNavigationMenuContent>
                <ul className="grid grid-cols-2 gap-[4px] w-[400px]">
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroButton
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroInput
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroSelect
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroCheckbox
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroTabs
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      RetroMenuBar
                    </RetroNavigationMenuLink>
                  </li>
                </ul>
              </RetroNavigationMenuContent>
            </RetroNavigationMenuItem>

            <RetroNavigationMenuItem>
              <RetroNavigationMenuTrigger>
                Documentation
              </RetroNavigationMenuTrigger>
              <RetroNavigationMenuContent>
                <ul className="grid gap-[4px] w-[280px]">
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Theming - Customize colors and design tokens.
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Accessibility - ARIA patterns and keyboard navigation.
                    </RetroNavigationMenuLink>
                  </li>
                  <li>
                    <RetroNavigationMenuLink href="#">
                      Changelog - Release notes and version history.
                    </RetroNavigationMenuLink>
                  </li>
                </ul>
              </RetroNavigationMenuContent>
            </RetroNavigationMenuItem>
          </RetroNavigationMenuList>
        </RetroNavigationMenu>
      </section>
    </main>
  )
}
