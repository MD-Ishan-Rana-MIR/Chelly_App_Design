import React from 'react';

interface MaxWidthProps {
    children: React.ReactNode;
}

const MaxWidth = ({ children }: MaxWidthProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {children}
        </div>
    );
};

export default MaxWidth;