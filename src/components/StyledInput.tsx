import { Input } from "@rneui/themed";
import React from "react";

type propsType = React.ComponentPropsWithoutRef<typeof Input>;
export const StyledInput = (props: propsType) => {
  return (
    <Input
      className="border border-gray-300 rounded-md p-2 w-3/4"
      inputContainerStyle={{borderBottomWidth: 0}}
      {...props}
    />
  );
};
