import React from 'react';

const Card = ({id, name, email, onSelectedRobotChange}) => {
    const selectedRobot = {
        id: id,
        name: name,
        email: email
    }
    return(
        <div className='tc bg-light-green dib br3 pa3 ma2 bw2 shadow-5' onClick={()=>{onSelectedRobotChange(selectedRobot)}}>
            <img src={`https://robohash.org/${id}?size=300x300`} alt="robot"/>
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;