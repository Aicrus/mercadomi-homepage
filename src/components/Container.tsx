import React from 'react'

interface Props {
    className?: string;
}

const Container: React.FC<React.PropsWithChildren<Props>> =({ children, className }: React.PropsWithChildren<Props>) => {
    return (
        <div className={`px-5 w-full max-w-7xl mx-auto overflow-x-hidden ${className ? className : ""}`}>{children}</div>
    )
}

export default Container