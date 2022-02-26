import React, { useState, useEffect } from 'react'
import { Box } from '../component/Box'
import { FormInput } from '../component/FormInput'
import { FormFilter } from '../component/FormFilter'

type Props = {
}

export const Home: React.FC<Props> = () => {
    const [boxList, setBoxList] = useState<string[]>([])
    const [initBoks, setInitBoks] = useState<string[]>([])
    let numberInitBox: number = 2;
    useEffect(() => {
        console.log("parent render" + boxList );
        let tempArr: string[] = []
        for (let i = 0; i <= numberInitBox; i++){
            tempArr.push('#1ABC9C');
        }
        setInitBoks([...initBoks, ...tempArr])
        if (localStorage.getItem('boxs') !== null || localStorage.getItem('boxs') !== undefined )localStorage.setItem('boxs', JSON.stringify([]));
    },[])

    useEffect(() => {
        let db: string[] = getBoxListFromStorage('boxs')
        setBoxList([...initBoks, ...db]);
    }, [initBoks])

    
    const addBox = (name: string):void => {
        let arr: string[] = getBoxListFromStorage('boxs')
        arr = [...arr, name ];
        localStorage.clear()
        localStorage.setItem('boxs', JSON.stringify(arr));
        setBoxList([ ...initBoks, ...arr]);
        console.log(boxList.length);
    }

    const getBoxListFromStorage = (key: string): string[] => {
        const boxs = JSON.parse( localStorage.getItem(key) || '{}')
        return boxs
    }

    
    const hexAToRGBA = (h: string[]) => {
        let r: string = '0', g: string = '0', b: string = '0', a: string = '1';
      
        if (h.length === 5) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
          a = "0x" + h[4] + h[4];
      
        } else if (h.length === 9) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
          a = "0x" + h[7] + h[8];
        }
        let alpha: number = +(+a / 255).toFixed(3);
        let red: number = +r;
        let green: number = +g;
        let blue: number = +b;
        let result: string = '';
        result = result + String((red > 127) ? true : false) + ',';
        result = result + String((green > 127) ? true : false)+ ',';
        result = result + String((blue > 127) ? true : false)+ ',';
        result = result + String((alpha > 127) ? true : false)+ ','; 
        return result;
    }
    
    const filter = (filterArr: boolean[]) => {
        let compare: string = filterArr.join(',');
        let arr: string[] = [];
        for(let i=0;i <= boxList.length;i++){
            let temp: string = hexAToRGBA(boxList[i].split(''))
            if (temp === compare ) arr.push(boxList[i]); 
        }
        setBoxList(sorting(arr));
    }

    const sorting = (arrItem: string[]) => {
        let result: string[] = [];
        let red: string[] = []
        let green: string[] = []
        let blue: string[] = []
        let alpha: string[] = []
        for (let i = 0; i <= arrItem.length; i++){
            let temp: string[] = hexAToRGBA(arrItem[i].split('')).split(',')
            if (temp[0]) red.push(arrItem[i]);
            else if (temp[1]) green.push(arrItem[i]);
            else if (temp[2]) blue.push(arrItem[i]);
            else if (temp[3]) alpha.push(arrItem[i]); 
        }
        result = [...red, ...green, ...blue, ...alpha];
        return result;
    }

    const removeBox = (id: number):void => {
        let db: string[] = getBoxListFromStorage('boxs')
        let item: string[] = db.splice((id - numberInitBox) - 1 , 1)
        console.log(db);
        localStorage.clear()
        localStorage.setItem('boxs', JSON.stringify(db))
        setInitBoks([...initBoks])
    }


    return (
    <div>
        <FormInput addBox={addBox}/>
        <FormFilter doFilter={filter} />
        <div >
        {boxList.map((color:string, index:number)=><Box key={index} id={index} removeBox={removeBox} initIndex={numberInitBox} color={`${color}`}/>)} 
        </div>
    </div>
  )
}

