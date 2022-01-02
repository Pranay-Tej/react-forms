import { DependencyList, EffectCallback, useEffect } from "react";
import useIsFirstRender from "./useIsFirstRender";

// Same as useEffect but does not run on the first render.
export default function useUpdateEffect(effect: EffectCallback, deps: DependencyList){
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if(!isFirstRender){
      effect();
    }
  }, deps);
}