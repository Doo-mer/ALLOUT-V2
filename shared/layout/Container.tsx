interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ className = '', children }) => {
    return (
        <div className={`container mx-auto max-w-[600px] overflow-y-auto overflow-x-hidden h-screen relative bg-black ${className}`.trim()}>
            {children}
        </div>
    );
};

export default Container