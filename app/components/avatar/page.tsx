import {
  RetroAvatar,
  RetroAvatarImage,
  RetroAvatarFallback,
} from "@/registry/new-york/ui/retro-avatar"
import { ComponentDocLayout } from "../_components/component-doc-layout"

export default function AvatarPreview() {
  return (
    <ComponentDocLayout
      name="retro-avatar"
      title="RetroAvatar"
      description="A user avatar with image and fallback initials in Mac OS 9 beveled frame styling."
    >
      {/* With image */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">With Image</h2>
        <div className="flex items-center gap-4">
          <RetroAvatar>
            <RetroAvatarImage
              src="https://avatar.vercel.sh/steve"
              alt="Steve"
            />
            <RetroAvatarFallback>SJ</RetroAvatarFallback>
          </RetroAvatar>
          <RetroAvatar>
            <RetroAvatarImage
              src="https://avatar.vercel.sh/susan"
              alt="Susan"
            />
            <RetroAvatarFallback>SK</RetroAvatarFallback>
          </RetroAvatar>
        </div>
      </section>

      {/* Fallback initials */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Fallback Initials</h2>
        <div className="flex items-center gap-4">
          <RetroAvatar>
            <RetroAvatarFallback>SJ</RetroAvatarFallback>
          </RetroAvatar>
          <RetroAvatar>
            <RetroAvatarFallback>JI</RetroAvatarFallback>
          </RetroAvatar>
          <RetroAvatar>
            <RetroAvatarFallback>AK</RetroAvatarFallback>
          </RetroAvatar>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-8">
        <h2 className="os9-heading text-[14px] mb-4">Sizes</h2>
        <div className="flex items-end gap-4">
          <div className="flex flex-col items-center gap-2">
            <RetroAvatar size="sm">
              <RetroAvatarFallback>SM</RetroAvatarFallback>
            </RetroAvatar>
            <span className="text-[9px] text-os9-gray-700">sm (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroAvatar size="default">
              <RetroAvatarImage
                src="https://avatar.vercel.sh/default"
                alt="Default"
              />
              <RetroAvatarFallback>DF</RetroAvatarFallback>
            </RetroAvatar>
            <span className="text-[9px] text-os9-gray-700">
              default (32px)
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RetroAvatar size="lg">
              <RetroAvatarImage
                src="https://avatar.vercel.sh/large"
                alt="Large"
              />
              <RetroAvatarFallback>LG</RetroAvatarFallback>
            </RetroAvatar>
            <span className="text-[9px] text-os9-gray-700">lg (48px)</span>
          </div>
        </div>
      </section>

      <p className="text-os9-gray-700 text-[9px] mt-8">
        Avatars display a user image with a fallback for missing images.
      </p>
    </ComponentDocLayout>
  )
}
