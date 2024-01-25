import react from 'react'

export function Home(props){
    const user_name=props.user_name

    return(
        <div>
            <h1>Welcome {user_name}</h1>
        </div>
    )
}