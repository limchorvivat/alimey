import { useState, useEffect } from "react";
import axios from "axios";

const useAvatar = (userId: string | number | undefined) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/users/${userId}?populate=avatar`
        );

        if (response.data && response.data.avatar && response.data.avatar.url) {
          const avatarUrl = `http://localhost:1337${response.data.avatar.url}`;
          setAvatar(avatarUrl);
        } else {
          console.error("Avatar data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar();
  }, [userId]);

  return avatar;
};

export default useAvatar;
