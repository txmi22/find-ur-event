import React from 'react';

const Pagination = ({eventsPerPage, totalEvents, paginate}) => {

    const pageNumbers = [];

    for(let i=1;i<=Math.ceil(totalEvents/eventsPerPage); i++)
    {
        pageNumbers.push(i)
    }

    
    return(
        <div>
            <nav className="deep-purple darken-4">
                <ul className="pagination">
                   {pageNumbers.map(number => (
                       <li className="page-item" key={number}>
                           <div className="page-link" onClick={() => paginate(number)}>
                               {number}
                            </div>
                       </li>
                   ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;