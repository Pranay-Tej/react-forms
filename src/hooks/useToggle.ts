import { useState } from "react";

function useToggle(initialValue: boolean = true) {
  const [value, setValue] = useState<boolean>(initialValue);
  function toggleValue() {
    setValue((previousValue) => !previousValue);
  }
  return { value, toggleValue };
}

export default useToggle;
