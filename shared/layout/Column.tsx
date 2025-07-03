interface ColumnProps {
    className?: string;
    ref?: any;
    children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ className = '', children, ref }) => {
    return (
        <div ref={ref} className={`flex flex-col ${className}`.trim()}>
            {children}
        </div>
    );
};

export default Column