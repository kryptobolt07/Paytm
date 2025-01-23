export const InputBox = ({ label, placeholder, onChange }) =>{
    return <div>
        <div className="text-sm font-medium text-left py-2 cursor-not-allowed">
            { label }
        </div>
        <input onChange={onChange} placeholder={placeholder} 
            className="w-full px-2 py-1 rounded border-slate-200 font-light" />
    </div>
}