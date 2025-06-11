import { LucideProps, icons } from "lucide-react";
import React from "react";

// https://lucide.dev/icons/  for list of icons
interface IconWrapperProps extends Partial<LucideProps> {
    name: keyof typeof icons; // Only allow valid Lucide icon names
}

const IconWrapper: React.FC<IconWrapperProps> = ({ name, ...props }) => {
    const LucideIcon = icons[name]; // Get the icon component dynamically

    if (!LucideIcon) {
        console.warn(`Lucide icon "${name}" not found!`);
        return null;
    }

    return <LucideIcon {...props} />;
};

export default IconWrapper;
