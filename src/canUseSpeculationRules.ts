export const canUseSpeculationRules = async (): Promise<boolean> => {
  return (
    HTMLScriptElement.supports &&
    HTMLScriptElement.supports("speculationrules") &&
    !!(await browser.runtime.sendMessage({
      type: "canPreload",
    }))
  );
};
