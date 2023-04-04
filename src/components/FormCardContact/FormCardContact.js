import './FormCardContact.scss';
import TextInput from '../TextInput/TextInput';

const FormCardContact = ({ handleChange }) => {

    return (
        <section className="contact__form-card">
            <h2 className="contact__form-title">Contact Details</h2>
            <article className="contact">
               <TextInput 
                    label="Contact Name" 
                    placeholder="Contact Name" 
                    name="contactName" 
                    onChange={handleChange}
                    />
               <TextInput 
                    label="Position" 
                    placeholder="Position" 
                    name="contactPosition" 
                    onChange={handleChange} 
                    />
               <TextInput 
                    label="Phone Number" 
                    placeholder="Phone Number" 
                    name="contactPhone" 
                    onChange={handleChange}
                    />
               <TextInput 
                    label="Email" 
                    placeholder="Email" 
                    name="contactEmail" 
                    onChange={handleChange} 
                    />
            </article>
        </section>
    )
}

export default FormCardContact