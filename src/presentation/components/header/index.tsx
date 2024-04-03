export default function Header(props: any) {
    return (
        <div className="header_container">
            <div className="progress_container">
                <div className="progress_bar" style={{ width: `${props.progress * 25}%` }}></div>
            </div>
            <div className="progress_text">{props.progress}/4</div>
        </div>
    )
}