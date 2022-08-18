import React, { useEffect } from 'react'
import { useState } from 'react';

const Request = () => {
    //Utilizamos state para almacenar los datos de la API
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [search, setSearch] = useState('');

    //Consultamos la Api
    const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
    const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        setData(data.results);
        setTableData(data.results);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        filter(e.target.value);
    }

    const filter = (terminSeach) => {
        var result = tableData.filter((item) => {
            if (item.name.toString().toLowerCase().includes(terminSeach.toString().toLowerCase()) || item.relativehumidity.toString().toLowerCase().includes(terminSeach.toString().toLowerCase())) {
                return item;
            }
        })
        setData(result);
    }



    //Consultamos datos al cargar la pagina
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='text-center'>Tabla de Registros
            <div className='text-center'>
                <h1 className='p-5'>Aqui van los datos</h1>
                <input type='text' className='p-2 border-2 bg-indigo-50 w-1/2 text-center rounded-sm shadow-2xl' placeholder='Ingrese el nombre o lo relativo a la humedad' value={search} onChange={handleChange} />
                <button className='border ml-5 rounded bg-indigo-500 py-1 px-4' onClick={handleChange}>Buscar</button>
                <div className='px-20 py-5'>
                    <table className="">
                        <thead className='bg-indigo-500 text-center text-white font-bold'>
                            <tr className='grid grid-cols-8 border-2'>
                                <th className="col-span-1 col-start-1">ID</th>
                                <th className='col-span-1 col-start-2'>CityId</th>
                                <th className='col-span-1 col-start-3'>Name</th>
                                <th className='col-span-1 col-start-4'>State</th>
                                <th className='col-span-1 col-start-5'>probabilityofprecip</th>
                                <th className='col-span-1 col-start-6'>relativehumidity</th>
                                <th className='col-span-1 col-start-7'>Lastreporttime</th>
                                <th className='col-span-1 col-start-8'>Llueve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => {
                                return (
                                    <tr className='grid grid-cols-8 border-2 border-indigo-300' key={item.id}>
                                        <td className='col-span-1 col-start-1'> <button>{item._id}</button></td>
                                        <td className='col-span-1 col-start-2'>{item.cityid}</td>
                                        <td className='col-span-1 col-start-3'>{item.name}</td>
                                        <td className='col-span-1 col-start-4'>{item.state}</td>
                                        <td className='col-span-1 col-start-5'>{item.probabilityofprecip}</td>
                                        <td className='col-span-1 col-start-6'>{item.relativehumidity}</td>
                                        <td className='col-span-1 col-start-7'>{item.lastreporttime}</td>
                                        <td className='col-span-1 col-start-8'>{item.probabilityofprecip > 60 || item.relativehumidity > 50 ? 'si se cumple' : ''}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Request;
