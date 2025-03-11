export type NavItemProps = {
  title: string;
  prependIcon: string;
  onClick: (() => void) | undefined;
  to: string | undefined;
  dataTour: string | undefined;
  prependDivider: boolean | undefined;
  appendDivider: boolean | undefined;
  subItems: NavItemProps[] | undefined;
};
