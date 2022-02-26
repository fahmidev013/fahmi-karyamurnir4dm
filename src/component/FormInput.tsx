import React, { useState, useEffect} from 'react'

interface Iform {
    addBox: (arg: string) => void
}

export const FormInput: React.FC<Iform> = ({ addBox }) => {
    const [term, setTerm] = useState('');
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if(cekIsValid(term)) addBox(term); 
        // else console.log('ga aman');
        addBox(term);
    }

    useEffect(() => {
        console.log("dari form nih");
    },)


    const cekIsValid = (param: string) => {
        const validHex = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#34495E','#16A085','#27AE60','#2980B9','#8E44AD','#2C3E50','#F1C40F','#E67E22','#E74C3C','#ECF0F1','#95A5A6','#F39C12','#D35400','#C0392B','#BDC3C7','#7F8C8D']
        for (let i = 0; i < validHex.length; i++){
            if (validHex[i] === param) return true;
            return false;
        }
    }

    return (
    <div >
        <form onSubmit={submitForm}>
            <div style={{ padding: '15px 15px 0px 15px'}}>
                <label><strong>Add new color :</strong>
                &nbsp;&nbsp;
                <input
                    id='coba'
                    type="text"
                    name="coba"
                    value={term}
                    onChange={(e) => setTerm(e.target.value.toUpperCase())}
                    placeholder="Enter a term"
                    className="input"
                />
                </label>&nbsp;&nbsp;
                <input  type='submit' value='Submit' />
                
            </div>
            <hr/>
        </form>
    </div>
  )
}


