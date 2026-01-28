import { NameInput } from "./NameInput";
import { ProfileImagePicker } from "./ProfileImagePicker";

interface ProfileWrapperProps {
  imageUrl: string | null;

  name: string;
  onChangeName: (value: string) => void;
  placeholder?: string;

  onProfileClick?: () => void;
  canEdit?: boolean;
}

const DEFAULT_PLACEHOLDER = "이름을 입력해주세요";

export const ProfileWrapper = ({
  imageUrl,
  name,
  onChangeName,
  onProfileClick,
  canEdit = false,
  placeholder = DEFAULT_PLACEHOLDER,
}: ProfileWrapperProps) => {
  return (
    <section className="flex flex-col items-center gap-4">
      <ProfileImagePicker
        imageUrl={imageUrl}
        onClick={onProfileClick}
        canEdit={canEdit}
      />

      <div className="w-full px-[118px]">
        <NameInput
          value={name}
          onChange={onChangeName}
          placeholder={placeholder}
        />
      </div>
    </section>
  );
};
