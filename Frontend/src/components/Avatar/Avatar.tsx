import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfileQuery } from "@/redux/slice/userApi";

export interface ProfileData {
  userId: {
    avatar: {
      url: string;
    };
  };
}

export function AvatarFile() {
  const { data } = useGetProfileQuery();
  console.log("data is", data);

  return (
    <Avatar>
      <AvatarImage src={data?.userId?.avatar?.url} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
