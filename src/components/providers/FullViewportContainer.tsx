import { ElementType, HTMLAttributes } from "react";

import useIsOnScreenKeyboardOpen from "../../ hooks/useIsOnScreenKeyboardOpen";
import useOnScreenKeyboardScrollFix from "../../ hooks/useOnScreenKeyboardScrollFix";
import usePreventOverScrolling from "../../ hooks/usePreventOverscrolling";
import useViewportSize from "../../ hooks/useViewportSize";

interface Props extends HTMLAttributes<HTMLDivElement> {
  element?: ElementType;
}

const FullViewportContainer = ({
  element: Element = "div",
  ...others
}: Props) => {
  const [, viewportHeight = 0] = useViewportSize() || [];
  useOnScreenKeyboardScrollFix();

  const isOnScreenKeyboardOpen = useIsOnScreenKeyboardOpen();

  const ref = usePreventOverScrolling(); //   работает и без него, но лучше оставить

  return (
    <Element
      {...others}
      ref={ref}
      style={{
        height: viewportHeight,
        padding: isOnScreenKeyboardOpen
          ? "env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left)"
          : "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
        transition: "padding 100ms, height 100ms",
      }}
    />
  );
};

export default FullViewportContainer;
