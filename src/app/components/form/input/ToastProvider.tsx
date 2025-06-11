import React, {
    createContext,
    useContext,
    useCallback,
    useState,
    ReactNode,
} from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

interface ToastContextType {
    success: (message?: unknown) => void;
    error: (message?: unknown) => void;
    warning: (message?: unknown) => void;
    info: (message?: unknown) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

const defaultMessages: Record<Toast['type'], string> = {
    success: 'Request completed successfully.',
    error: 'Something went wrong.',
    warning: 'Please check your input.',
    info: 'Here is some information.',
};

const toastStyles: Record<Toast['type'], string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const createToast = useCallback((type: Toast['type'], message?: unknown) => {
        const id = toastId++;

        let finalMessage = defaultMessages[type];

        if (message) {
            if (typeof message === 'string') {
                finalMessage = message;
            } else if (message instanceof Error) {
                finalMessage = message.message;
            } else {
                finalMessage = String(message);
            }
        }

        setToasts((prev) => [...prev, { id, message: finalMessage, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const contextValue: ToastContextType = {
        success: (msg) => createToast('success', msg),
        error: (msg) => createToast('error', msg),
        warning: (msg) => createToast('warning', msg),
        info: (msg) => createToast('info', msg),
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className="fixed top-24 right-5 z-50 space-y-2">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-2 rounded shadow-lg text-sm w-[300px] ${toastStyles[toast.type]}`}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
