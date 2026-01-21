import { NameInput } from "./NameInput";
import ProfileImagePicker from "./ProfileImagePicker";

interface ProfileWrapperProps {
  imageUrl: string | null;

  name: string;
  onChangeName: (value: string) => void;

  onProfileClick?: () => void;
  canEdit?: boolean;
}
export const ProfileWrapper = ({
  imageUrl,
  name,
  onChangeName,
  onProfileClick,
  canEdit = false,
}: ProfileWrapperProps) => {
  return (
    <section className="flex flex-col items-center gap-4">
      <ProfileImagePicker
        imageUrl={imageUrl}
        onClick={onProfileClick}
        canEdit={canEdit}
      />

      <div className="w-full px-[118px]">
        <NameInput value={name} onChange={onChangeName} />
      </div>
    </section>
  );
};
