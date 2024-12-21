import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import './Pagination.css';

function Pagination({nPages,cPage,setCPage}) {
    const [showPagination,setShowPagination] = useState(true);

    const {pathname} = useLocation();
    let items;
    if(cPage <= nPages ) {
        if(nPages === 2) items = [1,2];
        else if(cPage === 500 || cPage === nPages) items = [cPage - 2, cPage - 1, cPage];
        else if(cPage % 3 === 1 || cPage % 3 === 3) items = [cPage,cPage + 1,cPage + 2];
        else if(cPage % 3 === 2) items = [cPage - 1, cPage, cPage + 1];
        else if(cPage % 3 === 0) items = [cPage - 2, cPage - 1, cPage];
    }

    useEffect(() => {
        setShowPagination(pathname === '/');
    },[pathname])

    return (
        <nav aria-label="..." className={nPages === 1 ||  !showPagination? 'd-none' : 'd-flex justify-content-center pb-5'}>
            <ul className="pagination">
                <li onClick={() => setCPage(1)} className={`page-item ${cPage === 1 && 'd-none'}`}>
                    <span className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                <li onClick={() => cPage > 1 && setCPage(cPage - 1)} className={`page-item ${cPage === 1 && 'd-none'}`}>
                    <span className="page-link">Prev</span>
                </li>


                {items?.map((item) => 
                        <li onClick={() => setCPage(item)} key={item} className={`page-item ${cPage === item? 'active' : ''}`}>
                            <span className="page-link">{item}</span>
                        </li>
                    )
                }
                <li onClick={() => setCPage(cPage + 1)} className={`page-item ${cPage === nPages && 'd-none'}`}>
                    <span className="page-link">Next</span>
                </li>
                <li onClick={() => setCPage(nPages)} className={`page-item ${cPage === nPages && 'd-none'}`}>
                    <span className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav> 
    )
}

export default Pagination;
