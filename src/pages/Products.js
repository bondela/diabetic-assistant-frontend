import React, {useEffect, useState} from 'react';
import "../styles/pages/products.css"
import DataTable from "react-data-table-component";
import ProductsAddModal from "../modals/products/productsAddModal";

const Products = () => {

    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalActive, setModalActive] = useState(true)

    // const [perPage, setPetPage] = useState(6)
    const columns = [
        {
            selector: (row) => <img src={row.image} alt="Product" width={30}/>,
            width: "60px"
        },
        {
            name: "Name (100g)",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Weight",
            selector: row => row.weight,
            sortable: true
        },
        {
            name: "Carbs (g)",
            selector: row => row.carbohydrate,
            sortable: true

        },
        {
            name: "Protein",
            selector: row => row.protein,
            sortable: true

        },
        {
            name: "Fat (g)",
            selector: row => row.fat,
            sortable: true
        }
    ]

    function handleFilter(event) {
        const filteredData = allData.filter(row =>
            row.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setData(filteredData);
    }

    useEffect(() => {
        fetchTableData()
    }, []);

    async function fetchTableData() {
        setLoading(true)
        const response = await fetch("http://localhost:8000/api/products/get_all", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        const products = await response.json()
        setAllData(products)
        setData(products)
        setLoading(false)
    }

    return (
        <main className="products-container">

            <div className="products-logo">
                PRODUCTS
                <span className="bi bi-stack" style={{margin: "10px"}}></span>
                {/*<hr style={{border: "none", height: "1px", backgroundColor: "#FFFFFF"}}/>*/}
            </div>
            <hr style={{height: "5svh"}}/>

            <div className="food-container">
                <div className="buttons-container">
                    <div className="button" onClick={() => setModalActive(true)} style={{cursor: "pointer"}}>
                        {/*<button onClick={() => setModalActive(true)}>Add</button>*/}
                        <span className="button-text">Add</span>
                    </div>
                    <div className="button">
                        <span className="button-text" style={{cursor: "pointer"}}>Add</span>
                    </div>
                </div>


                <div className="text-end" style={{margin: "5px"}}>
                    <span className="bi bi-database" style={{color: "white", marginRight: "10px", borderRadius: "10px", cursor: "pointer"}}
                            onClick={fetchTableData}/>
                    <span className="bi bi-search" style={{color: "white", marginRight: "10px"}}/>
                    <input type="text" onChange={handleFilter} style={{borderRadius: "10px"}}/>
                </div>

                <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    paginationRowsPerPageOptions={[10, 15, 25, 50]}
                    dense={data.length < 9}
                    highlightOnHover
                    pagination
                    paginationPerPage={8}

                />
            </div>
            <ProductsAddModal active={modalActive} setActive={() =>  setModalActive(false)}/>
        </main>
    );
};

export default Products;