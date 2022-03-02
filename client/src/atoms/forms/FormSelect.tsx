function FormSelect(props: any) {
    return (
        <div>
            <label className="form-field-select__label" htmlFor={props.htmlFor}>{props.label}</label>
            <select className="form-select" onChange={props.onChange}>
                {props.options.map((e: string, index: number) => (
                    <option key={index}> {e} </option>
                ))}
            </select>
        </div>
    )
}
export default FormSelect;
