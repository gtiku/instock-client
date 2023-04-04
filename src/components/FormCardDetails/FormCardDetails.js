import "./FormCardDetails.scss";
import TextInput from "../TextInput/TextInput";

const FormCardDetails = ({ handleChange, warehouseName }) => {


    return (
        <section className="warehouse__form-card">
            <h2 className="warehouse__form-title">Warehouse Details</h2>
            <article className="warehouse" >
               <TextInput 
                    editable={!`${warehouseName}`}
                    value={warehouseName}
                    label="Warehouse Name" 
                    placeholder="Warehouse Name" 
                    name="warehouseName" 
                    onChange={handleChange}
                     />
               <TextInput 
                    label="Street Address" 
                    placeholder="Street Address" 
                    name="address" 
                    onChange={handleChange} 
                    />
               <TextInput 
                    label="City" 
                    placeholder="City" 
                    name="city" 
                    onChange={handleChange} 
                    />
               <TextInput 
                    label="Country" 
                    placeholder="Country" 
                    name="country" 
                    onChange={handleChange} 
                    />
            </article>
        </section>
    )
}

export default FormCardDetails