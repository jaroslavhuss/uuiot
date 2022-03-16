
interface IFormErrors {
    error: string;
}

function FormErrors(props: IFormErrors) {
    return (
        <div className="form-error">
            <span className="form-error__text">{props.error} </span>
        </div>
    )
}

export default FormErrors;
