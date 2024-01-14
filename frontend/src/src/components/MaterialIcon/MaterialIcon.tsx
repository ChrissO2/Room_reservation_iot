interface MaterialIconProps {
    icon: string;
    size?: string;
    color?: string;
}

export const MaterialIcon = ({ icon, size, color }: MaterialIconProps) => {
    return (
        <span className="material-symbols-outlined" style={{ fontSize: size, color: color }}>
            {icon}
        </span>
    );
};
