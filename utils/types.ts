export type Navigation = {
  [key: string | symbol]: {
    title: string | ComputedRef | unknown;
    icon?: {
      icon?: string;
      size?: number;
    };
    breadcrumb?: {
      prevHref?: string;
      items: {
        icon?: string;
        title: string;
        href?: string;
        disabled?: boolean;
      }[];
    };
  };
};

export type Menu = {
  to?: string | undefined;
  label: string;
  icon?: string;
  children?: Menu[];
};

export type OptionItem = {
  label: string;
  value: string;
  company?: string;
};

export type Permission = {
  action: string;
  subject: string;
};
