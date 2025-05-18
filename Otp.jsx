import {useRef, useState, createRef} from "react";
export default function OTP(
    {number}
){

const [otparray, setOtparray] = useState(Array(number).fill(""));
    const refs = useRef(Array.from({length : number}, ()=>createRef()));

     otparray.forEach(e=>console.log(e));

return (
    <div className = 'flex'>
    {
        Array(number).fill(1).map((val,index)=>{
           return (<OtpBox key={index} index = {index} otparray = {otparray} setOtparray = {setOtparray}reference = {refs.current[index]} goNext = {()=>{
            if(index != refs.current.length-1){
                refs.current[index+1].current.focus();
            }
           }} goBack = {()=>{
            if(index != 0){
                refs.current[index-1].current.focus();
            }
           }}></OtpBox>)
        })
    }
    </div>
)




}

function OtpBox({reference, goNext, goBack, index, otparray, setOtparray}){
    const [val,setVal] = useState("");
    const preval = otparray[index];
    let newotparray = [...otparray];
    
    return (
        <div className="m-1 rounded-full border-2 outline-none border-solid shadow-[isnet_0px_0px_20px_5px_#c05621] bg-[#c05621]">
        <input className = "rounded-md outline-none px-4 w-[40px] h-[50px] font-[Oswald]  " value = {preval!=""?preval:val} ref = {reference} type = "text" 
        
        onPaste={e=>{
            const data = e.clipboardData.getData("text");
            const chars = data.split("");
            let newotparray = [...otparray];
            
            for(let i = 0; i< chars.length; i++){
                if(parseInt(chars[i]) >= 0 && parseInt(chars[i]) < 10){
                    newotparray[i+index] = chars[i];
                }
               
            }
           
            setOtparray(newotparray);
        }}
        onKeyDown= {(e)=>{
            if(e.key == 'Backspace'){
                // console.log("changed bhai")
                newotparray[index] = "";
                setOtparray(newotparray);
                setVal("");
                goBack();
            }
        }}onChange={(e)=>{
            const str = e.target.value;
            if(parseInt(str)>=0 && parseInt(str)<10){
                newotparray[index] = str;
                setOtparray(newotparray);
                setVal(str);
                goNext();
            }
        }}></input>
        </div> 
    )
}