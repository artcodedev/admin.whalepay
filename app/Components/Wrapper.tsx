


const Wrapper = ({ children }: Readonly<{ children?: React.ReactNode; }>) => {

    return (
        <>
            <div style={{position:'relative', width: '100%', height: '100%'}}>{children}</div>
        </>
    );
}


export default Wrapper;