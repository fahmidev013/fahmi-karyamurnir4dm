import React, { useState, useEffect} from 'react'

interface Iform {
    filter: (arg: boolean[]) => void;
}

export class FormFilter extends React.Component<Iform> {
    constructor(props:Iform) {
        super(props);
        this.state = {
            filterChild: props.filter
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={() => this.props.filter}>
                    <div style={{ padding: '0px 15px 0px 15px'}}>
                        <label>
                            <input id="red" type="checkbox" /> Red {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="green" type="checkbox" /> Green {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="blue" type="checkbox" /> Blue {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="alpha" type="checkbox" /> Saturation {'>'} 50%&nbsp;&nbsp;&nbsp;
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


