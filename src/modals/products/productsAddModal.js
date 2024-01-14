import React from 'react';
import "./productsAddModal.css"

const ProductsAddModal = ({active, setActive}) => {
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>

            </div>
        </div>
    );
};

export default ProductsAddModal;