

interface ILogo {
    useSmall?: boolean
}

function Logo(props: ILogo) {
    return (
        <div className="logo">
            <div>
                <h1>
                    uuClimative
                </h1>
            </div>
        </div>
    )
}

export default Logo;