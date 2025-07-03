interface AppProps {
    className?: string;
    children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ className = '', children }) => {
    return (
        <div className={`w-full h-full ${className}`.trim()}>
            {children}
        </div>
    );
};

export default App