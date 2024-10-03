export default function Skelton() {
    return (
        <div>
            <figure className="px-5 relative pt-10">
                <div className="skeleton h-48 w-full rounded-xl"></div>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="skeleton h-6 w-28"></h2>
                <p className="skeleton h-4 w-full"></p>
                <p className="skeleton h-4 w-full"></p>
            </div>
        </div>
    )
}
