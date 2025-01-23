import { Link } from "react-router-dom"

export const BottonWarning = ({ label, buttonText, to }) =>{
    return <div className="text-sm flex justify-center py-2">
        <div>
            { label }
        </div>
        <Link className="underline pl-1 cursor-pointer" to={ to }>
            { buttonText }
        </Link>
    </div>
}