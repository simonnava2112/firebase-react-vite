

const Card = ({p1, p2}) => {
    return (
<>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {p1}
            </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {p2}
        </p>
    
</>
    )
}

export default Card