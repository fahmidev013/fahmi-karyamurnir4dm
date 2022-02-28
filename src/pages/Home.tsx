import React, { useState, useEffect } from 'react'
import { Box } from '../component/Box'
import { FormInput } from '../component/FormInput'
import { FormFilter } from '../component/FormFilter'
import './Home.css'

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

    const isValidHex = (hex:any) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)

    const getChunksFromString = (st:any, chunkSize:any) => st.match(new RegExp(`.{${chunkSize}}`, "g"))
    
    const convertHexUnitTo256 = (hexStr:any) => parseInt(hexStr.repeat(2 / hexStr.length), 16)
    
    const getAlphafloat = (a:any, alpha:any) => {
        if (typeof a !== "undefined") {return a / 255}
        if ((typeof alpha != "number") || alpha <0 || alpha >1){
        return 1
        }
        return alpha
    }
    
    const hexToRGBA = (hex:string, alpha:any) => {
        if (!isValidHex(hex)) {throw new Error("Invalid HEX")}
        const chunkSize = Math.floor((hex.length - 1) / 3)
        const hexArr = getChunksFromString(hex.slice(1), chunkSize)
        const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
        console.log(`${r > 127},${g > 127},${b > 127},${getAlphafloat(a, alpha) > 0.5}`);
        return [r > 127,g > 127,b > 127,getAlphafloat(a, alpha) > 0.5]
    }
      
    
    const filter = (filterArr: boolean[]) => {
        let compare: number[] = [];
        for (let i = 0 ; i < filterArr.length; i++){
            if (filterArr[i]) compare.push(i)
        };
        console.log(compare + 'checkbox value');
        let arr: string[] = [];
        for(let i=0;i < boxList.length;i++){
            let temp: boolean[] = hexToRGBA(boxList[i], null)
            for(let j=0;j < compare.length;j++){
                if (temp[compare[j]]) arr.push(boxList[i])
            } 
        }
        arr = sorting(arr);
        arr.length > 0 ? setBoxList(sorting(arr)) : setBoxList(arr); 
    }

    const sorting = (arrItem: string[]) => {
        let result: string[] = [];
        if (arrItem.length > 0) {
            let red: string[] = []
            let green: string[] = []
            let blue: string[] = []
            let alpha: string[] = []
            for (let i = 0; i <= arrItem.length; i++){
                let temp: boolean[] = hexToRGBA(arrItem[i], null)
                if (temp[0]) red.push(arrItem[i]);
                else if (temp[1]) green.push(arrItem[i]);
                else if (temp[2]) blue.push(arrItem[i]);
                else if (temp[3]) alpha.push(arrItem[i]); 
            }
            result = [...red, ...green, ...blue, ...alpha];
        }
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

