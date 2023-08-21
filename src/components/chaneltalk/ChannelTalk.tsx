import ChannelService from "@/libs/channel.utils";
import { ElseUtils } from "@/libs/else.utils";
import { useEffect } from "react";

export default function ChannelTalk() {
  useEffect(() => {
    const user = ElseUtils.getLocalstorageUser();

    console.log(user);

    const obj = new ChannelService();
    obj.loadScript();
    obj.boot({
      pluginKey: "1c92aeb0-97cd-4046-bbb2-1b3beb594511", // fill your plugin key
      profile: {
        // fill user's profile
        name: user.email, // fill user's name
        mobileNumber: user.phone, // fill user's mobile number
        landlineNumber: "USER_LANDLINE_NUMBER", // fill user's landline number
        CUSTOM_VALUE_1: user.name, // custom property
      },
    });
  }, []);

  return <></>;
}
