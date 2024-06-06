import React from "react";

function List({list}) {
    return (
        <div>
            <ul>
                {list.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default List;