import React, { useState, useEffect} from 'react'

interface Iform {
}

interface Iprops {
}

export class FormFilter extends React.Component<Iform, Iprops> {
    constructor(props: Iprops){
        super(props);
        this.state = {
            count: 1
        }
    }


    render(){
        return (
            <div>
                <form onSubmit={() => {}}>
                    <div style={{ padding: '0px 15px 0px 15px'}}>
                        <label>
                            <input id="is3dCheckBox" type="checkbox" /> Red {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="is3dCheckBox" type="checkbox" /> Green {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="is3dCheckBox" type="checkbox" /> Blue {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="is3dCheckBox" type="checkbox" /> Saturation {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>    
                    </div>
                    <hr/>
                </form>
            </div>
          );
    }
    // const [term, setTerm] = useState('');
    // const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     addBox(term);
    // }

    // useEffect(() => {
    //     console.log("dari form nih");
    // },);
}


