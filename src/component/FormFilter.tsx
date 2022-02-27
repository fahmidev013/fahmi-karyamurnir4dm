import React, { useState, useEffect, useRef} from 'react'

interface Iform {
    doFilter: (arg: boolean[]) => void;
}

interface thestate {
    red: string,
    green: string,
    blue: string,
    alpha: string,
}

export class FormFilter extends React.Component<Iform, thestate> {
    formRef: any;
    
    constructor(props:Iform) {
        super(props);
        this.state = {
            red: 'false',
            green: 'false',
            blue: 'false',
            alpha: 'false',
        }
    }


    dispatchForm =  (doFilter: any) => {
        this.formRef.addEventListener('submit', function (event:React.FormEvent<HTMLFormElement> ) {
            const element = event.currentTarget as any
            event.preventDefault();
            let arr: string[] = []
            for (let i=0; i < 4; i++){
                arr.push(element[i].checked)
            }
            doFilter(arr)
            return false;
        });
        this.formRef.dispatchEvent(new Event('submit')) 
    }

    render(){
        return (
            <div>
                <form  
  ref={ (ref) =>  {this.formRef = ref} }>
                    <div style={{ padding: '0px 15px 0px 15px'}}>
                        <label>
                            <input id="red" type="checkbox" onChange={(e) => {this.setState({ red: `${e.target.checked}` }); this.dispatchForm(this.props.doFilter);}}/> Red {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="green" type="checkbox" onChange={(e) => {this.setState({ green: `${e.target.checked}` }); this.dispatchForm(this.props.doFilter);}}/> Green {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="blue" type="checkbox" onChange={(e) => {this.setState({ blue: `${e.target.checked}` }); this.dispatchForm(this.props.doFilter);}}/> Blue {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>
                            <input id="alpha" type="checkbox" onChange={(e) => {this.setState({ alpha: `${e.target.checked}` }); this.dispatchForm(this.props.doFilter);}}/> Saturation {'>'} 50%&nbsp;&nbsp;&nbsp;
                        </label>    
                    </div>
                    <hr/>
                </form>
            </div>
          );
    }
}


